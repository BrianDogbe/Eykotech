import { Reveal } from "../components/ui/Reveal";
import { FeatureCard } from "../components/ui/FeatureCard";

const steps = [
  {
    title: "Place your order",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Order over the phone, by email, or at any of our branches.",
      "Sales services are automated across all outlets.",
      "Free advice on everything you purchase.",
    ],
  },
  {
    title: "We prepare your items",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Stock is picked, packed and checked before it leaves us.",
      "There is a guarantee on every item purchased.",
      "Great care is taken to keep products safe in transit.",
    ],
  },
  {
    title: "Delivered by our fleet",
    img: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Our own vehicles deliver to every corner of the country and sub-regions.",
      "We cut out delivery delays wherever possible.",
      "Best of customer services, from dispatch to doorstep.",
    ],
  },
  {
    title: "Support after arrival",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
    bullets: [
      "Reliable, high-quality solutions keep your systems running.",
      "Your data stays available for you and your customers.",
      "Proper safety and proper advice on every product we deliver.",
    ],
  },
];

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
            className="mt-16 hidden aspect-[21/9] w-full rounded-3xl object-cover ring-1 ring-line md:mt-24 md:block"
          />
        </Reveal>

        <Reveal delay={90}>
          <section className="mt-20 overflow-hidden rounded-3xl bg-surface ring-1 ring-line md:mt-32 md:grid md:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
              alt="Server room keeping your data always available"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover md:aspect-auto md:h-full"
            />
            <div className="p-8 md:p-12">
              <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] font-extrabold tracking-tight text-ink">
                Your data is always available
              </h2>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-mute">
                Reliability is the key to success in the IT networking environment. With our high quality solutions
                and systems, you can be sure that your data is always available for both you and your customers.
              </p>
            </div>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section className="mt-32 md:mt-48">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
              How our delivery works
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-mute">
              From placed order to your doorstep — a fleet that covers the whole country, with a guarantee on
              every item and free advice along the way.
            </p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <FeatureCard
                  key={s.title}
                  image={s.img}
                  imageAlt={s.title}
                  imageAspect="16/9"
                  title={s.title}
                  bullets={s.bullets}
                />
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}