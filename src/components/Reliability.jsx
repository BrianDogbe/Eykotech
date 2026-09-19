import { bigWords } from "../data";
import { WordRotator } from "./ui/WordRotator";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Magnetic";

const cards = [
  ["01", "Repairs & maintenance", "Original parts, real technicians — HP LaserJets, copiers, the lot.", "#/repairs"],
  ["02", "Prompt delivery", "Our own fleet, every corner of the region. Usually 24–48 hours.", "#/delivery"],
  ["03", "Free advice, always", "Tell us what you're trying to do. We'll tell you what actually fits.", "#/contact"],
];

export function Reliability() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-white/10 blur-[80px]" style={{ animation: "drift-a 16s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-[340px] w-[340px] rounded-full bg-ink/20 blur-[80px]" style={{ animation: "drift-b 18s ease-in-out infinite" }} />

      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-white/90 ring-1 ring-white/25">
            The promise
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight">
            Reliability isn't a feature, it's{" "}
            <WordRotator words={bigWords} interval={3000} className="text-white/90 italic" />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/85">
            Every order carries a guarantee, honest advice, and people who actually pick up the phone.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map(([n, t, d, href], i) => (
            <Reveal key={n} delay={i * 110}>
              <a
                href={href}
                className="group block h-full rounded-xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <p className="font-mono text-[0.75rem] font-bold text-white/70">/{n}</p>
                <h3 className="mt-4 font-display text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{d}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition-transform duration-300 group-hover:translate-x-1">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[0.92rem] font-bold text-primary shadow-lg transition-transform hover:scale-[1.02]"
            >
              Get a free, no-obligation quote
              <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}