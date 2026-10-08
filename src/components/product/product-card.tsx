import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { Price } from "@/components/product/price";
import { QuickView } from "@/components/product/quick-view";
import { WishlistButton } from "@/components/product/wishlist-button";
import type { ProductSummary } from "@/lib/shopify/types";

export function ProductCard({ product }: { product: ProductSummary }) {
  const image = product.featuredImage;

  return (
    <article className="group min-w-0">
      <div className="photo-well relative aspect-[0.88] rounded-[14px] bg-ivory">
        {image ? (
          <Link aria-label={`View ${product.title}`} className="absolute inset-0 overflow-hidden rounded-[inherit]" href={`/products/${product.handle}`}>
            <Image
              alt={image.altText || product.title}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
              src={image.url}
            />
          </Link>
        ) : (
          <div aria-hidden="true" className="absolute inset-0 grid place-items-center text-sm text-coffee">
            Image coming soon
          </div>
        )}
        <div className="absolute right-2.5 top-2.5 z-10"><WishlistButton product={product} /></div>
        <QuickView product={product} />
        {!product.availableForSale ? (
          <span className="absolute bottom-3 left-3 bg-parchment/95 px-3 py-2 text-[9px] tracking-[0.12em] text-charcoal">
            UNAVAILABLE
          </span>
        ) : null}
      </div>
      <div className="pt-3">
        <Link className="display-face block truncate text-[16px] text-charcoal hover:text-anokhi-plum sm:text-[18px]" href={`/products/${product.handle}`}>
          {product.title}
        </Link>
        <p className="mt-1 min-h-5 truncate text-[10px] text-coffee sm:text-xs">
          {product.productType || product.tags.slice(0, 2).join(" · ")}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs font-medium text-charcoal">
          <Price money={product.priceRange.minVariantPrice} />
          <Link aria-label={`Explore ${product.title}`} className="grid size-8 shrink-0 place-items-center text-coffee hover:text-anokhi-plum" href={`/products/${product.handle}`}>
            <ArrowUpRight aria-hidden="true" className="size-[17px]" weight="light" />
          </Link>
        </div>
      </div>
    </article>
  );
}
