import { Button } from "./ui/Button";

const tagStyle = {
  "In stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  New: "bg-primarytint text-primarydeep ring-primary/25",
  Popular: "bg-cyan/10 text-cyandeep ring-cyan/30",
};

export const productBadgeCls = (p) =>
  p.id === 3
    ? "bg-amber-100 text-amber-800 ring-amber-300"
    : tagStyle[p.tag] || "bg-surface2 text-mute ring-line";

export function ProductCard({
  product: p,
  isHome = false,
  showMeta = true,
  added = false,
  pulse = 0,
  onOpen,
  onAdd,
}) {
  const interactive = !isHome;
  const open = () => onOpen?.(p);

  return (
    <article
      {...(interactive
        ? {
            role: "link",
            tabIndex: 0,
            onClick: open,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open();
              }
            },
          }
        : {})}
      className={`flex h-full flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-line ${
        interactive ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative block w-full overflow-hidden bg-surface2">
        <img src={p.img} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        {p.tag && (
          <span className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-wider ring-1 ${productBadgeCls(p)}`}>
            {p.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-widest text-primary">
          {p.brand || "Eykotech"}
        </p>
        <h3 className="mt-1 font-display text-[0.98rem] font-bold leading-tight text-ink">{p.name}</h3>
        <p className="mt-1 line-clamp-1 text-[0.75rem] leading-relaxed text-mute sm:line-clamp-2">{p.spec}</p>

        {showMeta && (
          <div className="mt-2 hidden items-center justify-between gap-2 text-[0.72rem] sm:flex">
            <span className="font-mono text-amber-600 dark:text-amber-400" aria-label={`${p.rating} out of 5`}>
              ★ {p.rating.toFixed(1)}
            </span>
          </div>
        )}

        <p className="mt-1.5 font-display text-[0.92rem] font-bold text-ink">{p.priceGuidance}</p>

        {interactive &&
          (added ? (
            <span key={pulse} className="anim-pop mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] py-2 text-[0.8rem] font-bold text-white">
              <span className="anim-check inline-block" aria-hidden="true">✓</span>
              <span>Added</span>
            </span>
          ) : (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onAdd?.(p);
              }}
              className="mt-2 w-full rounded-xl py-2 text-[0.8rem]"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="19" cy="21" r="1.5" />
                <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
              </svg>
              Add to cart
            </Button>
          ))}
      </div>
    </article>
  );
}