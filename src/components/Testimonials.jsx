import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./ui/Reveal";

function Stars({ n }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" className={i < n ? "text-amber-500" : "text-line"}>
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  const go = (n) => setIdx((n + testimonials.length) % testimonials.length);

  useEffect(() => {
    timer.current = setInterval(() => setIdx((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(timer.current);
  }, []);

  const restart = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((v) => (v + 1) % testimonials.length), 7000);
  };

  return (
    <section id="reviews" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="Word of mouth"
            title="What the neighbours say"
            sub="Verified reviews from businesses we work with across Lower Saxony."
            center
          />
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
          <div className="card overflow-hidden !rounded-xl p-2">
            <div className="overflow-hidden rounded-xl bg-surface2">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <figure key={t.name} className="w-full shrink-0 px-7 py-9 text-center md:px-12">
                    <div className="flex justify-center gap-2">
                      <Stars n={t.rating} />
                      {t.verified && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-emerald-700 ring-1 ring-emerald-500/25">
                          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m5 12.5 4.5 4.5L19 7.5" />
                          </svg>
                          Verified client
                        </span>
                      )}
                    </div>
                    <blockquote className="mt-5 font-display text-[clamp(1.2rem,2.5vw,1.65rem)] font-semibold leading-snug text-ink">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="font-bold text-ink">{t.name}</p>
                      <p className="text-sm text-mute">{t.role}</p>
                      <p className="mt-0.5 text-xs text-mute">{t.company}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => {
                    go(i);
                    restart();
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 transition-[width,background-color] duration-300 ${
                    i === idx ? "w-8 rounded-full bg-primary" : "w-2 rounded-full bg-line hover:bg-mute"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  go(idx - 1);
                  restart();
                }}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line text-ink transition-colors hover:bg-primary hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  go(idx + 1);
                  restart();
                }}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line text-ink transition-colors hover:bg-primary hover:text-white"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}