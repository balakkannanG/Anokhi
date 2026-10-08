import "server-only";

import type { ShopifyResult } from "@/lib/shopify/types";

const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

interface StorefrontPayload<T> {
  data?: T;
  errors?: Array<{ message: string; extensions?: { code?: string } }>;
}

export class ShopifyRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyRequestError";
  }
}

function getStorefrontConfig():
  | { state: "ready"; endpoint: string; token: string }
  | { state: "not-configured"; message: string } {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

  if (!rawDomain || !token) {
    return {
      state: "not-configured",
      message: "Connect the Shopify Storefront API to load live products and prices.",
    };
  }

  const domain = rawDomain.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  if (!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i.test(domain)) {
    return {
      state: "not-configured",
      message: "Set SHOPIFY_STORE_DOMAIN to the store's myshopify.com domain.",
    };
  }

  return {
    state: "ready",
    endpoint: `https://${domain}/api/${API_VERSION}/graphql.json`,
    token,
  };
}

export function unavailable<T>(
  state: "not-configured" | "empty" | "error",
  message: string,
): ShopifyResult<T> {
  return { state, data: null, message };
}

export async function storefrontFetch<TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables: TVariables,
  options: {
    cache?: RequestCache;
    revalidate?: number;
    tags?: string[];
    buyerIp?: string;
  } = {},
): Promise<ShopifyResult<TData>> {
  const config = getStorefrontConfig();
  if (config.state !== "ready") {
    return unavailable("not-configured", config.message);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Shopify-Storefront-Access-Token": config.token,
  };
  if (options.buyerIp) headers["Shopify-Storefront-Buyer-IP"] = options.buyerIp;

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: options.cache ?? "force-cache",
      ...(options.revalidate || options.tags?.length
        ? {
            next: {
              ...(options.revalidate ? { revalidate: options.revalidate } : {}),
              ...(options.tags?.length ? { tags: options.tags } : {}),
            },
          }
        : {}),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return unavailable(
        "error",
        "The Shopify catalogue could not be reached. Please try again shortly.",
      );
    }

    const payload = (await response.json()) as StorefrontPayload<TData>;
    if (payload.errors?.length || !payload.data) {
      return unavailable(
        "error",
        "The Shopify catalogue returned an error. Check the Storefront API setup and permissions.",
      );
    }

    return { state: "ready", data: payload.data };
  } catch (error) {
    const isTimeout = error instanceof Error && error.name === "TimeoutError";
    return unavailable(
      "error",
      isTimeout
        ? "The Shopify catalogue took too long to respond. Please try again."
        : "The Shopify catalogue is temporarily unavailable.",
    );
  }
}
