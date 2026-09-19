import { categories } from "../data";
import { useCatalog } from "../useCatalog";
import { go } from "../useHashRoute";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { tileCls, tileImgCls, TileArrow } from "./ui/Tile";

export function Categories() {
  const { setActiveCategory } = useCatalog();

  const open = (id) => {
    setActiveCategory(id);
    go("/products");
  };

  return (
    <section id="categories" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Shop by category"
            title="Everything an office runs on"
            sub="Eight aisles of stock held in Braunschweig, from a single patch lead to a full floor of desks."
          />
          <Button variant="secondary" href="#/products" className="px-6 py-3 text-sm">
            View all products
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Button>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:mt-12 md:gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 60} className="h-full">
              <button type="button" onClick={() => open(c.id)} className={`${tileCls} w-full`}>
                <span className="block aspect-[3/2] w-full overflow-hidden bg-surface2">
                  <img src={c.img} alt="" loading="lazy" className={tileImgCls} />
                </span>

                {/* Mirrors ProductCard's rhythm so both grids read as one family. */}
                <span className="flex flex-1 flex-col p-4">
                  <span className="flex items-center justify-between gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-mute">
                    <span className="truncate">Category</span>
                    <span className="shrink-0 tabular-nums">{c.count}</span>
                  </span>

                  <span className="mt-2 font-display text-[0.95rem] font-bold leading-snug text-ink transition-colors duration-200 group-hover:text-primary">
                    {c.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-[0.8rem] leading-relaxed text-mute">{c.sub}</span>

                  <span className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <span className="font-display text-[0.9rem] font-bold text-primary">Browse</span>
                    <TileArrow />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
