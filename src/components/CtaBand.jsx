import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { ContactInfo } from "./ui/ContactInfo";

export function CtaBand() {
  return (
    <section id="contact" className="pb-24 pt-8 md:pb-28">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#006cb1] p-8 text-white shadow-[0_40px_90px_-30px_rgba(0,108,177,0.6)] md:p-14">
            <div className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 rounded-full bg-white/15 blur-[70px]" style={{ animation: "drift-b 16s ease-in-out infinite" }} />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-widest ring-1 ring-white/25">
                  Showroom &amp; warehouse
                </p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold leading-[1.04] tracking-tight">
                  Stuck on something?
                  <br />
                  <span className="text-white/90">Bring it in.</span>
                </h2>
                <p className="mt-5 max-w-xl text-white/85">
                  No ticket required — our desks are full of fixes in progress. If you'd rather not brave
                  the traffic, the inbox works just as well.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="https://www.google.com/maps/search/?api=1&query=Hamburger+Strasse+73+38122+Braunschweig" target="_blank" rel="noreferrer">
                    <Button variant="ghost" className="rounded-full px-7 py-3.5 text-[0.92rem]">
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