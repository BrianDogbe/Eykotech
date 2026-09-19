import { Button } from "./ui/Button";
import { tileCls, tileImgCls, TileArrow } from "./ui/Tile";

const tagStyle = {
  "In stock": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  New: "bg-primarytint text-primarydeep ring-primary/25",
  Popular: "bg-amber-100 text-amber-800 ring-amber-300",
};

export const productBadgeCls = (p) => tagStyle[p.tag] || "bg-surface2 text-mute ring-line";

export function ProductCard({
  product: p,
  isHome = false,
  showMeta = true,
  added = false,
  pulse = 0,
  onOpen,
  onAdd,
}) {
  const open = () => onOpen?.(p);

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className={`${tileCls} cursor-pointer`}
    >
      <div className="relative block aspect-[3/2] w-full overflow-hidden bg-surface2">
        <img src={p.img} alt={p.name} loading="lazy" className={tileImgCls} />
        {p.tag && (
          <span className={`absolute left-2.5 top-2.5 rounded-md px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.06em] ring-1 ${productBadgeCls(p)}`}>
            {p.tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-mute">
          <span className="truncate">{p.brand || "Eykotech"}</span>
          {showMeta && (
            <span className="flex shrink-0 items-center gap-1 tabular-nums" aria-label={`Rated ${p.rating} out of 5`}>
              <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true" className="text-amber-500">
                <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
              </svg>
              {p.rating.toFixed(1)}
            </span>
          )}
        </p>

        <h3 className="mt-2 flex items-start justify-between gap-2 font-display text-[0.95rem] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-primary">
          <span>{p.name}</span>
          {isHome && <TileArrow className="mt-0.5" />}
        </h3>
        <p className="mt-1 line-clamp-1 text-[0.8rem] leading-relaxed text-mute sm:line-clamp-2">{p.spec}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="font-display text-[1rem] font-bold text-ink">{p.priceGuidance}</p>
        </div>

        {!isHome &&
          (added ? (
            <span key={pulse} className="anim-pop mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2 text-[0.8rem] font-bold text-white">
              <svg className="anim-check" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              <span>Added</span>
            </span>
          ) : (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onAdd?.(p);
              }}
              className="mt-3 w-full py-2 text-[0.8rem]"
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
