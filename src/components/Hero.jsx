import { useEffect, useState } from "react";
import { products } from "../data";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

const slides = products.slice(0, 4);

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="hero-screen relative flex items-center overflow-hidden bg-ink">
      {/* Full-bleed background slideshow */}
      <div className="absolute inset-0">
        {slides.map((p, i) => (
          <img
            key={p.id}
            src={p.img}
            alt={p.name}
            aria-hidden={i !== idx}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 md:py-32">
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight text-white">
          <span className="r-line">
            <span style={{ "--i": 0 }}>Real stock</span>
          </span>
          <span className="r-line">
            <span style={{ "--i": 1 }} className="bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
              Real prices
            </span>
          </span>
        </h1>

        <Reveal delay={120}>
          <p className="mt-6 max-w-5xl text-lg leading-snug text-white/80">
            <span className="block">Desks, printers, routers, cables — then installation, delivery and repairs on top.</span>
            <span className="block">One local partner in Braunschweig that stocks it, installs it, and stands behind it.</span>
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#/products">
              <Button variant="white" className="rounded-full px-7 py-3.5 text-[0.92rem]">
                Browse products
                <span aria-hidden="true">→</span>
              </Button>
            </a>
            <a href="#contact">
              <Button variant="ghost" className="rounded-full px-7 py-3.5 text-[0.92rem]">
                Talk to us
              </Button>
            </a>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 backdrop-blur">
              <span aria-hidden="true" className="font-mono text-white/70">“</span>
              {slides[idx].name}
            </p>
            <div className="flex gap-2">
              {slides.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Show ${p.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}