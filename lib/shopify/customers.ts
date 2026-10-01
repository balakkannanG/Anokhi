import { storefrontFetch } from "@/lib/shopify/client";
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_CREATE } from "@/lib/shopify/mutations";

export async function createCustomer(input: { firstName: string; lastName: string; email: string; password: string; phone?: string }) {
  return storefrontFetch(CUSTOMER_CREATE, { input }, 0);
}

export async function createCustomerAccessToken(input: { email: string; password: string }) {
  return storefrontFetch(CUSTOMER_ACCESS_TOKEN_CREATE, { input }, 0);
}