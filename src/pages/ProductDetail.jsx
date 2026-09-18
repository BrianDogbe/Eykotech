import { useEffect, useRef, useState } from "react";
import { categories, products } from "../data";
import { useCart } from "../useCart";
import { go } from "../useHashRoute";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";

function badgeStyle(p) {
  if (p.id === 3) return "bg-amber-100 text-amber-800 ring-amber-300";
  switch (p.tag) {
    case "Popular":
      return "bg-cyan/10 text-cyandeep ring-cyan/30";
    case "In stock":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "New":
      return "bg-primarytint text-primarydeep ring-primary/25";
    default:
      return "bg-surface2 text-mute ring-line";
  }
}

export function ProductDetail({ id }) {
  const p = products.find((x) => x.id === id);
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleAdd = () => {
    if (justAdded) return;
    addToCart(p);
    setJustAdded(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 800);
  };

  if (!p) {
    return (
      <main className="border-y border-line bg-bg">
        <div className="mx-auto max-w-7xl px-5 py-28 text-center">
          <p className="font-display text-2xl font-extrabold text-ink">Product not found</p>
          <p className="mt-2 text-mute">It may have been moved or is out of range.</p>
          <Button
            variant="primary"
            href="#/products"
            className="mt-8 rounded-full px-7 py-3.5 text-sm"
          >
            ← Back to products
          </Button>
        </div>
      </main>
    );
  }

  const cat = categories.find((c) => c.id === p.cat);
  const related = products
    .filter((x) => x.cat === p.cat && x.id !== p.id)
    .slice(0, 4);

  return (
    <main className="border-y border-line bg-bg">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <Reveal>
          <nav className="flex flex-wrap items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wider text-mute">
            <a href="#/products" className="transition-colors hover:text-primary">
              Products
            </a>
            <span aria-hidden="true">/</span>
            <a href="#/products" className="transition-colors hover:text-primary">
              {cat ? cat.title : "All"}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{p.name}</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
              {p.tag && (
                <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 font-mono text-[0.66rem] font-bold uppercase tracking-wider ring-1 ${badgeStyle(p)}`}>
                  {p.tag}
                </span>
              )}
              <img
                src={p.img}
                alt={p.name}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary">
              {p.brand || "Eykotech"}
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-ink">
              {p.name}
            </h1>

            <p className={`mt-3 font-mono text-[0.8rem] font-semibold ${p.inStockCount > 10 ? "text-emerald-600" : "text-amber-600"}`}>
              {p.inStockCount} in stock
            </p>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-mute">{p.fullDesc}</p>

            <p className="mt-6 font-display text-2xl font-extrabold text-ink">{p.priceGuidance}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {justAdded ? (
                <Button
                  variant="primary"
                  onClick={handleAdd}
                  className="anim-pop rounded-full px-8 py-3.5 text-[0.92rem] shadow-none! bg-[#059669]! hover:bg-[#059669]!"
                >
                  <span className="anim-check inline-block" aria-hidden="true">✓</span>
                  <span>Added</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleAdd}
                  className="rounded-full px-8 py-3.5 text-[0.92rem] shadow-none! hover:bg-[#006cb1]!"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1.5" />
                    <circle cx="19" cy="21" r="1.5" />
                    <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
                  </svg>
                  Add to cart
                </Button>
              )}
            </div>

            {p.features && p.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-lg font-bold text-ink">What's in the box / key specs</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 rounded-xl bg-surface px-4 py-3 text-[0.82rem] leading-snug text-mute ring-1 ring-line">
                      <span className="mt-0.5 text-primary" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    More from {cat ? cat.title : "this line"}
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-tight text-ink">
                    Related products
                  </h2>
                </div>
                <a href="#/products" className="text-sm font-bold text-primary transition-colors hover:text-primarydeep">
                  View all →
                </a>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((x, i) => (
                <Reveal key={x.id} delay={i * 60}>
                  <article
                    role="link"
                    tabIndex={0}
                    onClick={() => go(`/product/${x.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        go(`/product/${x.id}`);
                      }
                    }}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,40,90,0.3)] hover:ring-primary/40"
                  >
                    <div className="w-full overflow-hidden bg-surface2">
                      <img
                        src={x.img}
                        alt={x.name}
                        loading="lazy"
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-widest text-primary">
                        {x.brand || "Eykotech"}
                      </p>
                      <h3 className="mt-1 font-display text-[0.95rem] font-bold leading-tight text-ink">
                        {x.name}
                      </h3>
                      <p className="mt-2 font-display text-[0.9rem] font-bold text-ink">{x.priceGuidance}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}