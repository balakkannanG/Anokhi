import { isShopifyConfigured, storefrontFetch } from "@/lib/shopify/client";
import { SEARCH_PRODUCTS } from "@/lib/shopify/queries";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface SearchOptions {
  first?: number;
  sortKey?: "BEST_SELLING" | "CREATED_AT" | "PRICE" | "RELEVANCE" | "TITLE";
  reverse?: boolean;
}

export async function searchProducts(searchTerm: string, options: SearchOptions = {}): Promise<ShopifyProduct[]> {
  if (!isShopifyConfigured || !searchTerm.trim()) return [];
  const data = await storefrontFetch<{ products: { nodes: ShopifyProduct[] } }>(SEARCH_PRODUCTS, {
    first: options.first ?? 24,
    query: searchTerm.trim(),
    sortKey: options.sortKey ?? "RELEVANCE",
    reverse: options.reverse ?? false,
  });
  return data.products.nodes;
}