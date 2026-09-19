import { useCallback, useEffect, useRef, useState } from "react";
import { MediaIndicator } from "./MediaIndicator";

/**
 * A crossfading stack of images and video with a pause control and a progress
 * indicator. Progress is written straight to the DOM on each frame, so a running
 * slide never re-renders React; only changing slide does.
 *
 * items       [{ type: "image" | "video", src, poster?, alt }]
 * interval    ms an image stays on screen (video uses its own duration)
 * autoPlay    start advancing on mount; ignored when the viewer prefers reduced motion
 * indicator   "bars" | "dots", passed through to MediaIndicator
 * tone        "light" over dark media, "dark" over light surfaces
 * showCounter show the "02 / 04" readout
 * showPause   render the play/pause button
 * controls    "bottom-right" | "bottom-left" | "top-right" | "none"
 * selectable  let the viewer click an indicator segment to jump
 * objectFit   "cover" or "contain"
 */
const CORNER = {
  "bottom-right": "bottom-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "top-right": "top-3 right-3",
};

export function MediaCarousel({
  items,
  interval = 5000,
  autoPlay = true,
  indicator = "bars",
  tone = "light",
  showCounter = false,
  showPause = true,
  controls = "bottom-right",
  selectable = false,
  objectFit = "cover",
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(!autoPlay);
  const fillRef = useRef(null);
  const videoRef = useRef(null);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);

  const single = items.length < 2;
  const current = items[index];
  const isVideo = current?.type === "video";

  const advance = useCallback(() => {
    elapsedRef.current = 0;
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const goTo = useCallback((i) => {
    elapsedRef.current = 0;
    setIndex(i);
  }, []);

  // Viewers who prefer reduced motion get a still first frame and manual control.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) setPaused(true);
  }, []);

  // Reset only when the slide itself changes. Pausing must not touch progress.
  useEffect(() => {
    elapsedRef.current = 0;
    const fill = fillRef.current;
    if (fill) fill.style.transform = "scaleX(0)";
    const video = videoRef.current;
    if (isVideo && video) video.currentTime = 0;
  }, [index, isVideo]);

  // Drive progress. Pausing freezes the bar where it stands; playing resumes from there.
  useEffect(() => {
    const video = videoRef.current;
    if (isVideo && video) {
      if (paused) video.pause();
      else video.play().catch(() => {});
    }
    if (single || paused) return;

    let raf = 0;
    startRef.current = performance.now();

    const tick = (now) => {
      const node = fillRef.current;
      let ratio;

      if (isVideo && videoRef.current?.duration) {
        ratio = videoRef.current.currentTime / videoRef.current.duration;
      } else {
        ratio = (elapsedRef.current + (now - startRef.current)) / interval;
      }

      ratio = Math.min(Math.max(ratio, 0), 1);
      if (node) node.style.transform = `scaleX(${ratio})`;

      if (ratio >= 1 && !isVideo) {
        advance();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      elapsedRef.current += performance.now() - startRef.current;
    };
  }, [index, paused, interval, isVideo, single, advance]);

  const togglePause = () => setPaused((p) => !p);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {items.map((item, i) => {
        const shown = i === index;
        const common = `absolute inset-0 h-full w-full transition-opacity duration-700 ease-out ${
          objectFit === "contain" ? "object-contain" : "object-cover"
        } ${shown ? "opacity-100" : "opacity-0"}`;

        return item.type === "video" ? (
          <video
            key={item.src}
            ref={shown ? videoRef : undefined}
            src={item.src}
            poster={item.poster}
            muted
            playsInline
            preload="metadata"
            aria-label={item.alt}
            onEnded={advance}
            className={common}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={shown ? item.alt : ""}
            aria-hidden={shown ? undefined : "true"}
            loading={i === 0 ? "eager" : "lazy"}
            className={common}
          />
        );
      })}

      {!single && controls !== "none" && (
        // <div
        //   className={`absolute z-10 flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 ${CORNER[controls]} ${
        //     tone === "light" ? "bg-ink/55 backdrop-blur-sm" : "bg-surface/85 ring-1 ring-line backdrop-blur-sm"
        //   }`}
        // >
         <div className={`absolute z-10  flex items-center gap-2.5 ${CORNER[controls]}`}>
          {showPause && (
            <button
              type="button"
              onClick={togglePause}
              aria-pressed={paused}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
               className={`bg-ink/80 grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors duration-200 cursor-pointer ${
                tone === "light" ? "text-white hover:bg-ink/55" : "text-ink hover:bg-ink/10"
              }`}
            >
              {paused ? (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <rect x="7" y="5.5" width="3.5" height="13" rx="0.5" />
                  <rect x="13.5" y="5.5" width="3.5" height="13" rx="0.5" />
                </svg>
              )}
            </button>
          )}

          <MediaIndicator
            count={items.length}
            index={index}
            fillRef={fillRef}
            variant={indicator}
            tone={tone}
            showCounter={showCounter}
            onSelect={selectable ? goTo : undefined}
          />
        </div>
      )}
    </div>
  );
}
