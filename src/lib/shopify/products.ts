import { storefrontFetch, unavailable } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE, GET_PRODUCTS, SEARCH_PRODUCTS } from "@/lib/shopify/queries";
import type {
  Product,
  ProductMedia,
  ProductPageOptions,
  ProductSortKey,
  ProductSummary,
  ProductFilterGroup,
  ShopifyImage,
  ShopifyResult,
  StorefrontProductFilter,
} from "@/lib/shopify/types";

interface Connection<T> { nodes: T[] }
interface StorefrontProduct extends Omit<Product, "images" | "variants" | "media"> {
  images: Connection<ShopifyImage>;
  media: Connection<ProductMedia>;
  variants: Connection<Product["variants"][number]>;
}
interface ProductPageData {
  products: {
    nodes: ProductSummary[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
    filters?: ProductFilterGroup[];
  };
}

function normalizeSummary(product: ProductSummary): Product {
  return {
    ...product,
    images: product.featuredImage ? [product.featuredImage] : [],
    media: [],
    compareAtPriceRange: product.priceRange,
    variants: [],
    options: [],
    onlineStoreUrl: null,
  };
}

function normalizeProduct(product: StorefrontProduct): Product {
  return {
    ...product,
    images: product.images.nodes,
    media: product.media.nodes,
    variants: product.variants.nodes,
  };
}

function clampPageSize(value: number | undefined): number {
  if (!Number.isFinite(value)) return 12;
  return Math.min(48, Math.max(1, Math.trunc(value ?? 12)));
}

function sortKey(value: ProductSortKey | undefined): ProductSortKey {
  const allowed: ProductSortKey[] = ["RELEVANCE", "BEST_SELLING", "CREATED_AT", "PRICE", "TITLE"];
  return allowed.includes(value ?? "RELEVANCE") ? value ?? "RELEVANCE" : "RELEVANCE";
}

function escapeSearchTerm(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[{}()\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

type ProductList = {
  products: Product[];
  pageInfo: ProductPageData["products"]["pageInfo"];
  filters: ProductFilterGroup[];
};

export async function getProducts(
  options: ProductPageOptions = {},
): Promise<ShopifyResult<ProductList>> {
  const variables = {
    first: clampPageSize(options.first),
    after: options.after ?? null,
    query: options.query?.trim() || null,
    sortKey: sortKey(options.sortKey),
    reverse: options.reverse ?? false,
  };
  const fetchProducts = (filters: StorefrontProductFilter[]) =>
    storefrontFetch<ProductPageData, Record<string, unknown>>(
      GET_PRODUCTS,
      { ...variables, filters },
      { revalidate: 180, tags: ["shopify-products"] },
    );

  const initial = await fetchProducts([]);
  if (initial.state !== "ready") return initial;

  const requestedInputs = [...new Set(options.filters ?? [])].slice(0, 12);
  const allowedInputs = new Set(
    (initial.data.products.filters ?? []).flatMap((group) => group.values.map((value) => value.input)),
  );
  const accepted: StorefrontProductFilter[] = requestedInputs.flatMap((input) => {
    if (typeof input !== "string" || input.length > 2048 || !allowedInputs.has(input)) return [];
    try {
      const parsed: unknown = JSON.parse(input);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? [parsed as StorefrontProductFilter] : [];
    } catch {
      return [];
    }
  });

  let data = initial.data;
  if (accepted.length) {
    const filtered = await fetchProducts(accepted);
    if (filtered.state !== "ready") return unavailable(filtered.state, filtered.message);
    data = filtered.data;
  }

  if (!data.products.nodes.length) return unavailable("empty", "No products match these choices yet.");

  return {
    state: "ready",
    data: {
      products: data.products.nodes.map(normalizeSummary),
      pageInfo: data.products.pageInfo,
      filters: data.products.filters ?? initial.data.products.filters ?? [],
    },
  };
}

export async function getProductByHandle(handle: string): Promise<ShopifyResult<Product>> {
  const cleanHandle = handle.trim().slice(0, 180);
  if (!/^[a-z0-9-]+$/i.test(cleanHandle)) {
    return unavailable("empty", "That product could not be found.");
  }

  const result = await storefrontFetch<{ product: StorefrontProduct | null }, Record<string, unknown>>(
    GET_PRODUCT_BY_HANDLE,
    { handle: cleanHandle },
    { revalidate: 180, tags: [`product-${cleanHandle}`] },
  );
  if (result.state !== "ready") return result;
  if (!result.data.product) return unavailable("empty", "That product could not be found.");
  return { state: "ready", data: normalizeProduct(result.data.product) };
}

export async function searchProducts(
  term: string,
  options: Omit<ProductPageOptions, "query" | "filters"> = {},
): Promise<ShopifyResult<Omit<ProductList, "filters">>> {
  const query = escapeSearchTerm(term);
  if (query.length < 2) return unavailable("empty", "Enter at least two characters to search.");

  const result = await storefrontFetch<ProductPageData, Record<string, unknown>>(
    SEARCH_PRODUCTS,
    {
      first: clampPageSize(options.first),
      after: options.after ?? null,
      query,
      sortKey: sortKey(options.sortKey),
      reverse: options.reverse ?? false,
    },
    { revalidate: 30, tags: ["shopify-search"] },
  );
  if (result.state !== "ready") return result;
  if (!result.data.products.nodes.length) {
    return unavailable("empty", "Nothing quite matched your search. Try another style or explore our collections.");
  }

  return {
    state: "ready",
    data: {
      products: result.data.products.nodes.map(normalizeSummary),
      pageInfo: result.data.products.pageInfo,
    },
  };
}
