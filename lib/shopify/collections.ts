import { isShopifyConfigured, storefrontFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS, GET_COLLECTION_BY_HANDLE } from "@/lib/shopify/queries";
import type { ShopifyCollection } from "@/lib/shopify/types";

export async function getCollections(first = 24): Promise<ShopifyCollection[]> {
  if (!isShopifyConfigured) return [];
  const data = await storefrontFetch<{ collections: { nodes: ShopifyCollection[] } }>(GET_COLLECTIONS, { first });
  return data.collections.nodes;
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  if (!isShopifyConfigured) return null;
  const data = await storefrontFetch<{ collection: ShopifyCollection | null }>(GET_COLLECTION_BY_HANDLE, {
    handle,
    first: 24,
  });
  return data.collection;
}