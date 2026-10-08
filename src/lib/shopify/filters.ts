import type { ShopifyProductFilter } from "@/lib/shopify/types";

export function parseStorefrontProductFilter(input: string): ShopifyProductFilter | null {
  try {
    const parsed: unknown = JSON.parse(input);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as ShopifyProductFilter;
    }
    return null;
  } catch {
    return null;
  }
}
