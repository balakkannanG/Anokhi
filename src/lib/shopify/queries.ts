import type {} from "@/lib/shopify/types";

export const PRODUCT_CARD_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  availableForSale
  featuredImage { id url altText width height }
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
`;

export const PRODUCT_FIELDS = `
  ${PRODUCT_CARD_FIELDS}
  onlineStoreUrl
  images(first: 12) {
    nodes { id url altText width height }
  }
  media(first: 12) {
    nodes {
      id
      mediaContentType
      ... on MediaImage {
        image { id url altText width height }
      }
      ... on Video {
        alt
        previewImage { id url altText width height }
        sources { url mimeType format }
      }
      ... on ExternalVideo {
        alt
        embedUrl: embeddedUrl
      }
    }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  options { id name values }
  variants(first: 50) {
    nodes {
      id
      title
      availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
      image { id url altText width height }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts(
    $first: Int!
    $after: String
    $query: String
    $sortKey: ProductSortKeys!
    $reverse: Boolean!
    $filters: [ProductFilter!]
  ) {
    products(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
      filters: $filters
    ) {
      nodes { ${PRODUCT_CARD_FIELDS} }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
      filters { id label type values { id label count input } }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        description
        image { id url altText width height }
      }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle(
    $handle: String!
    $first: Int!
    $after: String
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean!
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image { id url altText width height }
      products(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
        filters: $filters
      ) {
        nodes { ${PRODUCT_CARD_FIELDS} }
        pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
        filters { id label type values { id label count input } }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  query SearchProducts(
    $first: Int!
    $after: String
    $query: String!
    $sortKey: ProductSortKeys!
    $reverse: Boolean!
  ) {
    products(
      first: $first
      after: $after
      query: $query
      sortKey: $sortKey
      reverse: $reverse
    ) {
      nodes { ${PRODUCT_CARD_FIELDS} }
      pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
    }
  }
`;

export const GET_CART = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
      lines(first: 50) {
        nodes {
          id
          quantity
          cost { totalAmount { amount currencyCode } }
          attributes { key value }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              selectedOptions { name value }
              image { id url altText width height }
              product {
                id
                handle
                title
                featuredImage { id url altText width height }
              }
            }
          }
        }
      }
    }
  }
`;
