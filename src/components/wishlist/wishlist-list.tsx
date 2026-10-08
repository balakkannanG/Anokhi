"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Price } from "@/components/product/price";
import { Heart } from "@/components/ui/icons";
import type { Product } from "@/lib/shopify/types";

const storageKey = "anokhi-wishlist-v1";

function readWishlist(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function WishlistList({ products }: { products: Product[] }) {
  const [handles, setHandles] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setHandles(readWishlist());
    sync();
    window.addEventListener("anokhi:wishlist-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("anokhi:wishlist-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const savedProducts = handles.flatMap((handle) => {
    const product = products.find((item) => item.handle === handle);
    return product ? [product] : [];
  });

  if (!savedProducts.length) {
    return (
      <div className="border-y border-taupe/40 py-12 text-center">
        <Heart aria-hidden="true" className="mx-auto size-6 text-taupe" weight="light" />
        <h2 className="display-face mt-3 text-2xl text-charcoal">Your saved pieces will appear here.</h2>
        <p className="mt-2 text-sm text-coffee">Save a product to this browser to keep it close.</p>
        <Link className="mt-5 inline-flex min-h-11 items-center bg-anokhi-plum px-5 text-[10px] tracking-[0.14em] text-ivory" href="/jewellery">EXPLORE JEWELLERY</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {savedProducts.map((product) => {
        const image = product.featuredImage ?? product.images[0];
        return (
          <article key={product.id}>
            <Link className="photo-well relative block aspect-[0.9] overflow-hidden rounded-[12px]" href={`/products/${product.handle}`}>
              {image ? <Image alt={image.altText || product.title} className="object-cover" fill sizes="(max-width: 639px) 46vw, 25vw" src={image.url} /> : null}
            </Link>
            <Link className="display-face mt-3 block text-base text-charcoal" href={`/products/${product.handle}`}>{product.title}</Link>
            <Price className="mt-2 block text-xs text-charcoal" money={product.priceRange.minVariantPrice} />
          </article>
        );
      })}
    </div>
  );
}
