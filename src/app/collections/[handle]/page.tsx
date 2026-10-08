import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { ProductGrid } from "@/components/collection/product-grid";
import { ShopifyFilters } from "@/components/collection/shopify-filters";
import { SectionHeading } from "@/components/ui/section-heading";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { jewelleryCategories, ringCategories } from "@/lib/constants/navigation";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import type { StorefrontProductFilter } from "@/lib/shopify/types";

const taxonomyTitles = new Map<string, string>([
  ...ringCategories.map((item): [string, string] => [item.handle, item.label]),
  ...jewelleryCategories.map((item): [string, string] => [item.handle, item.label]),
]);

type SearchParams = { filter?: string | string[]; sort?: string; after?: string };

function parseFilterInputs(value: string | string[] | undefined): StorefrontProductFilter[] {
  const entries = Array.isArray(value) ? value : value ? [value] : [];
  return entries.slice(0, 12).flatMap((entry) => {
    if (entry.length > 2048) return [];
    try {
      const parsed: unknown = JSON.parse(entry);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? [parsed as StorefrontProductFilter] : [];
    } catch {
      return [];
    }
  });
}

async function loadCollection(handle: string) {
  return getCollectionByHandle(handle, { first: 24 });
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const result = await loadCollection(handle);
  if (result.state === "empty") notFound();
  if (result.state === "ready") {
    return {
      title: result.data.title,
      description: result.data.description.slice(0, 155),
      alternates: { canonical: `/collections/${result.data.handle}` },
      openGraph: {
        type: "website",
        title: result.data.title,
        description: result.data.description.slice(0, 155),
        ...(result.data.image ? { images: [{ url: result.data.image.url }] } : {}),
      },
    };
  }
  return { title: taxonomyTitles.get(handle) ?? "Collection" };
}

export default async function DynamicCollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ handle }, search] = await Promise.all([params, searchParams]);
  const filters = parseFilterInputs(search.filter);
  const result = await getCollectionByHandle(handle, {
    first: 24,
    after: search.after && search.after.length <= 512 ? search.after : null,
    sort: search.sort,
    filters,
  });
  if (result.state === "empty") notFound();

  const title = result.state === "ready" ? result.data.title : taxonomyTitles.get(handle) ?? handle.replaceAll("-", " ");
  const description = result.state === "ready" ? result.data.description : "Explore the Anokhi collection.";
  const image = result.state === "ready" ? result.data.image?.url : placeholderImages.solitaireRing.src;
  const page = result.state === "ready" ? result.data.products.pageInfo : null;
  const nextParams = new URLSearchParams();
  if (search.sort) nextParams.set("sort", search.sort);
  for (const filter of Array.isArray(search.filter) ? search.filter : search.filter ? [search.filter] : []) nextParams.append("filter", filter);
  const nextHref = page?.hasNextPage && page.endCursor
    ? `/collections/${handle}?${new URLSearchParams([...nextParams, ["after", page.endCursor]])}`
    : null;

  return (
    <main id="main-content">
      <div className="page-shell pt-6 sm:pt-8"><Breadcrumbs items={[{ label: "Collections", href: "/collections" }, { label: title }]} /></div>
      <header className="page-shell grid gap-7 py-10 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12">
        <div>
          <h1 className="display-face max-w-[12ch] text-[clamp(2.7rem,5vw,4.8rem)] capitalize leading-[1.08] text-charcoal">{title}</h1>
          {description ? <p className="mt-4 max-w-lg text-sm leading-6 text-coffee">{description}</p> : null}
        </div>
        <div className="photo-well relative aspect-[1.35] overflow-hidden rounded-[14px] bg-cream">
          {image ? <Image alt={result.state === "ready" ? result.data.image?.altText || title : placeholderImages.solitaireRing.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 56vw" src={image} /> : null}
        </div>
      </header>
      <section className="page-shell pb-16 md:pb-24">
        <div className="mb-8"><SectionHeading title={title} description={description} /></div>
        {result.state === "ready" ? (
          <>
            <ShopifyFilters action={`/collections/${handle}`} groups={result.data.products.filters} selected={Array.isArray(search.filter) ? search.filter : search.filter ? [search.filter] : []} sort={search.sort} clearHref={`/collections/${handle}`} />
            <div className="mt-8">
              {result.data.products.nodes.length ? <ProductGrid products={result.data.products.nodes} /> : <ShopifyState result={{ state: "empty", data: null, message: "No products match the current filters." }} emptyAction={{ label: "CLEAR FILTERS", href: `/collections/${handle}` }} />}
            </div>
            {nextHref ? <div className="mt-10 text-center"><Link className="inline-flex min-h-11 items-center border border-taupe/60 px-6 text-[10px] tracking-[0.14em]" href={nextHref}>LOAD MORE</Link></div> : null}
          </>
        ) : <ShopifyState result={result} emptyAction={{ label: "BROWSE COLLECTIONS", href: "/collections" }} />}
      </section>
      <section className="bg-cream px-4 py-12 sm:px-7 md:py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1120px] items-center gap-7 md:grid-cols-[1.05fr_0.95fr]">
          <div><h2 className="display-face max-w-[13ch] text-3xl leading-tight text-charcoal">Find the style that feels like yours.</h2><p className="mt-3 max-w-md text-sm leading-6 text-coffee">Browse fine jewellery collections from the Anokhi catalogue.</p><Link className="quiet-link mt-4 inline-block pb-1 text-[10px] tracking-[0.14em]" href="/jewellery">EXPLORE JEWELLERY <span aria-hidden="true">↗</span></Link></div>
          <div className="photo-well relative aspect-[1.5] overflow-hidden rounded-[12px]"><Image alt={placeholderImages.model.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 48vw" src={placeholderImages.model.src} /></div>
        </div>
      </section>
    </main>
  );
}
