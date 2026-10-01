import { isShopifyConfigured, storefrontFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE, GET_PRODUCTS } from "@/lib/shopify/queries";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ProductOptions {
  first?: number;
  query?: string;
  sortKey?: "BEST_SELLING" | "CREATED_AT" | "PRICE" | "RELEVANCE" | "TITLE";
  reverse?: boolean;
}

export async function getProducts(options: ProductOptions = {}): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured) return [];
  const data = await storefrontFetch<{ products: { nodes: ShopifyProduct[] } }>(GET_PRODUCTS, {
    first: options.first ?? 12,
    query: options.query ?? null,
    sortKey: options.sortKey ?? "BEST_SELLING",
    reverse: options.reverse ?? false,
  });
  return data.products.nodes;
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!isShopifyConfigured) return null;
  const data = await storefrontFetch<{ product: ShopifyProduct | null }>(GET_PRODUCT_BY_HANDLE, { handle });
  return data.product;
}

