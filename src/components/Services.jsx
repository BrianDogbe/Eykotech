import { SectionHead } from "./SectionHead";
import { Reveal } from "./ui/Reveal";

const serviceGroups = [
  {
    title: "First Choice for Used and New Computers",
    body: "Upgrades and New Systems — embark on a journey of top-tier computing with our wide array of CPUs, motherboards, RAMs and storage, hand-picked for reliability and performance first. At Eykotech, we guarantee that every component services your individual expectations.",
    bullets: [
      "4000+ Unique Components",
      "A+ Ratings For Quality",
      "Nationwide Coverage",
      "ISO 9001 Certified",
    ],
  },
  {
    title: "Fully Trained Technicians",
    body: "At Eykotech we have fully trained technicians, who can provide expert repair services and general maintenance. Because we are an IT solutions company, we offer comprehensive IT support and maintenance services to ensure that businesses and individual entities operate smoothly and efficiently. Our IT Support encompasses all your IT needs that ranges from repairs, deployments, upgrades, installations, data storage and backup to outsourcing support.",
    bullets: [
      "100% Satisfaction Guaranteed",
      "24/7 Customer Support",
      "Trusted By Fortune 500",
      "Comprehensive Product Support",
    ],
  },
];

const specialtyCards = [
  {
    title: "Minimal time wastage",
    body: "personal approach — fast & efficient processing",
    bullets: ["Quick & efficient processing", "Reliable & timely support"],
  },
  {
    title: "Competitive pricing, quality products",
    body: "a wide range of new & used IT hardware at fair prices",
    bullets: ["New & used IT hardware", "Buy, sell & trade"],
  },
];

const specialtyChips = [
  "General IT Services",
  "Software Installation",
  "Hardware & Networking",
  "PC Assembling & Repairs",
  "Virus & Spyware Protection",
  "Corporate IT Support",
];

export function Services() {
  return (
    <section id="services" className="border-y border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="max-w-3xl">
          <SectionHead
            eyebrow="What we do"
            title="Large corporate environments"
            sub="Eykotech specializes in establishing and as well as upgrading securing and fine tuning existing IT environments. Location is not a barrier to seeking our services. We have a global delivery plan that spans across the globe. We also offer R&R services as part of our specialized and trusted workforce."
          />
        </Reveal>

        <div className="mt-14 space-y-20">
          {/* Services We Offer */}
          <div>
            <h3 className="font-display text-2xl font-extrabold text-ink">Services We Offer</h3>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {serviceGroups.map((group, gi) => (
                <Reveal key={gi} delay={gi * 80}>
                  <div className="card h-full p-7">
                    <h4 className="font-display text-[1.05rem] font-extrabold leading-snug text-ink">
                      {group.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{group.body}</p>
                    <ul className="mt-5 grid gap-2.5">
                      {group.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[0.82rem] font-semibold text-ink">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Store */}
          <div>
            <h3 className="font-display text-2xl font-extrabold text-ink">Store</h3>
            <Reveal delay={80}>
              <div className="card mt-8 p-7">
                <div className="flex flex-wrap gap-2">
                  {["New Arrivals", "Deals & Discounts", "Parts", "Accessories"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-surface2 px-4 py-2 text-xs font-bold text-ink ring-1 ring-line"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mute">
                  We also have an online store where you can check stock availability and place
                  orders for delivery, both in-store pick-up and worldwide shipping.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Specialities */}
          <div>
            <h3 className="font-display text-2xl font-extrabold text-ink">Specialities</h3>
            <p className="mt-2 max-w-2xl text-sm text-mute">
              We are specialists at new &amp; used buy/sell, trading and barter, providing IT
              consultations and also superb technical support.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {specialtyCards.map((c, ci) => (
                <Reveal key={ci} delay={ci * 80}>
                  <div className="card h-full p-7">
                    <h4 className="font-display text-[1.05rem] font-extrabold text-ink">{c.title}</h4>
                    <p className="mt-1 text-sm text-mute">{c.body}</p>
                    <ul className="mt-4 grid gap-2.5">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[0.82rem] font-semibold text-ink">
                          <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="mt-6 flex flex-wrap gap-2">
                {specialtyChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-surface text-mute px-4 py-2 text-xs font-bold ring-1 ring-line"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}