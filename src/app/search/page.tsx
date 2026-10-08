import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { ProductGrid } from "@/components/collection/product-grid";
import { SearchForm } from "@/components/search/search-form";
import { searchProducts } from "@/lib/shopify/products";

export const metadata: Metadata = { title: "Search Jewellery", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; sort?: string; category?: string }> }) {
  const { q = "", sort = "relevance", category = "all" } = await searchParams;
  const query = q.trim().slice(0, 80);
  const sortKey = sort === "price-low" || sort === "price-high" ? "PRICE" : sort === "newest" ? "CREATED_AT" : sort === "best-selling" ? "BEST_SELLING" : "RELEVANCE";
  const result = query ? await searchProducts(query, { first: 24, sortKey, reverse: sort === "price-high" || sort === "newest" }) : null;
  const matchesCategory = (product: NonNullable<typeof result> extends never ? never : import("@/lib/shopify/types").Product) => {
    const type = `${product.productType} ${product.title} ${product.tags.join(" ")}`.toLowerCase();
    const ring = /ring|solitaire|engagement/.test(type);
    return category === "rings" ? ring : category === "jewellery" ? !ring : true;
  };

  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <header className="py-10 sm:py-14">
        <h1 className="display-face text-[clamp(2.7rem,5vw,4.6rem)] text-charcoal">Find your piece.</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-coffee">Search across all Anokhi jewellery collections.</p>
        <SearchForm initialQuery={query} />
      </header>
      {query ? <section aria-live="polite" aria-label="Search results">
        <div className="mb-6 border-b border-taupe/40 pb-4">
          <h2 className="display-face text-2xl text-charcoal">Results for “{query}”</h2>
        {result?.state === "ready" ? <p className="mt-2 text-xs text-coffee">{result.data.products.filter(matchesCategory).length} products on this page.</p> : null}
        </div>
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-taupe/35 pb-4 text-xs">
          <span className="mr-2 text-coffee">Category</span>
          {[{ label: "All", value: "all" }, { label: "Rings", value: "rings" }, { label: "Jewellery", value: "jewellery" }].map((item) => (
            <a aria-current={category === item.value ? "page" : undefined} className={`border px-3 py-2 ${category === item.value ? "border-anokhi-plum bg-anokhi-plum text-ivory" : "border-taupe/50 text-charcoal"}`} href={`/search?q=${encodeURIComponent(query)}&category=${item.value}&sort=${sort}`} key={item.value}>{item.label}</a>
          ))}
          <form action="/search" className="ml-auto flex items-center gap-2">
            <input name="q" type="hidden" value={query} />
            {category !== "all" ? <input name="category" type="hidden" value={category} /> : null}
            <label className="text-coffee" htmlFor="search-sort">Sort</label>
            <select className="border-b border-taupe bg-transparent px-2 py-2 text-charcoal" defaultValue={sort} id="search-sort" name="sort">
              <option value="relevance">Most relevant</option><option value="best-selling">Best selling</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option>
            </select>
          </form>
        </div>
        {result?.state === "ready" ? <ProductGrid products={result.data.products.filter(matchesCategory)} /> : result ? <ShopifyState result={result} emptyAction={{ label: "EXPLORE COLLECTIONS", href: "/collections" }} /> : null}
      </section> : (
        <div className="border-y border-taupe/40 py-10 text-center">
          <p className="display-face text-2xl text-charcoal">Nothing quite matched your search.</p>
          <p className="mt-2 text-sm text-coffee">Try another style or explore our collections.</p>
        </div>
      )}
    </main>
  );
}
