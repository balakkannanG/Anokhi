"use client";

import { useEffect, useState } from "react";
import { Heart } from "@/components/ui/icons";
import type { ProductSummary } from "@/lib/shopify/types";

const storageKey = "anokhi-wishlist-v1";

function readWishlist(): string[] {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function WishlistButton({ product }: { product: Pick<ProductSummary, "handle" | "title"> }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(readWishlist().includes(product.handle)), [product.handle]);

  function toggle() {
    const existing = readWishlist();
    const next = existing.includes(product.handle)
      ? existing.filter((handle) => handle !== product.handle)
      : [...existing, product.handle];
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      setSaved(next.includes(product.handle));
      window.dispatchEvent(new CustomEvent("anokhi:wishlist-change"));
    } catch {
      setSaved(false);
    }
  }

  return (
    <button
      aria-label={saved ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
      aria-pressed={saved}
      className="grid size-10 place-items-center rounded-full bg-ivory/95 text-charcoal transition-transform duration-200 hover:scale-105 active:scale-95"
      onClick={toggle}
      type="button"
    >
      <Heart aria-hidden="true" className="size-[18px]" weight={saved ? "fill" : "light"} />
    </button>
  );
}
