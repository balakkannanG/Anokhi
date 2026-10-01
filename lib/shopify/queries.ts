const IMAGE_FIELDS = `
  url
  altText
  width
  height
`;

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  availableForSale
  featuredImage { ${IMAGE_FIELDS} }
  images(first: 8) { nodes { ${IMAGE_FIELDS} } }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  variants(first: 30) {
    nodes {
      id
      title
      availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
    }
  }
  metafields(first: 30) { nodes { namespace key value type } }
`;

export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      nodes { ${PRODUCT_FIELDS} }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first, sortKey: UPDATED_AT, reverse: true) {
      nodes { id handle title description image { ${IMAGE_FIELDS} } }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id handle title description image { ${IMAGE_FIELDS} }
      products(first: $first) { nodes { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  query SearchProducts($first: Int!, $query: String!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) { nodes { ${PRODUCT_FIELDS} } }
  }
`;