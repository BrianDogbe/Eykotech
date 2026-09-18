import { useEffect, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

const slides = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
];

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="hero-screen relative flex items-center overflow-hidden bg-ink">
      {/* Full-bleed background slideshow */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
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
              </Button>
            </a>
            <a href="#contact">
              <Button variant="ghost" className="rounded-full px-7 py-3.5 text-[0.92rem]">
                Talk to us
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}