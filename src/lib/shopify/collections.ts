import { storefrontFetch, unavailable } from "@/lib/shopify/client";
import { parseStorefrontProductFilter } from "@/lib/shopify/filters";
import { GET_COLLECTION_BY_HANDLE, GET_COLLECTIONS } from "@/lib/shopify/queries";
import type {
  Collection,
  CollectionSortKey,
  ShopifyProductFilter,
  ProductFilterGroup,
  ProductSummary,
  ShopifyResult,
} from "@/lib/shopify/types";

interface StorefrontCollection extends Omit<Collection, "products"> {
  products: {
    nodes: ProductSummary[];
    pageInfo: Collection["products"]["pageInfo"];
    filters: ProductFilterGroup[];
  };
}

const validCollectionSortKeys: Record<string, CollectionSortKey> = {
  "collection-default": "COLLECTION_DEFAULT",
  "best-selling": "BEST_SELLING",
  created: "CREATED",
  "price-low": "PRICE",
  "price-high": "PRICE",
  title: "TITLE",
};

export async function getCollections(): Promise<ShopifyResult<Collection[]>> {
  const result = await storefrontFetch<{
    collections: { nodes: Array<Omit<Collection, "products">> };
  }, Record<string, unknown>>(
    GET_COLLECTIONS,
    { first: 250, after: null },
    { revalidate: 300, tags: ["shopify-collections"] },
  );

  if (result.state !== "ready") return result;
  if (!result.data.collections.nodes.length) {
    return unavailable("empty", "No published collections are available yet.");
  }

  return {
    state: "ready",
    data: result.data.collections.nodes.map((collection) => ({
      ...collection,
      products: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
          endCursor: null,
        },
        filters: [],
      },
    })),
  };
}

export async function getCollectionByHandle(
  handle: string,
  options: { first?: number; after?: string | null; sort?: string; reverse?: boolean; filters?: string[] } = {},
): Promise<ShopifyResult<Collection>> {
  const cleanHandle = handle.trim().slice(0, 180);
  if (!/^[a-z0-9-]+$/i.test(cleanHandle)) {
    return unavailable("empty", "That collection could not be found.");
  }

  const request = {
    handle: cleanHandle,
    first: Math.max(1, Math.min(48, Math.trunc(options.first ?? 12))),
    after: options.after ?? null,
    sortKey: validCollectionSortKeys[options.sort ?? "collection-default"] ?? "COLLECTION_DEFAULT",
    reverse: options.reverse ?? options.sort === "price-high",
  };
  const fetchCollection = (filters: ShopifyProductFilter[]) =>
    storefrontFetch<{ collection: StorefrontCollection | null }, Record<string, unknown>>(
      GET_COLLECTION_BY_HANDLE,
      { ...request, filters },
      { revalidate: 180, tags: [`collection-${cleanHandle}`] },
    );

  const initial = await fetchCollection([]);
  if (initial.state !== "ready") return initial;
  if (!initial.data.collection) return unavailable("empty", "That collection could not be found.");

  const requestedInputs = [...new Set(options.filters ?? [])].slice(0, 12);
  const allowedInputs = new Set(
    initial.data.collection.products.filters.flatMap((group) => group.values.map((value) => value.input)),
  );
  const accepted = requestedInputs.filter((input) =>
    typeof input === "string" && input.length <= 2048 && allowedInputs.has(input),
  ).flatMap((input) => {
    const parsed = parseStorefrontProductFilter(input);
    return parsed ? [parsed] : [];
  });

  let collection = initial.data.collection;
  if (accepted.length) {
    const filtered = await fetchCollection(accepted);
    if (filtered.state !== "ready") return unavailable(filtered.state, filtered.message);
    if (!filtered.data.collection) return unavailable("empty", "That collection could not be found.");
    collection = filtered.data.collection;
  }

  return { state: "ready", data: collection };
}
