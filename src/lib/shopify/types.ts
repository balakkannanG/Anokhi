export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductMediaSource {
  url: string;
  mimeType: string;
  format: string;
}

export interface ProductMedia {
  id: string;
  mediaContentType: "IMAGE" | "VIDEO" | "EXTERNAL_VIDEO";
  image: ShopifyImage | null;
  previewImage: ShopifyImage | null;
  sources: ProductMediaSource[];
  embedUrl: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: ShopifyImage | null;
}

export interface ProductSummary {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
}

export interface Product extends ProductSummary {
  images: ShopifyImage[];
  media: ProductMedia[];
  compareAtPriceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  variants: ProductVariant[];
  options: Array<{ id: string; name: string; values: string[] }>;
  onlineStoreUrl: string | null;
}

export interface ProductConnection {
  nodes: ProductSummary[];
  pageInfo: PageInfo;
  filters: ProductFilterGroup[];
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: ProductConnection;
}

export interface ProductFilterGroup {
  id: string;
  label: string;
  type: string;
  values: ProductFilterValue[];
}

export interface ProductFilterValue {
  id: string;
  label: string;
  count: number;
  input: string;
}

export type StorefrontProductFilter = string;

export type ShopifyProductFilter = Record<string, unknown>;

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: ProductVariant & {
    product: Pick<Product, "id" | "handle" | "title" | "featuredImage">;
  };
  attributes: Array<{ key: string; value: string }>;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: CartLine[];
}

export type ShopifyFailureReason = "not-configured" | "empty" | "error";

export type ShopifyResult<T> =
  | { state: "ready"; data: T }
  | { state: ShopifyFailureReason; data: null; message: string };

export type ProductSortKey =
  | "RELEVANCE"
  | "BEST_SELLING"
  | "CREATED_AT"
  | "PRICE"
  | "TITLE";

export type CollectionSortKey =
  | "COLLECTION_DEFAULT"
  | "BEST_SELLING"
  | "CREATED"
  | "PRICE"
  | "TITLE"
  | "RELEVANCE";

export interface ProductPageOptions {
  first?: number;
  after?: string | null;
  query?: string | null;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  filters?: string[];
}

export interface ShopifyUserError {
  field: string[] | null;
  message: string;
  code: string | null;
}
