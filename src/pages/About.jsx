import { specialities } from "../data";
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
    body: "We tell you when a repair is worth it and when it isn't — even if that means selling less. No inflated quotes, no work you don't need.",
  },
  {
    title: "Fixed fast",
    body: "Stock on the shelf, technicians on the phone and a fleet ready to move. Fast turnaround and first-visit resolution as our default.",
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
            Eykotech provides customer insight, consultancy, events and peer-to-peer executive programs.
            We've been making IT, marketing and technology industry leaders successful every day — right from
            our base in Braunschweig, Lower Saxony, and for businesses beyond who work with international
            teams. We operate globally.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-10 md:mt-24 md:grid-cols-2 md:gap-8 lg:gap-10">
          <Reveal className="h-full">
            <FeatureCard
              rounded="rounded-3xl"
              padding="p-6 sm:p-8"
              titleClassName="text-lg sm:text-xl"
              imageAspect="4/3"
              image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Technician installing and testing equipment"
              eyebrow="Our difference"
              title="Built to secure your business"
              body={[
                "Eykotech is here to secure your business. We're confident we can provide you with the highest level of support, with friendly, patient staff ready to address your needs. Our technical team knows what it takes to be the best — and how we can help make your dream come true.",
                "Every product leaves our hands tested, configured and documented before it reaches your desk — the same promise we make on everything we stock and install.",
              ]}
            />
          </Reveal>

          <Reveal delay={90} className="h-full">
            <FeatureCard
              rounded="rounded-3xl"
              padding="p-6 sm:p-8"
              titleClassName="text-lg sm:text-xl"
              imageAspect="4/3"
              image="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Engineers discussing a network setup"
              eyebrow="Our skills"
              title="Language, culture, and technical depth"
              body={[
                "Language skills are crucial for communicating with customers and building real understanding. Every year, thousands of companies around the world lose business and miss out on contracts as a result of their lack of language skills and intercultural competence. Our team is made up of people from different educational backgrounds, cultures and languages — most commonly English, French and German. So no matter who picks up the phone, your business is understood.",
                "Eykotech is specialised in installing and supporting Microsoft, Cisco, Dell, HP and Huawei networking products used by small and large businesses. Our goal is simple: a properly designed, secure and protected network with as few interruptions as possible.",
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={80}>
          <section className="mt-20 md:mt-28">
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              Our specialities
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              The systems we install, support and maintain
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  "Our own fleet delivers and installs wherever you need us.",
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
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 70} className="h-full">
                  <div className="h-full rounded-3xl border border-line bg-surface p-7">
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
            <div className="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.img} className="relative overflow-hidden rounded-2xl ring-1 ring-line">
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
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