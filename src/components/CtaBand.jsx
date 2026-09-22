import { address } from "../data";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { ContactInfo } from "./ui/ContactInfo";

export function CtaBand() {
  return (
    <section id="contact" className="bg-surface2 pb-20 pt-4 md:pb-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-[#006cb1] p-8 text-white md:p-14">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/55" />
            <div className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rounded-full bg-white/15 blur-[70px]" style={{ animation: "drift-b 16s ease-in-out infinite" }} />

            <div className="relative grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-widest ring-1 ring-white/25">
                  Showroom &amp; warehouse
                </p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight">
                  Stuck on something?
                  <br />
                  <span className="text-white/90">Bring it in.</span>
                </h2>
                <p className="mt-5 max-w-xl text-white/85">
                  No ticket required — our desks are full of fixes in progress. If you'd rather not brave
                  the traffic, the inbox works just as well.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href={`mailto:${address.email}?subject=Support%20request`} className="w-full sm:w-auto">
                    <Button variant="white" className="w-full px-7 py-3.5 text-[0.92rem] sm:w-auto">
                      Email us
                    </Button>
                  </a>
                  <a href="https://www.google.com/maps/search/?api=1&query=Hamburger+Strasse+73+38122+Braunschweig" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                    <Button variant="ghost" className="w-full px-7 py-3.5 text-[0.92rem] sm:w-auto">
                      Get directions
                    </Button>
                  </a>
                </div>
              </div>

              <ContactInfo variant="glass" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}