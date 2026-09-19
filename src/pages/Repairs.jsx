import { Reveal } from "../components/ui/Reveal";
import { PageHeader } from "../components/PageHeader";

const services = [
  {
    title: "Repairs",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    details: [
      "We diagnose and repair laptops, desktops, printers and networking gear.",
      "Original parts only, with a guarantee on every fix.",
      "A phone call is all it takes for a no-obligation quote.",
    ],
  },
  {
    title: "Maintenance kits",
    img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800&auto=format&fit=crop",
    details: [
      "HP laserjet, colorlaserjet and designjet kits in stock.",
      "Rollers and consumables replaced before they cause downtime.",
      "Scheduled servicing keeps your fleet printing.",
    ],
  },
  {
    title: "Installation services",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    details: [
      "On-site setup of workstations, printers and network equipment.",
      "Cabling, configuration and documentation included.",
      "Microsoft, Cisco, Dell, HP and Huawei specialists.",
    ],
  },
  {
    title: "Contracts",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    details: [
      "Priority response for covered equipment.",
      "Regular maintenance visits and monitoring.",
      "Predictable monthly pricing and discounted parts.",
    ],
  },
];

export function Repairs() {
  return (
    <main>
      <PageHeader
        eyebrow="Repairs and maintenance"
        title="Repaired and serviced by technicians using original parts"
      >
        <p>
          Need a new HP maintenance kit for your laserjet, colorlaserjet or designjet printer? You are in the
          right place for repairs or service by knowledgeable technicians using original parts.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <p className="max-w-3xl text-[0.98rem] leading-relaxed text-mute">
            With a phone call and some information, we can provide you a no-obligation quote. From there, you
            can submit a service order through email or fax.
          </p>
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            alt="Eykotech technician working on hardware repairs"
            loading="lazy"
            className="mt-10 aspect-[16/9] w-full rounded-xl object-cover ring-1 ring-line md:aspect-[21/9]"
          />
        </Reveal>

        <Reveal delay={90}>
          <section className="mt-20 md:mt-32">
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              Our Offerings
            </h2>
            <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-mute">
              Trained technicians, original parts and predictable turnaround: the services we offer to keep the
              equipment your business depends on running.
            </p>
            <div className="mt-12 space-y-12 md:space-y-20">
              {services.map((s, i) => (
                <Reveal key={s.title}>
                  <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className={`aspect-[16/10] w-full rounded-xl object-cover ring-1 ring-line ${i % 2 ? "md:order-2" : ""}`}
                    />
                    <div>
                      <h3 className="font-display text-[clamp(1.25rem,2.6vw,1.7rem)] font-extrabold tracking-tight text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{s.details.join(" ")}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}