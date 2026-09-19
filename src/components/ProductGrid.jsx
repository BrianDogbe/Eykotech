import { useEffect, useMemo, useRef, useState } from "react";
import { products, filters } from "../data";
import { useCatalog } from "../useCatalog";
import { useCart } from "../useCart";
import { go } from "../useHashRoute";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { ProductCard } from "./ProductCard";

const HOME_IDS = [3, 5, 7, 9];

const chipLabel = {
  all: "All",
  computers: "Computers",
  printing: "Printing",
  networking: "Networking",
  storage: "Storage",
  furniture: "Furniture",
  cables: "Cables",
  accessories: "Accessories",
  presentation: "Presentation",
};

export function ProductGrid({
  mode = "full",
  hideHeading = false,
  q: queryProp,
  onSearch,
  centered = false,
  headingEyebrow = "Fresh off the shelves",
  headingTitle = "Featured hardware",
  headingSub = "Real stock, real prices, tested by our technicians before dispatch.",
}) {
  const { activeCategory, setActiveCategory } = useCatalog();
  const { addToCart } = useCart();
  const [active, setActive] = useState(activeCategory || "all");
  const [q, setQ] = useState(() => {
  if (mode === "home") return "";
  try { return sessionStorage.getItem("eyko_products_q") || ""; } catch { return ""; }
});
  const [justAdded, setJustAdded] = useState(null);
  const timerRef = useRef(null);
  const pulseRef = useRef(0);

useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);

  useEffect(() => {
    if (mode !== "home") {
      try { sessionStorage.setItem("eyko_products_q", q); } catch {}
    }
  }, [q, mode]);

  const handleAdd = (p) => {
    addToCart(p);
    pulseRef.current += 1;
    setJustAdded({ id: p.id, pulse: pulseRef.current });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(null), 500);
  };

  useEffect(() => {
    setActive(activeCategory || "all");
  }, [activeCategory]);

  const isHome = mode === "home";
  const query = queryProp !== undefined ? queryProp : q;
  const handleSearch = onSearch || setQ;

  const results = useMemo(() => {
    const lower = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const okCat = active === "all" || p.cat === active;
      const okQ =
        !lower ||
        p.name.toLowerCase().includes(lower) ||
        p.brand?.toLowerCase().includes(lower) ||
        p.spec.toLowerCase().includes(lower);
      return okCat && okQ;
    });
    return isHome ? products.filter((p) => HOME_IDS.includes(p.id)) : list;
  }, [query, active, isHome]);

  const pick = (cat) => {
    setActive(cat);
    setActiveCategory(cat);
  };

  const related = useMemo(() => {
    if (isHome) return [];
    const pool = products.filter((p) => !results.some((r) => r.id === p.id));
    if (pool.length === 0) return [];
    if (active !== "all") {
      const same = pool.filter((p) => p.cat === active);
      return (same.length >= 4 ? same : [...same, ...pool.filter((p) => p.cat !== active)]).slice(0, 4);
    }
    return pool.slice(0, 4);
  }, [results, active, isHome]);

  return (
    <section id="products" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        {!hideHeading && (
        <Reveal className={centered ? "text-center" : "flex flex-wrap items-end justify-between gap-6"}>
          <div className={centered ? "mx-auto max-w-2xl" : ""}>
            {headingEyebrow && (
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">{headingEyebrow}</p>
            )}
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              {headingTitle}
            </h2>
            <p className={`mt-2 max-w-md text-mute ${centered ? "mx-auto" : ""}`}>
              {headingSub}
            </p>
          </div>

          {!centered && isHome && (
            <Button variant="secondary" href="#/products" className="px-6 py-3 text-sm">
              View all products
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
          )}
        </Reveal>
        )}

        {!isHome && (
          <Reveal>
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className={`field w-full max-w-xl ${hideHeading ? "" : "mt-10"}`}
            />
          </Reveal>
        )}

        {!isHome && (
          <>
            <Reveal delay={80} className="mt-4">
              <div
                role="tablist"
                aria-label="Filter products by category"
                className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1.5 sm:mx-0 sm:flex-wrap sm:px-0"
              >
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="tab"
                    aria-selected={active === f}
                    onClick={() => pick(f)}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-[0.8rem] font-semibold transition-colors duration-200 ${
                      active === f
                        ? "bg-primary text-white"
                        : "bg-surface text-mute ring-1 ring-line hover:text-ink hover:ring-primary/40"
                    }`}
                  >
                    {chipLabel[f]}
                  </button>
                ))}
              </div>
            </Reveal>

            <p className="mt-6 text-sm text-mute">
              {results.length} {results.length === 1 ? "item" : "items"}
            </p>
          </>
        )}

        {results.length > 0 ? (
          <div className={`grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 ${isHome ? "mt-10" : "mt-4"}`}>
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60} className="h-full">
                <ProductCard
                  product={p}
                  isHome={isHome}
                  added={justAdded?.id === p.id}
                  pulse={justAdded?.id === p.id ? justAdded.pulse : 0}
                  onOpen={() => go(`/product/${p.id}`)}
                  onAdd={handleAdd}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl bg-surface px-6 py-16 text-center ring-1 ring-line">
            <p className="font-display text-xl font-bold text-ink">Nothing found there.</p>
            <p className="mt-1 text-sm text-mute">Try another word, or ask us. We usually have it in the back.</p>
          </div>
        )}

        {isHome && centered && results.length > 0 && (
          <Reveal delay={120} className="mt-10 text-center">
            <Button
              variant="primary"
              onClick={() => go("/products")}
              className="px-7 py-3 text-sm"
            >
              View more products
            </Button>
          </Reveal>
        )}

        {related.length > 0 && results.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    Completes the setup
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
                    Related products
                  </h3>
                  <p className="mt-2 max-w-md text-mute">
                    Hardware that usually pairs with what you're looking at.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 60} className="h-full">
                  <ProductCard
                    product={p}
                    showMeta={false}
                    added={justAdded?.id === p.id}
                    pulse={justAdded?.id === p.id ? justAdded.pulse : 0}
                    onOpen={() => go(`/product/${p.id}`)}
                    onAdd={handleAdd}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}