import { Reveal } from "../components/ui/Reveal";
import { ProcessMosaic } from "../components/ProcessStrip";
import { PageHeader } from "../components/PageHeader";


export function Delivery() {
  return (
    <main>
      <PageHeader
        eyebrow="Delivery service"
        title="Delivered to every corner of the country and sub-regions"
      >
        <p>
          Eykotech has a fleet of vehicles that deliver to every corner of the country and other sub-regions.
          We elevate all forms of delays in delivery and provide the best of customer services.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal delay={60}>
          <p className="max-w-3xl text-[0.98rem] leading-relaxed text-mute">
            Visiting our showrooms gives you varieties of products to choose from, ranging from small items to
            enterprise hardware. Sales services are automated at all our various branches, and there is a
            guarantee on each item purchased. Eykotech also offers free advice to customers purchasing its
            products to ensure proper safety.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
            alt="Eykotech delivery in progress"
            loading="lazy"
            className="mt-10 hidden aspect-[21/9] w-full rounded-xl object-cover ring-1 ring-line md:mt-24 md:block"
          />
        </Reveal>

        <Reveal delay={90}>
          <section className="mt-20 overflow-hidden rounded-xl bg-surface ring-1 ring-line md:mt-32 md:grid md:grid-cols-2">
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
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              How our delivery works
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-mute">
              From placed order to your doorstep: a fleet that covers the whole country, with a guarantee on
              every item and free advice along the way.
            </p>
            <ProcessMosaic className="mt-8" />
          </section>
        </Reveal>
      </div>
    </main>
  );
}