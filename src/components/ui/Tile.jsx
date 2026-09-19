/* Shared surface for every browsable card on the site: categories, products,
   related items. One radius, one border, one hover so the grids read as a set. */
export const tileCls =
  "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface text-left transition-[border-color,box-shadow] duration-200 hover:border-primary/40 hover:shadow-[0_14px_34px_-22px_rgba(20,40,90,0.3)]";

export const tileImgCls =
  "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]";

export function TileArrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 text-mute transition-[color,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-primary ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
