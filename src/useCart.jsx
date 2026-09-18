import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "eyko_cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id !== id) return i;
          const q = i.quantity + delta;
          return q > 0 ? { ...i, quantity: q } : null;
        })
        .filter(Boolean)
    );
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id !== id) return i;
          const max = i.product.inStockCount;
          const q = max ? Math.min(quantity, max) : quantity;
          return q > 0 ? { ...i, quantity: q } : null;
        })
        .filter(Boolean)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      addToCart,
      removeItem,
      updateQuantity,
      setQuantity,
      clearCart,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [items, totalCount, addToCart, removeItem, updateQuantity, setQuantity, clearCart, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}