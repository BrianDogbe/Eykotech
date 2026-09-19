import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./SectionHead";
import { MediaCarousel } from "./ui/MediaCarousel";

const steps = [
  {
    title: "You place the order",
    body: "Call, email, or walk into the showroom. We confirm what is on the shelf before you commit to anything.",
    footLabel: "Free advice",
    href: "#/contact",
  },
  {
    title: "We pick and test it",
    body: "Stock is picked, configured and checked by a technician, then packed so it survives the journey.",
    footLabel: "Checked before dispatch",
    href: "#/products",
  },
  {
    title: "Our own fleet delivers",
    body: "No third-party couriers. Our vehicles cover Braunschweig and the surrounding region, usually in 24 to 48 hours.",
    footLabel: "24 to 48 hours",
    href: "#/delivery",
  },
  {
    title: "We install and stay on",
    body: "Desks built, switches configured, cable dressed and documented. Then we pick up the phone when you call.",
    footLabel: "Repairs and maintenance",
    href: "#/repairs",
  },
];

const shots = [
  [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=900&auto=format&fit=crop",
      alt: "An order arriving by email at the Eykotech service desk",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=900&auto=format&fit=crop",
      alt: "Typing up an order at a workstation",
    },
  ],
  [
    {
      type: "video",
      src: "/video/warehouse-pick.mp4",
      poster: "/images/video-posters/warehouse-pick.jpg",
      alt: "Warehouse staff picking stock from the racking",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&auto=format&fit=crop",
      alt: "Stock staged on pallets ready for packing",
    },
  ],
  [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900&auto=format&fit=crop",
      alt: "Delivery vehicle loaded and leaving for a customer run",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop",
      alt: "A delivery being unloaded at a customer site",
    },
  ],
  [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=900&auto=format&fit=crop",
      alt: "Technician testing hardware on the bench before handover",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=900&auto=format&fit=crop",
      alt: "Patch field dressed and labelled after an install",
    },
  ],
];

function Progress({ index, dark }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {steps.map((_, i) => (
        <span
          key={i}
          className={`h-px w-3.5 ${
            i <= index ? (dark ? "bg-amber-300" : "bg-primary") : dark ? "bg-white/25" : "bg-line"
          }`}
        />
      ))}
    </span>
  );
}

function StepCell({ step, index, dark = false }) {
  return (
    <a
      href={step.href}
      className={`group flex flex-col p-5 transition-colors duration-200 sm:min-h-[15rem] md:p-6 ${
        dark ? "bg-ink text-white hover:bg-ink/90" : "bg-surface hover:bg-surface2"
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className={`text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${dark ? "text-white/60" : "text-mute"}`}>
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <Progress index={index} dark={dark} />
      </span>

      <span className={`mt-5 font-display text-[1.05rem] font-extrabold leading-snug ${dark ? "text-white" : "text-ink"}`}>
        {step.title}
      </span>
      <span className={`mt-2 text-[0.85rem] leading-relaxed ${dark ? "text-white/75" : "text-mute"}`}>
        {step.body}
      </span>

      <span className={`mt-auto flex items-center justify-between gap-3 border-t pt-4 ${dark ? "border-white/20" : "border-line"}`}>
        <span className={`text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${dark ? "text-white/70" : "text-mute"}`}>
          {step.footLabel}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover:translate-x-0.5 ${
            dark
              ? "border-white/30 text-white group-hover:bg-white group-hover:text-ink"
              : "border-line text-ink group-hover:border-primary group-hover:bg-primary group-hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </a>
  );
}

function ShotCell({ media }) {
  return (
    <MediaCarousel
      items={media}
      interval={5200}
      tone="light"
      showCounter
      controls="bottom-left"
      selectable
      className="hidden min-h-[11rem] bg-surface2 sm:block"
    />
  );
}

/** The bare mosaic, so pages with their own section heading can reuse it. */
export function ProcessMosaic({ className = "" }) {
  /* Ordered so steps and photographs alternate at both two and four columns. */
  const cells = [
    <StepCell key="s0" step={steps[0]} index={0} />,
    <ShotCell key="i0" media={shots[0]} />,
    <StepCell key="s1" step={steps[1]} index={1} />,
    <ShotCell key="i1" media={shots[1]} />,
    <ShotCell key="i2" media={shots[2]} />,
    <StepCell key="s2" step={steps[2]} index={2} dark />,
    <ShotCell key="i3" media={shots[3]} />,
    <StepCell key="s3" step={steps[3]} index={3} />,
  ];

  return (
    <div className={`overflow-hidden rounded-xl border border-line ${className}`}>
      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">{cells}</div>
    </div>
  );
}

export function ProcessStrip() {
  return (
    <section id="how-it-works" className="border-y border-line bg-surface2 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold leading-[1.06] tracking-tight text-ink">
              From your order to a working desk
            </h2>
          </div>
          <a
            href="#/delivery"
            className="group inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-line underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary"
          >
            About our delivery
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={80} className="mt-10 md:mt-12">
          <ProcessMosaic />
        </Reveal>
      </div>
    </section>
  );
}
