import { brands } from "../data";

function BrandRow() {
  return (
    <>
      {brands.map((b) => (
        <span
          key={b}
          className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-mute hover:text-navy transition-colors px-3 py-1 rounded-full"
        >
          <span className="text-cyan/60">◆</span>
          <span>{b}</span>
        </span>
      ))}
    </>
  );
}

export function BrandMarquee() {
  return (
    <section aria-label="Supported Hardware Brands" className="border-y border-line bg-white py-4 overflow-hidden">
      <div className="marq">
        <div className="marq-track items-center gap-8 md:gap-14" style={{ "--marq": "30s" }}>
          <BrandRow />
          <BrandRow />
        </div>
      </div>
    </section>
  );
}