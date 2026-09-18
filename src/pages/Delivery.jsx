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

export function Delivery() {
  return (
    <main className="border-y border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <h1 className="mx-auto mt-5 max-w-3xl text-center font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight text-ink">
            Delivered to every corner of the country and sub-regions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            Eykotech has a fleet of vehicles that deliver to every corner of the country and other sub-regions.
            We elevate all forms of delays in delivery and provide the best of customer services.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[0.98rem] leading-relaxed text-mute">
            Visiting our showrooms gives you varieties of products to choose from — from small items to enterprise
            hardware. Sales services are automated at all our various branches, and there is a guarantee on each
            item purchased. Eykotech also offers free advice to customers purchasing its products to ensure proper safety.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
            alt="Eykotech delivery in progress"
            loading="lazy"
            className="mt-12 hidden aspect-[21/9] w-full rounded-3xl object-cover ring-1 ring-line md:block"
          />
        </Reveal>

        <Reveal delay={90}>
          <section className="mt-12 overflow-hidden rounded-3xl bg-surface ring-1 ring-line md:grid md:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
              alt="Server room keeping your data always available"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover md:aspect-auto md:h-full"
            />
            <div className="p-8 md:p-12">
              <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] font-extrabold tracking-tight text-ink">
                Your data is always available.
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-mute">
                Reliability is the key to success in the IT networking environment. With our high quality solutions
                and systems, you can be sure that your data is always available for both you and your customers.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-14">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              What our technical team works on
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
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
      </div>
    </main>
  );
}