import { storefrontFetch } from "@/lib/shopify/client";
import { ADD_TO_CART, CREATE_CART, GET_CART, REMOVE_FROM_CART, UPDATE_CART, UPDATE_CART_DISCOUNTS } from "@/lib/shopify/mutations";
import type { ShopifyCart } from "@/lib/shopify/types";

interface CartPayload {
  cart: ShopifyCart | null;
  userErrors?: Array<{ field: string[] | null; message: string }>;
}

async function cartMutation<T>(query: string, field: string, variables: Record<string, unknown>): Promise<T> {
  const data = await storefrontFetch<Record<string, T>>(query, variables, 0);
  const payload = data[field] as CartPayload;
  if (payload.userErrors?.length) throw new Error(payload.userErrors.map((error) => error.message).join("; "));
  if (!payload.cart) throw new Error("Shopify did not return a cart.");
  return payload.cart as T;
}

export function createCart(variantId?: string, quantity = 1): Promise<ShopifyCart> {
  const lines = variantId ? [{ merchandiseId: variantId, quantity }] : [];
  return cartMutation<ShopifyCart>(CREATE_CART, "cartCreate", { input: { lines } });
}

export function addToCart(cartId: string, merchandiseId: string, quantity = 1): Promise<ShopifyCart> {
  return cartMutation<ShopifyCart>(ADD_TO_CART, "cartLinesAdd", {
    cartId,
    lines: [{ merchandiseId, quantity }],
  });
}

export function updateCart(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  return cartMutation<ShopifyCart>(UPDATE_CART, "cartLinesUpdate", { cartId, lines: [{ id: lineId, quantity }] });
}

export function removeFromCart(cartId: string, lineId: string): Promise<ShopifyCart> {
  return cartMutation<ShopifyCart>(REMOVE_FROM_CART, "cartLinesRemove", { cartId, lineIds: [lineId] });
}

export function updateCartDiscountCodes(cartId: string, codes: string[]): Promise<ShopifyCart> {
  return cartMutation<ShopifyCart>(UPDATE_CART_DISCOUNTS, "cartDiscountCodesUpdate", { cartId, discountCodes: codes },);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontFetch<{ cart: ShopifyCart | null }>(GET_CART, { cartId }, 0);
  return data.cart;
}