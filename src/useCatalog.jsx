import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const selectCategoryAndScroll = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const value = useMemo(
    () => ({ activeCategory, setActiveCategory, selectCategoryAndScroll }),
    [activeCategory, setActiveCategory, selectCategoryAndScroll]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within a CatalogProvider");
  return ctx;
}