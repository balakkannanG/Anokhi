import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { CategoryCard } from "@/components/collection/category-card";
import { ProductGrid } from "@/components/collection/product-grid";
import { ProductCollection } from "@/components/home/product-collection";
import { SectionHeading } from "@/components/ui/section-heading";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { jewelleryCategories } from "@/lib/constants/navigation";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import type { CategoryCardData } from "@/components/collection/category-card";

export const metadata: Metadata = { title: "The Jewellery Collection" };

const jewelleryImages = [placeholderImages.earrings, placeholderImages.necklace, placeholderImages.pendant, placeholderImages.bracelet, placeholderImages.bangle, placeholderImages.jewellerySet];
const descriptions = ["A finish that frames the face.", "A delicate line close to the heart.", "A small detail, chosen for you.", "An easy elegance at the wrist.", "A little rhythm in every gesture.", "Pieces brought together in harmony."];

export default async function JewelleryPage() {
  const handle = process.env.SHOPIFY_FEATURED_JEWELLERY_HANDLE;
  const result = handle ? await getCollectionByHandle(handle, { first: 12 }) : {
    state: "not-configured" as const,
    data: null,
    message: "Choose a published jewellery collection in Shopify and set its handle in the environment settings to load live pieces.",
  };
  const categories: CategoryCardData[] = jewelleryCategories.slice(1).map((category, index) => ({
    label: category.label,
    description: descriptions[index],
    href: `/collections/${category.handle}`,
    image: jewelleryImages[index],
  }));

  return (
    <main id="main-content">
      <div className="page-shell pt-6 sm:pt-8"><Breadcrumbs items={[{ label: "Jewellery" }]} /></div>
      <header className="page-shell grid gap-7 py-10 sm:py-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
        <div>
          <h1 className="display-face max-w-[11ch] text-[clamp(2.8rem,5.2vw,5rem)] leading-[1.08] text-charcoal">The jewellery collection.</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">Pieces designed to be worn, loved and remembered.</p>
          <a className="mt-6 inline-flex min-h-12 items-center gap-4 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.14em] text-ivory" href="#jewellery-types">SHOP JEWELLERY <span aria-hidden="true">↗</span></a>
        </div>
        <div className="photo-well relative aspect-[1.08] overflow-hidden rounded-[14px] bg-cream"><Image alt={placeholderImages.model.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 54vw" src={placeholderImages.model.src} /></div>
      </header>
      <section className="px-4 py-14 sm:px-7 md:py-20 lg:px-10" id="jewellery-types">
        <div className="mx-auto max-w-[1320px]"><SectionHeading title="Explore jewellery by type" />
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => <CategoryCard category={category} key={category.href} />)}
          </div>
        </div>
      </section>
      <section className="bg-charcoal px-4 py-14 text-ivory sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto max-w-[1320px]"><SectionHeading dark description="Live pieces are loaded directly from the connected Shopify collection." href="/collections" linkLabel="BROWSE COLLECTIONS" title="A considered collection" />
          <div className="mt-8">{result.state === "ready" ? result.data.products.nodes.length ? <ProductGrid products={result.data.products.nodes} /> : <ShopifyState result={{ state: "empty", data: null, message: "There are no published products in this collection yet." }} /> : <ShopifyState result={result} emptyAction={{ label: "VIEW COLLECTIONS", href: "/collections" }} />}</div>
        </div>
      </section>
      <ProductCollection description="A fresh study in shape, light and detail." handle={process.env.SHOPIFY_NEW_ARRIVALS_HANDLE} href="/shop?sort=newest" linkLabel="VIEW NEW ARRIVALS" title="New jewellery" />
      <ProductCollection description="A selection from the current Shopify catalogue." handle={process.env.SHOPIFY_BEST_SELLERS_HANDLE} href="/shop?sort=best-selling" linkLabel="VIEW BEST SELLERS" title="Best sellers" />
      <section className="px-4 py-14 sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1120px] gap-7 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="photo-well relative aspect-[1.4] overflow-hidden rounded-[14px]"><Image alt={placeholderImages.bridalSet.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 58vw" src={placeholderImages.bridalSet.src} /></div>
          <div><h2 className="display-face text-[clamp(2rem,4vw,3.6rem)] text-charcoal">Beyond the ring, with Anokhi.</h2><p className="mt-4 text-sm leading-6 text-coffee">Discover earrings, necklaces and the small details that complete a jewellery collection.</p></div>
        </div>
      </section>
    </main>
  );
}
