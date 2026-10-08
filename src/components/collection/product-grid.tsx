import { ProductCard } from "@/components/product/product-card";
import type { ProductSummary } from "@/lib/shopify/types";

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
