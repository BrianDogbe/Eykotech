import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./ui/Reveal";

function Stars({ n }) {
  return (
    <span className="font-mono text-amber-500 dark:text-amber-400" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(5 - n)}</span>
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
    <section id="reviews" className="py-20 md:py-28">
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
          <div className="card overflow-hidden !rounded-[1.75rem] p-2">
            <div className="overflow-hidden rounded-2xl bg-surface2">
              <div
                className="flex transition-transform duration-600 ease-out"
                style={{ transform: `translateX(-${idx * 100}%)` }}
              >
                {testimonials.map((t) => (
                  <figure key={t.name} className="w-full shrink-0 px-7 py-9 text-center md:px-12">
                    <div className="flex justify-center gap-2">
                      <Stars n={t.rating} />
                      {t.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[0.62rem] font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/25">
                          ✓ Verified client
                        </span>
                      )}
                    </div>
                    <blockquote className="mt-5 font-display text-[clamp(1.2rem,2.5vw,1.65rem)] font-semibold leading-snug text-ink">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="font-bold text-ink">{t.name}</p>
                      <p className="text-sm text-mute">{t.role}</p>
                      <p className="mt-0.5 font-mono text-xs text-mute">{t.company}</p>
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
                  className={`h-2 transition-all duration-300 ${
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
                ←
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
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}