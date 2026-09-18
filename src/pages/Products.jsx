import { ProductGrid } from "../components/ProductGrid";

export function Products() {
  return (
    <main className="bg-bg">
      <ProductGrid
        centered
        headingEyebrow=""
        headingTitle="Our Products"
        headingSub="Filter by category or search the whole range — order online, delivered or picked up in Braunschweig."
      />
    </main>
  );
}