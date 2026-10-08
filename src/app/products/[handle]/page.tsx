import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { ProductDetails } from "@/components/product/product-details";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductCollection } from "@/components/home/product-collection";
import { getProductByHandle } from "@/lib/shopify/products";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const result = await getProductByHandle(handle);
  if (result.state !== "ready") return { title: "Product" };
  const product = result.data;
  const image = product.featuredImage?.url;
  return {
    title: product.title,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      type: "website",
      title: product.title,
      description: product.description.slice(0, 155),
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const result = await getProductByHandle(handle);
  if (result.state === "empty") notFound();
  if (result.state !== "ready") {
    return <main className="page-shell py-16" id="main-content"><ShopifyState result={result} emptyAction={{ label: "BROWSE RINGS", href: "/rings" }} /></main>;
  }
  const product = result.data;
  const galleryImages = product.images.length ? product.images : product.featuredImage ? [product.featuredImage] : [];
  const offer = product.variants.find((variant) => variant.availableForSale) ?? product.variants[0];
  const productUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(`/products/${product.handle}`, process.env.NEXT_PUBLIC_SITE_URL).toString()
    : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: galleryImages.map((image) => image.url),
    ...(offer ? {
      offers: {
        "@type": "Offer",
        price: offer.price.amount,
        priceCurrency: offer.price.currencyCode,
        availability: offer.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        ...(productUrl ? { url: productUrl } : {}),
      },
    } : {}),
  };

  return (
    <main className="page-shell pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Rings", href: "/rings" }, { label: product.title }]} />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <ProductGallery images={galleryImages} media={product.media} title={product.title} />
        <div>
          <p className="eyebrow">{product.productType || "Anokhi collection"}</p>
          <h1 className="display-face mt-2 text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.1] text-charcoal">{product.title}</h1>
          <ProductPurchasePanel product={product} />
          <div className="mt-6 space-y-3 text-[11px] leading-5 text-coffee">
            <p>Payment and delivery options are confirmed during Shopify checkout.</p>
            <p>Product information is supplied by the live Shopify listing.</p>
          </div>
          <ProductDetails product={product} />
        </div>
      </div>
      <section className="mt-14 border-t border-taupe/40 pt-8 sm:mt-20">
        <h2 className="display-face text-2xl text-charcoal">A closer look</h2>
        <p className="mt-3 max-w-[55ch] text-sm leading-6 text-coffee">{product.description || "Further story and specifications will be available when added to the Shopify product listing."}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {(galleryImages.slice(0, 2)).map((image) => (
            <div className="photo-well relative aspect-[1.25] overflow-hidden rounded-[12px]" key={image.id}><Image alt={image.altText || product.title} className="object-cover" fill sizes="(max-width: 639px) 100vw, 48vw" src={image.url} /></div>
          ))}
        </div>
      </section>
      <ProductCollection description="Explore further pieces from the collection." handle={process.env.SHOPIFY_RELATED_RINGS_HANDLE} href="/rings" linkLabel="VIEW RINGS" title="Related rings" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}
