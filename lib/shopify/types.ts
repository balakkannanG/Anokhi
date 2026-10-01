export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: { nodes: ShopifyImage[] };
  priceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney; maxVariantPrice: ShopifyMoney };
  variants: { nodes: ShopifyVariant[] };
  metafields: { nodes: Array<{ namespace: string; key: string; value: string; type: string }> };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { nodes: ShopifyProduct[] };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyVariant & { product: Pick<ShopifyProduct, "handle" | "title" | "featuredImage"> };
  cost: { totalAmount: ShopifyMoney };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney; totalAmount: ShopifyMoney };
  lines: { nodes: ShopifyCartLine[] };
}

export interface ShopifyConnection<T> {
  nodes: T[];
  pageInfo?: { hasNextPage: boolean; endCursor: string | null };
}