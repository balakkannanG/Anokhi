"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpRight } from "@/components/ui/icons";
import { Price } from "@/components/product/price";
import type { ProductSummary } from "@/lib/shopify/types";

export function QuickView({ product }: { product: ProductSummary }) {
  const image = product.featuredImage;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute inset-x-2 bottom-2 min-h-10 translate-y-1 bg-ivory/95 px-3 text-[9px] font-medium tracking-[0.12em] text-charcoal opacity-100 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100" type="button">QUICK VIEW</button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border border-taupe/35 bg-parchment p-4 sm:p-6">
        <DialogTitle className="sr-only">Quick view: {product.title}</DialogTitle>
        <DialogDescription className="sr-only">Product summary. Use the product page to select a variant and add the item to your bag.</DialogDescription>
        <div className="grid gap-5 sm:grid-cols-2 sm:items-center">
          <div className="photo-well relative aspect-square overflow-hidden rounded-[12px]">
            {image ? <Image alt={image.altText || product.title} className="object-cover" fill sizes="(max-width: 639px) 90vw, 42vw" src={image.url} /> : null}
          </div>
          <div className="py-2 sm:py-5">
            <p className="eyebrow">{product.productType || "Anokhi collection"}</p>
            <h2 className="display-face mt-2 text-2xl text-charcoal">{product.title}</h2>
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-coffee">{product.description}</p>
            <Price className="mt-4 block text-sm font-medium text-charcoal" money={product.priceRange.minVariantPrice} />
            <Link className="mt-6 inline-flex min-h-11 items-center gap-3 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.12em] text-ivory" href={`/products/${product.handle}`}>
              VIEW PRODUCT <ArrowUpRight aria-hidden="true" className="size-4" weight="light" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
