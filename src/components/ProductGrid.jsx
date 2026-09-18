import { useEffect, useMemo, useRef, useState } from "react";
import { products, filters } from "../data";
import { useCatalog } from "../useCatalog";
import { useCart } from "../useCart";
import { go } from "../useHashRoute";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { ProductCard } from "./ProductCard";

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

useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);

  useEffect(() => {
    if (mode !== "home") {
      try { sessionStorage.setItem("eyko_products_q", q); } catch {}
    }
  }, [q, mode]);

  const handleAdd = (p) => {
    if (justAdded === p.id) return;
    addToCart(p);
    setJustAdded(p.id);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(null), 800);
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
    return isHome ? list.slice(0, 4) : list;
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
    <section id="products" className="border-y border-line py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className={centered ? "text-center" : "flex flex-wrap items-end justify-between gap-6"}>
          <div className={centered ? "mx-auto max-w-2xl" : ""}>
            {headingEyebrow && (
              <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">{headingEyebrow}</p>
            )}
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-extrabold tracking-tight text-ink">
              {headingTitle}
            </h2>
            <p className={`mt-2 max-w-md text-mute ${centered ? "mx-auto" : ""}`}>
              {headingSub}
            </p>
          </div>

          {!centered && isHome && (
            <Button variant="primary" onClick={() => go("/products")} className="rounded-full px-6 py-3 text-sm">
              View all products
            </Button>
          )}
        </Reveal>

        {!isHome && (
          <Reveal className="text-center">
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="mt-10 w-full max-w-xs rounded-xl border border-line bg-surface px-5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-mute"
            />
          </Reveal>
        )}

        {!isHome && (
          <>
            <Reveal delay={80} className="mt-4 flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => pick(f)}
                  className={`rounded-full px-4 py-2 text-[0.8rem] font-semibold transition-all duration-200 ${
                    active === f
                      ? "bg-primary text-white"
                      : "bg-surface text-mute ring-1 ring-line hover:text-ink hover:ring-primary/40"
                  }`}
                >
                  {chipLabel[f]}
                </button>
              ))}
            </Reveal>

            <p className="mt-6 text-sm text-mute">
              {results.length} {results.length === 1 ? "item" : "items"}
            </p>
          </>
        )}

        {results.length > 0 ? (
          <div className={`mt-4 grid grid-cols-2 gap-5 ${isHome ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {results.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 60} className={isHome && i === 3 ? "lg:hidden" : ""}>
                <ProductCard
                  product={p}
                  isHome={isHome}
                  added={justAdded === p.id}
                  onOpen={() => go(`/product/${p.id}`)}
                  onAdd={handleAdd}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-surface px-6 py-16 text-center ring-1 ring-line">
            <p className="font-display text-xl font-bold text-ink">Nothing found there.</p>
            <p className="mt-1 text-sm text-mute">Try another word — or ask us, we usually have it in the back.</p>
          </div>
        )}

        {related.length > 0 && results.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    Completes the setup
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-ink">
                    Related products
                  </h3>
                  <p className="mt-2 max-w-md text-mute">
                    Hardware that usually pairs with what you're looking at.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 60}>
                  <ProductCard
                    product={p}
                    showMeta={false}
                    added={justAdded === p.id}
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