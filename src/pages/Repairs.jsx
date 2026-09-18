import { Reveal } from "../components/ui/Reveal";
import { FeatureCard } from "../components/ui/FeatureCard";

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
    <main className="border-y border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <h1 className="mx-auto mt-5 max-w-3xl text-center font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight text-ink">
            Repaired and serviced by technicians using original parts
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            Do you simply need a new HP maintenance kit for your laserjet, colorlaserjet, or designjet printer?
            You're in the right place for repairs or service by knowledgeable technicians using original parts.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            With a phone call and some information, we can provide you a no-obligation quote. From there, you can
            submit a service order through email or fax.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <section className="mt-12">
            <h2 className="text-center font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              Services we cover
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <FeatureCard key={s.title} image={s.img} imageAlt={s.title} title={s.title} badge="✓" bullets={s.details} padding="p-5" />
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}