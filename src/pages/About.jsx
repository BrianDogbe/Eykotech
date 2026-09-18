import { Reveal } from "../components/ui/Reveal";
import { FeatureCard } from "../components/ui/FeatureCard";

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
      </div>
    </main>
  );
}