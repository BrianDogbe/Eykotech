import { brandLogos } from "../brandLogos";
import { Reveal } from "./ui/Reveal";

/* One copy of the row is narrower than the container, so a two-copy track leaves a
   visible gap before it resets. Render enough copies that the tail always covers
   the viewport, and shift by exactly one copy. */
const SETS = 4;

function Logo({ name, viewBox, w, h, d, dup = false }) {
  return (
    <li className="flex shrink-0 items-center justify-center px-8 md:px-10" aria-hidden={dup || undefined}>
      <svg
        viewBox={viewBox}
        width={w}
        height={h}
        role={dup ? "presentation" : "img"}
        aria-label={dup ? undefined : name}
        className="fill-current text-mute transition-colors duration-300 hover:text-ink"
      >
        <path d={d} />
      </svg>
    </li>
  );
}

export function BrandMarquee() {
  return (
    <section aria-labelledby="partners-heading" className="border-b border-line bg-surface py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <p id="partners-heading" className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
            Brands we supply and service
          </p>
        </Reveal>

        <Reveal delay={100} className="marq mt-10 md:mt-12">
          <ul className="marq-track items-center" style={{ "--marq": "48s", "--marq-sets": SETS }}>
            {Array.from({ length: SETS }, (_, set) =>
              brandLogos.map((b) => (
                <Logo key={`${set}-${b.name}`} {...b} dup={set > 0} />
              ))
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
