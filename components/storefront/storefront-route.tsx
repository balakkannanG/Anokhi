import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, PageHero, PageSections, ProductGrid } from "@/components/storefront/page-sections";
import { ProductPurchasePanel } from "@/components/storefront/cart-controls";
import { PAGE_CONTENT } from "@/lib/constants/page-content";
import { placeholderImages } from "@/lib/constants/images";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import { getProductByHandle, getProducts } from "@/lib/shopify/products";
import { searchProducts } from "@/lib/shopify/search";
import type { ShopifyProduct } from "@/lib/shopify/types";

export type StorefrontRouteProps = {
  segments: string[];
  searchParams: Record<string, string | string[] | undefined>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function labelFromHandle(handle: string) {
  return handle.split("-").map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`).join(" ");
}

export async function routeMetadata(segments: string[]): Promise<Metadata> {
  const routeKey = segments.join("/");
  const productHandle = segments[0] === "products" ? segments[1] : undefined;
  const collectionHandle = segments[0] === "collections" && segments.length === 2 ? segments[1] : undefined;
  let title = PAGE_CONTENT[routeKey]?.title;
  let description = PAGE_CONTENT[routeKey]?.description;

  if (productHandle && isShopifyConfigured) {
    const product = await getProductByHandle(productHandle);
    if (product) {
      title = product.title;
      description = product.description.slice(0, 155);
    }
  }

  if (collectionHandle && isShopifyConfigured) {
    const collection = await getCollectionByHandle(collectionHandle);
    if (collection) {
      title = collection.title;
      description = collection.description.slice(0, 155);
    }
  }

  const canonical = `${siteUrl}/${segments.join("/")}`;
  return {
    title: title || labelFromHandle(segments.at(-1) ?? "Anokhi"),
    description: description || "Discover timeless rings and fine jewellery from Anokhi.",
    alternates: { canonical },
    openGraph: {
      title: title || "ANOKHI",
      description: description || "Timeless jewellery designed for unforgettable moments.",
      url: canonical,
      siteName: "ANOKHI",
      type: "website",
    },
  };
}

export async function StorefrontRoute({ segments, searchParams }: StorefrontRouteProps) {
  const routeKey = segments.join("/");
  if (!segments.length) notFound();

  if (segments[0] === "collections" && segments.length === 2) {
    return <DynamicCollection handle={segments[1]} segments={segments} searchParams={searchParams} />;
  }
  if (segments[0] === "products" && segments.length === 2) {
    return <DynamicProduct handle={segments[1]} segments={segments} />;
  }
  if (routeKey === "search") return <SearchRoute searchParams={searchParams} />;
  if (routeKey === "account" || routeKey.startsWith("account/")) {
    if (!(routeKey in PAGE_CONTENT)) notFound();
  }

  const page = PAGE_CONTENT[routeKey];
  if (!page) notFound();

  return (
    <main>
      <Breadcrumbs segments={segments} />
      <JsonLd data={breadcrumbSchema(segments)} />
      {routeKey === "faq" && <JsonLd data={faqSchema(page)} />}
      <PageHero page={page} />
      <PageSections sections={page.sections} routeKey={routeKey} searchParams={searchParams} />
    </main>
  );
}

async function DynamicCollection({ handle, segments, searchParams }: { handle: string; segments: string[]; searchParams: Record<string, string | string[] | undefined> }) {
  const collection = await getCollectionByHandle(handle);
  if (isShopifyConfigured && !collection) notFound();
  const title = collection?.title ?? labelFromHandle(handle);
  const image = collection?.image?.url ?? placeholderImages.craftsmanship;
  const collectionQuery = collection?.id.split("/").at(-1) ? `collection_id:${collection.id.split("/").at(-1)}` : undefined;
  const jsonLd = collection ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${siteUrl}/collections/${handle}`,
    breadcrumb: breadcrumbSchema(segments),
  } : null;

  return (
    <main>
      <Breadcrumbs segments={segments} />
      {jsonLd && <JsonLd data={jsonLd} />}
      <section className="site-frame grid gap-8 py-8 md:grid-cols-2 md:items-center md:py-12">
        <div>
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.17em] text-[var(--anokhi)]">Anokhi collection</p>
          <h1 className="font-editorial max-w-[13ch] text-[48px] leading-[0.98] text-[var(--ink)] sm:text-[64px]">{title}</h1>
          <p className="mt-5 max-w-[52ch] text-[13px] leading-6 text-[var(--muted)]">{collection?.description || "Collection details and available pieces will appear here when Shopify is connected."}</p>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7] sm:min-h-[420px]">
          <Image src={image} alt={collection?.image?.altText || title} fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
        </div>
      </section>
      <PageSections sections={[
        { kind: "editorial", title: "The story of this collection", body: collection?.description || "Discover a collection shaped by the Anokhi point of view and the moments that matter to you.", image: "craftsmanship", imageAlt: "Anokhi craftsmanship" },
        { kind: "filters", title: "Refine this collection", body: "Filter and sort the available pieces." },
        { kind: "products", title: "Pieces in this collection", query: collectionQuery },
        { kind: "editorial", title: "Chosen with care", body: "Explore the Anokhi point of view across rings and fine jewellery.", image: "heroRing", imageAlt: "Anokhi ring", links: [{ label: "Explore all rings", href: "/rings" }, { label: "Explore jewellery", href: "/jewellery" }] },
        { kind: "newsletter", title: "A note from Anokhi", body: "New pieces, thoughtful stories and a little inspiration, sent occasionally." },
      ]} routeKey="shop" searchParams={searchParams} />
    </main>
  );
}

async function DynamicProduct({ handle, segments }: { handle: string; segments: string[] }) {
  const product = await getProductByHandle(handle);
  if (isShopifyConfigured && !product) notFound();

  if (!product) {
    return (
      <main>
        <Breadcrumbs segments={segments} />
        <section className="site-frame grid min-h-[55vh] content-center py-12">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--anokhi)]">Product details</p>
          <h1 className="font-editorial max-w-[14ch] text-[52px] leading-[0.98] sm:text-[68px]">Connect Shopify to view this piece</h1>
          <p className="mt-5 max-w-[55ch] text-[13px] leading-6 text-[var(--muted)]">Product imagery, details, variants and pricing will load directly from the Anokhi Shopify catalogue. No sample product information is displayed.</p>
          <Link href="/rings" className="mt-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)]"><ArrowLeft size={15} weight="light" /> Explore rings</Link>
        </section>
      </main>
    );
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.nodes.map((image) => image.url),
    sku: product.variants.nodes[0]?.id,
    offers: product.variants.nodes.map((variant) => ({
      "@type": "Offer",
      price: variant.price.amount,
      priceCurrency: variant.price.currencyCode,
      availability: variant.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/${product.handle}`,
    })),
  };

  const imageList = product.images.nodes.length ? product.images.nodes : product.featuredImage ? [product.featuredImage] : [];
  const metafields = product.metafields.nodes;
  const relatedProducts = await getProducts({ first: 4, query: product.productType ? `product_type:${product.productType}` : undefined });

  return (
    <main>
      <Breadcrumbs segments={segments} />
      <JsonLd data={productSchema} />
      <section className="site-frame grid gap-8 py-4 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16">
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {imageList.map((image, index) => <div key={image.url} className={`${index === 0 ? "col-span-2 aspect-[1.2]" : "aspect-square"} relative overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7]`}><Image src={image.url} alt={image.altText || product.title} fill unoptimized sizes="(max-width: 767px) 100vw, 60vw" className="object-cover" /></div>)}
        </div>
        <div className="self-start py-4 md:sticky md:top-8 md:py-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--anokhi)]">{product.productType || "Anokhi fine jewellery"}</p>
          <h1 className="font-editorial mt-3 text-[42px] leading-[1] sm:text-[54px]">{product.title}</h1>
          <p className="mt-4 text-[14px]">{formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}</p>
          <p className="mt-5 text-[12px] leading-6 text-[var(--muted)]">{product.description}</p>
          <ProductPurchasePanel product={product} />
          <Link href="/cart" className="mt-3 flex min-h-11 items-center justify-center border border-[var(--line)] px-5 text-[10px] font-medium uppercase tracking-[0.11em]">View bag</Link>
          <div className="mt-7 grid gap-3 border-y border-[var(--line)] py-4 text-[11px] text-[var(--muted)] sm:grid-cols-2">
            <span className="flex items-center gap-2"><Truck size={16} weight="light" /> Delivery details to be confirmed</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} weight="light" /> Secure Shopify checkout</span>
          </div>
          <ProductAccordions product={product} metafields={metafields} />
        </div>
      </section>
      <PageSections sections={[{ kind: "editorial", title: "The story behind the piece", body: product.description, image: "craftsmanship", imageAlt: "Anokhi craft" }, { kind: "products", title: "Related pieces", query: product.productType ? `product_type:${product.productType}` : undefined }, { kind: "newsletter", title: "A note from Anokhi", body: "New pieces, thoughtful stories and a little inspiration, sent occasionally." }]} routeKey="products" />
      <section className="sr-only"><ProductGrid products={relatedProducts} /></section>
    </main>
  );
}

function ProductAccordions({ product, metafields }: { product: ShopifyProduct; metafields: ShopifyProduct["metafields"]["nodes"] }) {
  const knownDetails = metafields.filter((field) => field.value.trim());
  return <div className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
    <details className="py-4"><summary className="cursor-pointer list-none text-[11px] font-medium">Specifications</summary><div className="mt-3 grid gap-2">{knownDetails.length ? knownDetails.map((field) => <p key={`${field.namespace}.${field.key}`} className="flex justify-between gap-4 text-[11px] text-[var(--muted)]"><span className="capitalize">{field.key.replaceAll("_", " ")}</span><span>{field.value}</span></p>) : <p className="text-[11px] text-[var(--muted)]">Verified material and stone details will be displayed when supplied in Shopify.</p>}</div></details>
    <details className="py-4"><summary className="cursor-pointer list-none text-[11px] font-medium">Shipping and returns</summary><p className="mt-3 text-[11px] leading-5 text-[var(--muted)]">Policy information is awaiting Anokhi client approval. <Link href="/shipping-returns" className="text-[var(--anokhi)]">Read the current policy notice.</Link></p></details>
    <details className="py-4"><summary className="cursor-pointer list-none text-[11px] font-medium">Care</summary><p className="mt-3 text-[11px] leading-5 text-[var(--muted)]">Care guidance depends on verified product materials. <Link href="/care-guide" className="text-[var(--anokhi)]">View the care guide.</Link></p></details>
    <details className="py-4"><summary className="cursor-pointer list-none text-[11px] font-medium">Reviews</summary><p className="mt-3 text-[11px] text-[var(--muted)]">Reviews will appear when a verified review provider is connected.</p></details>
    <div className="sr-only"><Check aria-hidden="true" />{product.title}</div>
  </div>;
}

async function SearchRoute({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = firstValue(searchParams.q) ?? "";
  const category = firstValue(searchParams.category) ?? "";
  const sort = firstValue(searchParams.sort) ?? "relevance";
  const categoryQuery = category === "rings" ? "product_type:ring" : category === "jewellery" ? "product_type:jewellery" : "";
  const searchTerm = [query ? `title:${quoteSearchValue(query)}` : "", categoryQuery].filter(Boolean).join(" ");
  const sortKey = sort === "price-low" || sort === "price-high" ? "PRICE" : sort === "newest" ? "CREATED_AT" : "RELEVANCE";
  const products = await searchProducts(searchTerm, { sortKey, reverse: sort === "price-high" || sort === "newest" });
  return (
    <main>
      <Breadcrumbs segments={["search"]} />
      <section className="site-frame py-10 sm:py-16">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--anokhi)]">Find your piece</p>
        <h1 className="font-editorial text-[48px] sm:text-[64px]">Search Anokhi</h1>
        <p className="mt-3 text-[12px] text-[var(--muted)]">{query ? `${products.length} results for “${query}”` : "Search rings and jewellery"}</p>
        <form action="/search" className="mt-7 grid max-w-3xl gap-4 border-b border-[var(--line)] pb-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-2 text-[10px] text-[var(--muted)] sm:col-span-2">Search<input id="search-route" name="q" type="search" defaultValue={query} placeholder="Try a ring style, stone or material" className="min-h-12 border border-[var(--line)] bg-white px-3 text-[13px] text-[var(--ink)] outline-none" /></label>
          <label className="grid gap-2 text-[10px] text-[var(--muted)]">Category<select name="category" defaultValue={category} className="min-h-12 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]"><option value="">All</option><option value="rings">Rings</option><option value="jewellery">Jewellery</option></select></label>
          <label className="grid gap-2 text-[10px] text-[var(--muted)]">Sort by<select name="sort" defaultValue={sort} className="min-h-12 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]"><option value="relevance">Relevance</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          <button className="min-h-11 self-end bg-[var(--anokhi)] px-4 text-[10px] font-medium uppercase tracking-[0.1em] text-white">Search</button>
        </form>
      </section>
      <section className="bg-white py-12"><div className="site-frame"><h2 className="font-editorial mb-8 text-[36px]">{query ? "Search results" : "Explore the collection"}</h2>{products.length ? <ProductGrid products={products} /> : <div className="border-y border-[var(--line)] py-10"><p className="font-editorial text-[27px]">{query ? "Nothing quite matched your search. Try another style or explore our collections." : "The catalogue is being prepared."}</p><Link href="/collections" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)]">Explore collections <ArrowRight size={14} weight="light" /></Link></div>}</div></section>
    </main>
  );
}

function breadcrumbSchema(segments: string[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", position: 1, item: siteUrl }, ...segments.map((segment, index) => ({ name: labelFromHandle(segment), position: index + 2, item: `${siteUrl}/${segments.slice(0, index + 1).join("/")}` }))].map((item) => ({ "@type": "ListItem", ...item })),
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replaceAll("<", "\\u003c") }} />;
}

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en", { style: "currency", currency: currencyCode }).format(Number(amount));
}

function faqSchema(page: (typeof PAGE_CONTENT)[string]) {
  const questions = page.sections.flatMap((section) => section.questions ?? []);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function quoteSearchValue(value: string) {
  return `"${value.replace(/["\\]/g, "\\$&")}"`;
}