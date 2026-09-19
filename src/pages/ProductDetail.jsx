import { useEffect, useRef, useState } from "react";
import { categories, products } from "../data";
import { useCart } from "../useCart";
import { go } from "../useHashRoute";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";

export function ProductDetail({ id }) {
  const p = products.find((x) => x.id === id);
  const { items, addToCart, setQuantity, updateQuantity, removeItem, openCart } = useCart();
  const [phase, setPhase] = useState("idle");
  const [toastPhase, setToastPhase] = useState("off");
  const [showQty, setShowQty] = useState(false);
  const [qtyDraft, setQtyDraft] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const cartQty = items.find((i) => i.product.id === p?.id)?.quantity ?? 0;
  const showStepper = showQty && cartQty > 0;

  useEffect(() => {
    setQtyDraft(String(cartQty));
  }, [cartQty, showStepper]);

  const handleAdd = () => {
    if (phase !== "idle") return;
    addToCart(p);
    setPhase("checking");
    setToastPhase("on");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase("added");
      timerRef.current = setTimeout(() => {
        setPhase("idle");
        setShowQty(true);
        setToastPhase("out");
        timerRef.current = setTimeout(() => setToastPhase("off"), 250);
      }, 900);
    }, 250);
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
            className="mt-8 px-7 py-3.5 text-sm"
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
          <a
            href="#/products"
            className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-bold text-ink ring-1 ring-line transition-colors hover:bg-primary hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            Back
          </a>
          <nav className="mt-4 flex flex-wrap items-center gap-2 text-[0.82rem] text-mute">
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
            <div className="relative overflow-hidden rounded-xl bg-surface ring-1 ring-line">
              <img
                src={p.img}
                alt={p.name}
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
              {p.brand || "Eykotech"}
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-ink">
              {p.name}
            </h1>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p
                className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-[0.8rem] font-semibold ring-1 ${
                  p.inStockCount > 10
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-amber-50 text-amber-800 ring-amber-200"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${p.inStockCount > 10 ? "bg-emerald-500" : "bg-amber-500"}`}
                />
                {p.inStockCount} in stock
              </p>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-amber-500" role="img" aria-label={`${p.rating} out of 5 stars`}>
                  {Array.from({ length: Math.round(p.rating) }, (_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
                    </svg>
                  ))}
                </span>
                <span className="text-sm text-mute">{p.rating.toFixed(1)} rating</span>
              </div>
            </div>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-mute">{p.fullDesc}</p>

            <p className="mt-6 font-display text-2xl font-extrabold text-ink">{p.priceGuidance}</p>

            <div className="mt-7 sm:flex sm:flex-wrap sm:items-center">
              {showStepper ? (
                <div className="anim-pop inline-flex h-[50px] w-auto items-center justify-center gap-1.5 rounded-xl bg-primary p-1 sm:min-w-[10rem]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(p.id, -1)}
                    aria-label="Decrease quantity"
                    className="grid h-full w-10 place-items-center rounded-lg text-base font-bold text-white transition-colors hover:bg-primarydeep"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    aria-label="Quantity"
                    value={qtyDraft}
                    onChange={(e) => {
                      setQtyDraft(e.target.value);
                      const n = parseInt(e.target.value, 10);
                      if (!Number.isNaN(n) && n > 0) setQuantity(p.id, n);
                    }}
                    onBlur={() => {
                      const n = parseInt(qtyDraft, 10);
                      if (Number.isNaN(n) || n <= 0) removeItem(p.id);
                      else setQuantity(p.id, n);
                      setQtyDraft(String(cartQty));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                    className="h-full w-12 rounded-lg bg-black/15 text-center font-display text-[0.92rem] font-bold text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => addToCart(p)}
                    aria-label="Increase quantity"
                    className="grid h-full w-10 place-items-center rounded-lg text-base font-bold text-white transition-colors hover:bg-primarydeep"
                  >
                    +
                  </button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleAdd}
                  disabled={phase !== "idle"}
                  className={`w-full px-8 py-3.5 text-[0.92rem] sm:w-auto sm:min-w-[15rem] ${
                    phase === "added"
                      ? "anim-pop bg-emerald-600! hover:bg-emerald-600! disabled:opacity-100!"
                      : ""
                  }`}
                >
                  {phase === "checking" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                      Adding…
                    </>
                  ) : phase === "added" ? (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="anim-check"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                      Added to cart
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1.5" />
                        <circle cx="19" cy="21" r="1.5" />
                        <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
                      </svg>
                      Add to cart
                    </>
                  )}
                </Button>
              )}

              <Button variant="secondary" href="#/contact" className="mt-3 w-full px-6 py-3.5 text-[0.92rem] sm:ml-3 sm:mt-0 sm:w-auto">
                Ask about this
              </Button>
            </div>

            <ul className="mt-7 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
              {[
                [
                  "Delivery",
                  "24 to 48h regional",
                  <path key="d" d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM7.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
                ],
                [
                  "Warranty",
                  p.warranty || "Manufacturer warranty",
                  <path key="w" d="M12 3l7 3v5c0 4.2-2.9 7.6-7 8.8C7.9 18.6 5 15.2 5 11V6z" />,
                ],
                [
                  "Before dispatch",
                  "Configured and tested",
                  <path key="t" d="m5 12.5 4.5 4.5L19 7.5" />,
                ],
              ].map(([label, value, icon]) => (
                <li key={label} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-primary">
                    {icon}
                  </svg>
                  <span className="min-w-0">
                    <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-mute">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[0.85rem] font-semibold leading-snug text-ink">{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            {p.features && p.features.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-lg font-bold text-ink">What's in the box / key specs</h2>
                <ul className="mt-4 grid gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-mute">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 shrink-0 text-primary"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10">
              <h2 className="font-display text-lg font-bold text-ink">Details at a glance</h2>
              <dl className="mt-4 divide-y divide-line border-t border-b border-line">
                {[
                  ["Brand", p.brand || "Eykotech"],
                  ["Category", cat ? cat.title : "General hardware"],
                  ["Warranty", p.warranty || "Standard manufacturer warranty"],
                  [
                    "Availability",
                    p.inStockCount > 10
                      ? `In stock, ${p.inStockCount} ready to ship`
                      : "Low stock, call to reserve",
                  ],
                  ["Delivery", "Same-day pickup · 24–48h fleet delivery across the region"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="text-[0.82rem] font-semibold text-mute">{k}</dt>
                    <dd className="text-[0.9rem] font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-primary">
                    More from {cat ? cat.title : "this line"}
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold tracking-tight text-ink">
                    Related products
                  </h2>
                </div>
                <a href="#/products" className="text-sm font-bold text-primary transition-colors hover:text-primarydeep">
                  View all products
                </a>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-surface ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,40,90,0.3)] hover:ring-primary/40"
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
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">
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

      {toastPhase !== "off" && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-4">
          <div
            className={`pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-xl bg-surface p-3 shadow-[0_30px_60px_-20px_rgba(10,20,40,0.45)] ring-1 ring-line transition-opacity duration-300 ${
              toastPhase === "on" ? "anim-pop opacity-100" : "opacity-0"
            }`}
          >
            <img src={p.img} alt="" className="hidden min-[400px]:block h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-line" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-ink">Added to cart</p>
              <p className="truncate text-xs text-mute">{p.name}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setToastPhase("off");
                  openCart();
                }}
                className="px-4 py-2 text-xs"
              >
                View cart
              </Button>
              <button
                type="button"
                onClick={() => setToastPhase("off")}
                aria-label="Dismiss notification"
                className="grid h-8 w-8 place-items-center rounded-full text-mute transition-colors hover:bg-surface2 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}