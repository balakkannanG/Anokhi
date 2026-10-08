import "server-only";

import type { ShopifyResult } from "@/lib/shopify/types";

export interface CustomerAccountConfiguration {
  clientId: string;
  storefrontDomain: string;
  accountApiOrigin: string;
}

export function getCustomerAccountConfiguration(): ShopifyResult<CustomerAccountConfiguration> {
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID?.trim();
  const storefrontDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const accountApiOrigin = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_ORIGIN?.trim();
  if (!clientId || !storefrontDomain || !accountApiOrigin) {
    return {
      state: "not-configured",
      data: null,
      message: "Customer Account API OAuth settings are required before account access can be enabled.",
    };
  }
  try {
    const origin = new URL(accountApiOrigin);
    if (origin.protocol !== "https:") throw new Error("HTTPS required");
    return {
      state: "ready",
      data: {
        clientId,
        storefrontDomain,
        accountApiOrigin: origin.origin,
      },
    };
  } catch {
    return {
      state: "error",
      data: null,
      message: "The Customer Account API origin must be a valid HTTPS URL.",
    };
  }
}
