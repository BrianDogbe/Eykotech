import { detailedServices } from "../data";
import { Eyebrow } from "./SectionHead";
import { useCatalog } from "../useCatalog";
import { go } from "../useHashRoute";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

function Stat({ label, value, unit }) {
  return (
    <div className="min-w-0">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.11em] text-mute">{label}</p>
      <p className="mt-1 font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-ink">
        {value}
        {unit && <span className="ml-1 text-[0.9rem] font-bold text-mute">{unit}</span>}
      </p>
    </div>
  );
}

function Panel({ service, onBrowse }) {
  return (
    <div className="flex h-full flex-col justify-between gap-6 rounded-xl bg-surface p-6 md:p-7">
      <div>
        <h3 className="font-display text-[clamp(1.2rem,2.1vw,1.55rem)] font-semibold leading-[1.15] tracking-tight text-ink">
          {service.title}
        </h3>
        <p className="mt-2.5 max-w-[42ch] text-[0.9rem] leading-relaxed text-mute">{service.subtitle}</p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-5 border-t border-line pt-4">
          {service.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button variant="primary" href="#/contact" className="px-5 py-2.5 text-[0.85rem]">
            {service.cta}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
          <button
            type="button"
            onClick={() => onBrowse(service.cat)}
            className="group/link inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink underline decoration-line underline-offset-[5px] transition-colors hover:text-primary hover:decoration-primary"
          >
            See {service.catLabel}
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 ease-out group-hover/link:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Capabilities() {
  const { setActiveCategory } = useCatalog();
  const browse = (cat) => {
    setActiveCategory(cat);
    go("/products");
  };

  return (
    <section id="services" className="border-y border-line bg-surface2 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold leading-[1.06] tracking-tight text-ink">
            Supplied, installed, and kept running
          </h2>
          <p className="mt-3 text-mute">
            Four service lines, one local team. We design the network, pull the cable, build the desks, and stay
            on the phone afterwards.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-12">
          {detailedServices.map((s, i) => (
            <Reveal key={s.id} delay={60}>
              <div
                className={`flex flex-col gap-5 lg:h-[19rem] lg:flex-row ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <Panel service={s} onBrowse={browse} />
                </div>
                <div className="overflow-hidden rounded-xl bg-surface lg:w-1/2">
                  <img
                    src={s.img}
                    alt={s.imgAlt}
                    loading="lazy"
                    className="h-48 w-full object-cover sm:h-60 lg:h-full"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
