import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { ProductGrid } from "@/components/collection/product-grid";
import { CategoryCard } from "@/components/collection/category-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { ringCategories } from "@/lib/constants/navigation";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";
import type { CategoryCardData } from "@/components/collection/category-card";

export const metadata: Metadata = { title: "Rings" };

const categoryImages = [
  placeholderImages.engagementRing,
  placeholderImages.solitaireRing,
  placeholderImages.diamond,
  placeholderImages.weddingRing,
  placeholderImages.coupleRings,
  placeholderImages.solitaireRing,
  placeholderImages.bridalSet,
  placeholderImages.diamond,
  placeholderImages.engagementRing,
];

const categoryDescriptions = [
  "For the moment you choose.", "One stone, all its own.", "A little more light, every day.",
  "A circle to come back to.", "Two rings, one shared story.", "A line of light, without end.",
  "A considered bridal expression.", "A design made to be noticed.", "Begin with the ring you imagine.",
];

export default async function RingsPage() {
  const collectionHandle = process.env.SHOPIFY_RINGS_COLLECTION_HANDLE;
  const result = collectionHandle
    ? await getCollectionByHandle(collectionHandle, { first: 24 })
    : await getProducts({ first: 24, query: "product_type:Ring", sortKey: "BEST_SELLING" });

  const categoryCards: CategoryCardData[] = ringCategories.slice(1).map((category, index) => ({
    label: category.label,
    description: categoryDescriptions[index],
    href: `/collections/${category.handle}`,
    image: categoryImages[index],
  }));

  return (
    <main id="main-content">
      <div className="page-shell pt-6 sm:pt-8"><Breadcrumbs items={[{ label: "Rings" }]} /></div>
      <header className="page-shell grid gap-7 py-10 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12">
        <div>
          <h1 className="display-face max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[1.07] text-charcoal">A ring for the moment that matters.</h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-coffee">Discover engagement, diamond, wedding and custom rings from Anokhi.</p>
        </div>
        <div className="photo-well relative aspect-[1.2] rounded-[14px] bg-cream"><Image alt={placeholderImages.solitaireRing.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 56vw" src={placeholderImages.solitaireRing.src} /></div>
      </header>
      <section className="px-4 py-14 sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading title="Explore ring styles" />
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-5">
            {categoryCards.map((category) => <CategoryCard category={category} key={category.href} />)}
          </div>
        </div>
      </section>
      <section className="bg-charcoal px-4 py-14 text-ivory sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeading dark description="A considered edit of ring forms and details." href="#all-rings" linkLabel="VIEW ALL" title="The Anokhi signature" />
          <div className="mt-8">
            {result.state === "ready"
              ? <ProductGrid products={"nodes" in result.data.products ? result.data.products.nodes : result.data.products} />
              : <ShopifyState result={result} emptyAction={{ label: "SHOP ALL", href: "/shop" }} />}
          </div>
        </div>
      </section>
      <section className="page-shell py-16 md:py-24" id="all-rings">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div><h2 className="display-face text-[clamp(2rem,4vw,3.4rem)] text-charcoal">A little help choosing.</h2><p className="mt-3 text-sm leading-6 text-coffee">Start with the style, then look at the diamond details and fit.</p></div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[{ label: "Ring buying guide", href: "/ring-size-guide" }, { label: "Diamond education", href: "/diamond-education" }, { label: "Customise a ring", href: "/customise-your-ring" }].map((item) => (
              <a className="border-t border-taupe/45 py-4 text-sm text-charcoal hover:text-anokhi-plum" href={item.href} key={item.href}>{item.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
