import Link from "next/link";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import { ProductCard } from "@/components/product/product-card";
import { ShopifyState } from "@/components/common/shopify-state";
import { SectionHeading } from "@/components/ui/section-heading";

export async function ProductCollection({
  title,
  description,
  handle,
  href,
  linkLabel,
  dark = false,
}: {
  title: string;
  description: string;
  handle?: string;
  href: string;
  linkLabel: string;
  dark?: boolean;
}) {
  const result = handle
    ? await getCollectionByHandle(handle, { first: 4 })
    : {
        state: "not-configured" as const,
        data: null,
        message: "Choose the matching Shopify collection in the environment settings to show live products here.",
      };

  return (
    <section className={`px-4 py-16 sm:px-7 md:py-24 lg:px-10 ${dark ? "bg-charcoal" : "bg-parchment"}`}>
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading dark={dark} description={description} href={href} linkLabel={linkLabel} title={title} />
        {result.state === "ready" ? (
          result.data.products.nodes.length ? (
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
              {result.data.products.nodes.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ShopifyState result={{ state: "empty", data: null, message: "This collection is ready for live products once items are published to Shopify." }} emptyAction={{ label: linkLabel, href }} />
          )
        ) : (
          <div className="mt-8">
            <ShopifyState result={result} emptyAction={{ label: linkLabel, href }} />
          </div>
        )}
        {result.state === "ready" && result.data.products.nodes.length > 0 ? (
          <div className="mt-8 flex justify-end">
            <Link className={`quiet-link text-[10px] tracking-[0.14em] ${dark ? "text-ivory" : "text-charcoal"}`} href={href}>
              {linkLabel} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
