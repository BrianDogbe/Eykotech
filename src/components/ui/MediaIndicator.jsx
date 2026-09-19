/**
 * Shows which slide of a carousel is showing, how many there are, and how far
 * the current one has run. Works for images (timer driven) and video alike.
 *
 * count       number of slides
 * index       zero-based index of the slide on screen
 * fillRef     ref attached to the active segment's fill; the carousel drives its
 *             scaleX directly so progress never re-renders React
 * variant     "bars" for a segmented progress rail, "dots" for a compact row
 *             Only the current segment fills; idle segments sit empty.
 * tone        "light" over dark media, "dark" over light surfaces
 * onSelect    optional (index) => void; makes the segments clickable
 * showCounter appends a "02 / 04" readout
 * label       used to build the accessible name of each segment
 */
export function MediaIndicator({
  count,
  index,
  fillRef,
  variant = "bars",
  tone = "light",
  onSelect,
  showCounter = false,
  label = "Slide",
  className = "",
}) {
  if (count < 2) return null;

  const light = tone === "light";
  const track = light ? "bg-white/30" : "bg-ink/15";
  const fill = light ? "bg-white" : "bg-primary";
  const text = light ? "text-white/80" : "text-mute";
  const size = variant === "dots" ? "h-1.5 w-1.5 rounded-full" : "h-[3px] w-7 rounded-full sm:w-9";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }, (_, i) => {
          const active = i === index;
          const Tag = onSelect ? "button" : "span";
          return (
            <Tag
              key={i}
              {...(onSelect
                ? {
                    type: "button",
                    onClick: () => onSelect(i),
                    "aria-label": `${label} ${i + 1} of ${count}`,
                    "aria-current": active ? "true" : undefined,
                  }
                : { "aria-hidden": "true" })}
              className={`relative block overflow-hidden ${size} ${track} ${
                onSelect ? "cursor-pointer transition-opacity hover:opacity-80" : ""
              }`}
            >
              {/* Keyed on index so every slide change remounts the fills. The carousel
                  writes scaleX straight to the DOM, which React's diff cannot see, so a
                  bar that was active would otherwise keep its fill once it went idle. */}
              <span
                key={`${i}-${index}`}
                ref={active ? fillRef : undefined}
                className={`absolute inset-0 origin-left ${fill}`}
                style={{ transform: "scaleX(0)" }}
              />
            </Tag>
          );
        })}
      </div>

      {showCounter && (
        <p className={`text-[0.7rem] font-semibold tabular-nums ${text}`}>
          <span className="sr-only">{label} </span>
          {String(index + 1).padStart(2, "0")}
          <span className="opacity-60"> / {String(count).padStart(2, "0")}</span>
        </p>
      )}
    </div>
  );
}
