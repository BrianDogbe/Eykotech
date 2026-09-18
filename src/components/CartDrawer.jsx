import { useEffect, useMemo, useState } from "react";
import { useCart } from "../useCart";
import { Button } from "./ui/Button";

function CartIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
      <path d="M2.5 3h2l2.6 12.2a2 2 0 0 0 2 1.8h8.9a2 2 0 0 0 2-1.6L21.5 7H6" />
    </svg>
  );
}

export function CartDrawer() {
  const { items, totalCount, isOpen, closeCart, removeItem, updateQuantity, setQuantity, clearCart } = useCart();
  const [drafts, setDrafts] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const mailto = useMemo(() => {
    if (items.length === 0) return "mailto:info@eykotech.com";
    const subject = encodeURIComponent(`Order request — ${totalCount} item${totalCount === 1 ? "" : "s"}`);
    const body = encodeURIComponent(
      "Hello Eykotech team,\n\nI'd like to order the following from the website:\n\n" +
        items.map((i) => `• ${i.quantity} × ${i.product.name} — ${i.product.spec}`).join("\n") +
        "\n\nPlease send me confirmation. Thank you!"
    );
    return `mailto:info@eykotech.com?subject=${subject}&body=${body}`;
  }, [items, totalCount]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title" className="fixed inset-0 z-[95] flex justify-end">
      <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm" onClick={closeCart} aria-hidden="true" />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-surface text-ink shadow-2xl ring-1 ring-line">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primarytint text-primary">
              <CartIcon size={18} />
            </span>
            <div>
              <h2 id="cart-drawer-title" className="font-display text-xl font-extrabold text-ink">Your cart</h2>
              <p className="font-mono text-xs text-mute">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full bg-surface2 text-mute transition-colors hover:bg-line hover:text-ink"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-surface2 text-primary ring-1 ring-line">
                <CartIcon size={26} />
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink">Your cart is empty</p>
              <p className="mx-auto mt-1 max-w-xs text-xs text-mute">
                Browse the products below and add the hardware your workspace needs.
              </p>
              <Button
                variant="primary"
                href="#/products"
                onClick={closeCart}
                className="mt-4 rounded-xl px-6 py-2.5 text-xs"
              >
                Browse products
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-mute">Items</span>
                <button type="button" onClick={clearCart} className="text-xs font-medium text-rose-500 transition-colors hover:text-rose-600">
                  Clear all
                </button>
              </div>

              <div className="mt-3 divide-y divide-line border-y border-line">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-3.5">
                    <img src={product.img} alt={product.name} className="h-14 w-14 shrink-0 rounded-xl bg-surface2 p-1 ring-1 ring-line" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-ink">{product.name}</p>
                      <p className="truncate font-mono text-[0.7rem] text-mute">{product.spec}</p>
                      <p className="mt-0.5 text-xs font-semibold text-primary">{product.priceGuidance}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <div className="flex items-center overflow-hidden rounded-lg bg-surface2 ring-1 ring-line">
                        <button type="button" onClick={() => updateQuantity(product.id, -1)} className="grid h-7 w-7 place-items-center text-xs font-bold transition-colors hover:bg-line" aria-label="Decrease quantity">
                          −
                        </button>
                        <input
                          type="number"
                          min="0"
                          aria-label="Quantity"
                          value={drafts[product.id] ?? quantity}
                          onChange={(e) => {
                            const v = e.target.value;
                            setDrafts((d) => ({ ...d, [product.id]: v }));
                            const n = parseInt(v, 10);
                            if (!Number.isNaN(n) && n > 0) setQuantity(product.id, n);
                          }}
                          onBlur={() => {
                            const n = parseInt(drafts[product.id] ?? "", 10);
                            setDrafts((d) => {
                              const next = { ...d };
                              delete next[product.id];
                              return next;
                            });
                            if (!Number.isNaN(n) && n <= 0) removeItem(product.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                          }}
                          className="w-8 bg-transparent text-center font-mono text-xs font-semibold text-ink outline-none"
                        />
                        <button type="button" onClick={() => updateQuantity(product.id, 1)} className="grid h-7 w-7 place-items-center text-xs font-bold transition-colors hover:bg-line" aria-label="Increase quantity">
                          +
                        </button>
                      </div>
                      <button type="button" onClick={() => removeItem(product.id)} className="grid h-7 w-7 place-items-center rounded-lg text-mute transition-colors hover:bg-rose-500/10 hover:text-rose-500" aria-label="Remove item">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Button
                  variant="primary"
                  href={mailto}
                  className="w-full rounded-full py-3.5 text-sm"
                >
                  <CartIcon size={16} />
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}