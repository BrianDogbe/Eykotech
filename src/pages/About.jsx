import { specialities } from "../data";
import { PageHeader } from "../components/PageHeader";
import { Reveal } from "../components/ui/Reveal";
import { FeatureCard } from "../components/ui/FeatureCard";

const specImgs = {
  "Networking & Switching":
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  "Systems & Servers":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
  "Design & Build":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
};

const values = [
  {
    title: "Honest advice",
    body: "We tell you when a repair is worth it and when it isn't, even if that means selling less. No inflated quotes, no work you don't need.",
    proof: "No-obligation quotes",
    link: ["How we quote", "#/repairs"],
  },
  {
    title: "Fixed fast",
    body: "Stock on the shelf, technicians on the phone and a fleet ready to move. Fast turnaround and first-visit resolution as our default.",
    proof: "24 to 48h regional delivery",
    link: ["Delivery and turnaround", "#/delivery"],
  },
  {
    title: "Built to last",
    body: "Original parts and proven brands: HP, Cisco, Dell, Huawei and more. Every setup is configured, tested and documented before it leaves our hands.",
    proof: "Guaranteed on every fix",
    link: ["Brands we service", "#/products"],
  },
];

const gallery = [
  {
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    alt: "Eykotech support helping a customer at a desk",
    label: "Help desk and support",
    note: "A real person answers the phone during opening hours.",
  },
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    alt: "Server room rack kept available by Eykotech",
    label: "Data and server rooms",
    note: "Racks labelled, documented and kept available.",
  },
  {
    img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop",
    alt: "Technician working on hardware at the repair bench",
    label: "Repair and maintenance",
    note: "Original parts, on our bench or at your site.",
  },
  {
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
    alt: "Network equipment wired and ready",
    label: "Cabling and networking",
    note: "Certified drops, dressed and tested before handover.",
  },
];

const tally = [
  ["Certified drops installed", "10,000+"],
  ["Managed printers active", "450+"],
  ["Desks delivered and built", "2,500+"],
];

export function About() {
  return (
    <main>
      <PageHeader eyebrow="About Eykotech" title="The local partner behind your office">
        <p>
          Eykotech provides customer insight, consultancy, events and peer-to-peer executive programs. We have
          been making IT, marketing and technology industry leaders successful every day, right from our base in
          Braunschweig, Lower Saxony, and for businesses beyond who work with international teams.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="grid items-stretch gap-10 md:mt-24 md:grid-cols-2 md:gap-8 lg:gap-10">
          <Reveal className="h-full">
            <FeatureCard
              rounded="rounded-xl"
              padding="p-6 sm:p-8"
              titleClassName="text-lg sm:text-xl"
              imageAspect="16/9"
              image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Technician installing and testing equipment"
              eyebrow="Our difference"
              title="Built to secure your business"
              body="Everything leaves our hands tested, configured and documented before it reaches your desk. The same promise applies to everything we stock and everything we install."
              bullets={[
                "Tested and configured before dispatch",
                "Documented handover on every install",
                "Patient staff who actually answer the phone",
              ]}
            />
          </Reveal>

          <Reveal delay={90} className="h-full">
            <FeatureCard
              rounded="rounded-xl"
              padding="p-6 sm:p-8"
              titleClassName="text-lg sm:text-xl"
              imageAspect="16/9"
              image="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Engineers discussing a network setup"
              eyebrow="Our skills"
              title="Language, culture, and technical depth"
              body="Our team comes from different backgrounds and languages, so whoever picks up the phone understands your business and the kit behind it."
              bullets={[
                "English, French and German spoken",
                "Microsoft, Cisco, Dell, HP and Huawei specialists",
                "Networks designed for as few interruptions as possible",
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <section className="mt-20 md:mt-28">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
              Our specialities
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              The systems we install, support and maintain
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specialities.map((s) => (
                <FeatureCard
                  key={s.group}
                  image={specImgs[s.group]}
                  imageAlt={s.group}
                  imageAspect="16/9"
                  title={s.group}
                  bullets={s.items}
                />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-2 md:gap-14">
            <img
              src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?q=80&w=1200&auto=format&fit=crop"
              alt="Eykotech support team taking calls at our service desk"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover ring-1 ring-line"
            />
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
                How we work
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
                Taken care of, from first call to final install
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "A single phone call gives you a no-obligation quote before any work starts.",
                  "Every repair uses original parts, with a guarantee on the fix.",
                  "Setups are configured, tested and documented before they leave our hands.",
                  "Our own fleet delivers and installs wherever you need us.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-mute">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primarytint text-[0.65rem] font-bold text-primary" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-20 md:mt-28">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
              What we stand for
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              Three promises we keep
            </h2>
            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-mute">
              The same things every customer gets, whether the job is one patch lead or a whole floor.
            </p>

            <div className="mt-4 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 70} className="h-full">
                  <div className="group flex h-full flex-col border-t-2 border-line pt-5 transition-colors duration-300 hover:border-primary">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.15rem] font-extrabold tracking-tight text-ink">
                        {v.title}
                      </h3>
                      <span className="font-display text-[1.5rem] font-extrabold leading-none text-mute/60 transition-colors duration-300 group-hover:text-primary/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{v.body}</p>

                    <div className="mt-auto pt-6">
                      <p className="flex items-center gap-2 text-[0.8rem] font-semibold text-ink">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-primary">
                          <path d="m5 12.5 4.5 4.5L19 7.5" />
                        </svg>
                        {v.proof}
                      </p>
                      <a
                        href={v.link[1]}
                        className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-primary underline decoration-primary/30 underline-offset-[5px] transition-colors hover:decoration-primary"
                      >
                        {v.link[0]}
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-20 md:mt-28">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div className="max-w-2xl">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
                  Inside Eykotech
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
                  From stockroom to server room
                </h2>
              </div>
              <a
                href="#/contact"
                className="group inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-line underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary"
              >
                Visit the showroom
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* Mosaic: one lead frame, three supporting frames, and the running tally. */}
            <div className="mt-4 grid gap-4 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((g, i) => (
                <figure
                  key={g.img}
                  className={`relative overflow-hidden rounded-xl  ${
                    i === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className={`w-full object-cover ${
                      i === 0 ? "aspect-[4/3] md:h-full md:aspect-auto" : "aspect-[4/3]"
                    }`}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-4 pb-4 pt-12">
                    <p className="font-display text-[1.2rem] font-semibold text-white">{g.label}</p>
                    <p className=" text-[0.78rem] leading-snug text-white/80">{g.note}</p>
                  </figcaption>
                </figure>
              ))}

              <div className="flex flex-col justify-center gap-5 rounded-xl bg-surface2 p-6">
                {tally.map(([label, value]) => (
                  <div key={label}>
                    <p className="font-display text-[1.6rem] font-semibold leading-none tracking-tight text-ink">
                      {value}
                    </p>
                    <p className="mt-1.5 text-[0.76rem] font-semibold  tracking-[0.09em] text-mute">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}