import { Eyebrow } from "./SectionHead";

/**
 * The header band every inner page opens with: eyebrow, page title on the left,
 * a short intro on the right. One pattern so the pages read as one site.
 */
export function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-6 px-5 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.04] tracking-tight text-ink">
            {title}
          </h1>
        </div>
        {children && (
          <div className="max-w-[52ch] space-y-3 text-[1.02rem] leading-relaxed text-mute lg:col-span-5 lg:pb-2">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
