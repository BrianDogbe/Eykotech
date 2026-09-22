import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { MediaCarousel } from "./ui/MediaCarousel";
import { Highlighter } from "./ui/highlighter";


const slides = [
  {
    type: "video",
    src: "/video/office-team.mp4",
    poster: "/images/video-posters/office-team.jpg",
    alt: "A team at work around a desk in a bright office",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1920&auto=format&fit=crop",
    alt: "A team working across a shared office floor",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
    alt: "Desks and screens laid out in an open office",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1920&auto=format&fit=crop",
    alt: "A meeting room set up for a working session",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
    alt: "Colleagues gathered around a workstation",
  },
];

export function Hero() {
  return (
    <section id="top" className="hero-screen relative flex items-center overflow-hidden bg-ink">
      {/* Full-bleed background slideshow */}
      <div className="absolute inset-0">
        <MediaCarousel
          items={slides}
          interval={5200}
          tone="light"
          indicator="bars"
          showCounter
          selectable
          controls="bottom-right"
          className="absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 md:py-32">
        {/* <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white/70">
          IT supply, installation and service in Braunschweig
        </p> */}
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.6rem)] font-extrabold leading-[1.02] tracking-tight text-white">
          <span className="r-line">
            <span style={{ "--i": 0 }}>Real stock</span>
          </span>
          <span className="r-line">
            <Reveal delay={120}>
            <Highlighter action="highlight" color="#4f8bff">
            <span style={{ "--i": 1 }} className="text-white">
              Real prices
            </span>
            </Highlighter>
             </Reveal>
          </span>
        </h1>

        <Reveal delay={120}>
          <p className="mt-6 max-w-5xl text-lg leading-snug text-white/80">
            <span className="block">Desks, printers, routers, cables. Then installation, delivery and repairs on top.</span>
            <span className="block">One local partner in Braunschweig that stocks it, installs it, and stands behind it.</span>
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="white" href="#/products" className="px-7 py-3.5 text-[0.92rem]">
              Browse products
            </Button>
            <Button variant="ghost" href="#contact" className="px-7 py-3.5 text-[0.92rem]">
              Talk to us
            </Button>
          </div>
        </Reveal>
      </div>

    </section>
  );
}