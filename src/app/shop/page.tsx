import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { CategoryTabs } from "@/components/collection/category-tabs";
import { ProductGrid } from "@/components/collection/product-grid";
import { ShopifyFilters } from "@/components/collection/shopify-filters";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { getProducts } from "@/lib/shopify/products";
import type { ProductPageOptions, StorefrontProductFilter } from "@/lib/shopify/types";

export const metadata: Metadata = { title: "Shop Fine Jewellery" };

interface SearchParams {
  sort?: string;
  available?: string;
  category?: string;
  after?: string;
  filter?: string | string[];
}

const sortMapping: Record<string, NonNullable<ProductPageOptions["sortKey"]>> = {
  featured: "RELEVANCE",
  newest: "CREATED_AT",
  "best-selling": "BEST_SELLING",
  "price-low": "PRICE",
  "price-high": "PRICE",
  title: "TITLE",
};

function parseFilters(value: string | string[] | undefined): StorefrontProductFilter[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.slice(0, 12).flatMap((input) => {
    if (input.length > 2048) return [];
    try {
      const parsed: unknown = JSON.parse(input);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? [parsed as StorefrontProductFilter] : [];
    } catch {
      return [];
    }
  });
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sort = params.sort && sortMapping[params.sort] ? params.sort : "featured";
  const selectedFilterInputs = Array.isArray(params.filter) ? params.filter : params.filter ? [params.filter] : [];
  const query = params.category === "rings"
    ? "product_type:Ring"
    : params.category === "jewellery"
      ? "product_type:Jewellery"
      : null;
  const result = await getProducts({
    first: 24,
    after: params.after && params.after.length <= 512 ? params.after : null,
    query,
    sortKey: sortMapping[sort],
    reverse: sort === "price-high" || sort === "newest",
    filters: parseFilters(params.filter),
  });
  const nextParams = new URLSearchParams();
  if (sort !== "featured") nextParams.set("sort", sort);
  if (params.category) nextParams.set("category", params.category);
  for (const filter of selectedFilterInputs) nextParams.append("filter", filter);
  const nextHref = result.state === "ready" && result.data.pageInfo.hasNextPage && result.data.pageInfo.endCursor
    ? `/shop?${new URLSearchParams([...nextParams, ["after", result.data.pageInfo.endCursor]])}`
    : null;

  return (
    <main className="min-h-[65vh]" id="main-content">
      <div className="page-shell pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Shop" }]} />
      </div>
      <header className="grid gap-0 px-4 py-10 sm:px-7 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-16">
        <div className="flex flex-col justify-center bg-cream px-5 py-8 sm:px-9 md:px-12 lg:px-16">
          <h1 className="display-face max-w-[10ch] text-[clamp(2.5rem,5vw,4.7rem)] leading-[1.08] text-charcoal">Pieces for the moments you keep.</h1>
          <p className="mt-4 max-w-[28rem] text-sm leading-6 text-coffee">Explore the Anokhi edit of fine jewellery, from signature rings to thoughtful finishing touches.</p>
        </div>
        <div className="photo-well relative aspect-[1.2] bg-ivory md:aspect-auto md:min-h-[22rem]">
          <Image alt={placeholderImages.jewellerySet.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 56vw" src={placeholderImages.jewellerySet.src} />
        </div>
      </header>
      <section className="page-shell pb-16 pt-5 md:pb-24" aria-label="Shop catalogue">
        <CategoryTabs active={params.category === "rings" ? "rings" : params.category === "jewellery" ? "jewellery" : "all"} />
        {result.state === "ready" ? (
          <>
            <div className="mt-6">
              <ShopifyFilters
                action="/shop"
                clearHref={params.category ? `/shop?category=${params.category}` : "/shop"}
                groups={result.data.filters}
                selected={selectedFilterInputs}
                sort={sort}
              />
            </div>
            <div className="mt-8">
              <p className="mb-5 text-xs text-coffee">Showing {result.data.products.length} products from the current Shopify page.</p>
              <ProductGrid products={result.data.products} />
              {nextHref ? <div className="mt-10 text-center"><Link className="inline-flex min-h-11 items-center border border-taupe/60 px-6 text-[10px] tracking-[0.14em]" href={nextHref}>LOAD MORE</Link></div> : null}
            </div>
          </>
        ) : (
          <div className="mt-8">
            <ShopifyState result={result} emptyAction={{ label: "EXPLORE COLLECTIONS", href: "/collections" }} />
          </div>
        )}
      </section>
      <section className="bg-cream px-4 py-12 sm:px-7 md:py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] items-center gap-6 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="display-face text-3xl text-charcoal">Made for your way of wearing.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-coffee">Find the jewellery styles that suit your everyday and the occasions you keep close.</p>
            <Link className="quiet-link mt-5 inline-flex items-center gap-2 pb-1 text-[10px] tracking-[0.14em]" href="/jewellery">EXPLORE JEWELLERY <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="photo-well relative aspect-[1.7] rounded-[12px]"><Image alt={placeholderImages.bracelet.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 55vw" src={placeholderImages.bracelet.src} /></div>
        </div>
      </section>
    </main>
  );
}
