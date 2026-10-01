import "server-only";

interface StorefrontResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export const isShopifyConfigured = Boolean(
  process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
);

function getEndpoint() {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!rawDomain) throw new Error("Shopify Storefront API is not configured.");

  const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const version = process.env.SHOPIFY_API_VERSION || "2026-07";
  return `https://${domain}/api/${version}/graphql.json`;
}

export async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate = 60,
): Promise<T> {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("Shopify Storefront API is not configured.");

  const response = await fetch(getEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate, tags: ["shopify-storefront"] },
  });

  const result = (await response.json()) as StorefrontResponse<T>;
  if (!response.ok || result.errors?.length || !result.data) {
    throw new Error(result.errors?.map((error) => error.message).join("; ") || "Shopify request failed.");
  }

  return result.data;
}