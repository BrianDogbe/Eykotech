import { stats } from "../data";
import { Reveal } from "../components/ui/Reveal";
import { FeatureCard } from "../components/ui/FeatureCard";

const values = [
  {
    title: "Honest advice",
    body: "We tell you when a repair is worth it and when it isn't — even if that means selling less. No inflated quotes, no work you don't need.",
  },
  {
    title: "Fixed fast",
    body: "Stock on the shelf, technicians on the phone and a fleet ready to move. Coverage of 200 km around Braunschweig, with first-visit resolution as our default.",
  },
  {
    title: "Built to last",
    body: "Original parts and proven brands — HP, Cisco, Dell, Huawei and more. Every setup is configured, tested and documented before it leaves our hands.",
  },
];

const gallery = [
  {
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    alt: "Eykotech support helping a customer at a desk",
    label: "Help desk & support",
  },
  {
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    alt: "Server room rack kept available by Eykotech",
    label: "Data & server rooms",
  },
  {
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1000&auto=format&fit=crop",
    alt: "Technician servicing hardware on a workbench",
    label: "Repair & maintenance",
  },
  {
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
    alt: "Network equipment wired and ready",
    label: "Cabling & networking",
  },
];

export function About() {
  return (
    <main className="border-y border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <h1 className="mx-auto max-w-3xl text-center font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight text-ink">
            The local partner behind your office — from stock to setup
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            Eykotech provides customer insight, consultancy and hands-on support. We've been making IT,
            marketing and technology customers successful every day — right from our base in Braunschweig,
            Lower Saxony, and for businesses beyond who work with international teams.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center bg-surface p-7 text-center">
                <dd className="order-first font-display text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold text-primary">
                  {s.value}
                  {s.suffix}
                </dd>
                <dt className="mt-2 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-mute">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <FeatureCard
              rounded="rounded-3xl"
              padding="p-8"
              titleClassName="text-xl"
              image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Technician installing and testing equipment"
              eyebrow="Our difference"
              title="Built to secure your business"
              body={[
                "Eykotech is here to secure your business. We're confident we can provide you with the highest level of support, with friendly, patient staff ready to address your needs. Our technical team knows what it takes to be the best — and how to help your business grow.",
                "Every product leaves our hands tested, configured and documented before it reaches your desk — the same promise we make on everything we stock and install.",
              ]}
            />
          </Reveal>

          <Reveal delay={90}>
            <FeatureCard
              rounded="rounded-3xl"
              padding="p-8"
              titleClassName="text-xl"
              image="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Engineers discussing a network setup"
              eyebrow="Our skills"
              title="Language, culture, and technical depth"
              body={[
                "Language skills are crucial for communicating with customers and building real understanding. Our team is made up of people from different educational backgrounds, cultures and languages — most commonly English, French and German. So no matter who picks up the phone, your business is understood.",
                "Eykotech is specialised in installing and supporting Microsoft, Cisco, Dell, HP and Huawei networking products used by small and large businesses. Our goal is simple: a properly designed, secure and protected network with as few interruptions as possible.",
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <section className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-2 md:gap-14">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop"
              alt="Eykotech server hardware being prepared for a client"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl object-cover ring-1 ring-line"
            />
            <div>
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                How we work
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
                Taken care of, from first call to final install
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "A single phone call gives you a no-obligation quote before any work starts.",
                  "Every repair uses original parts, with a guarantee on the fix.",
                  "Setups are configured, tested and documented before they leave our hands.",
                  "Our own fleet delivers and installs within 200 km of Braunschweig.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-mute">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primarytint font-mono text-[0.65rem] font-bold text-primary" aria-hidden="true">
                      ✓
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
            <p className="text-center font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              What we stand for
            </p>
            <h2 className="mt-2 text-center font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              Three promises we keep
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 70}>
                  <div className="card h-full p-7">
                    <span className="font-mono text-[0.7rem] font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-[1.05rem] font-extrabold text-ink">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-20 md:mt-28">
            <p className="text-center font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              Inside Eykotech
            </p>
            <h2 className="mt-2 text-center font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              From stockroom to server room
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.img} className="group relative overflow-hidden rounded-2xl ring-1 ring-line">
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10 text-[0.78rem] font-bold text-white">
                    {g.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}