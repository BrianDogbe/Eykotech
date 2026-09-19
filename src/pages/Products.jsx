import { PageHeader } from "../components/PageHeader";
import { ProductGrid } from "../components/ProductGrid";

export function Products() {
  return (
    <main>
      <PageHeader eyebrow="The stockroom" title="Our products">
        <p>
          Filter by category or search the whole range. Order online, then pick it up in Braunschweig or have
          our own fleet bring it to you.
        </p>
      </PageHeader>
      <ProductGrid hideHeading />
    </main>
  );
}
