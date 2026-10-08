import "server-only";

import { storefrontFetch, unavailable } from "@/lib/shopify/client";
import { CART_CREATE, CART_LINES_ADD, CART_LINES_REMOVE, CART_LINES_UPDATE } from "@/lib/shopify/mutations";
import { GET_CART } from "@/lib/shopify/queries";
import type { ShopifyCart, ShopifyResult, ShopifyUserError } from "@/lib/shopify/types";

interface CartPayload {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: ShopifyCart["cost"];
  lines?: { nodes: ShopifyCart["lines"] };
}
interface CartMutationPayload {
  cartCreate?: { cart: CartPayload | null; userErrors: ShopifyUserError[] };
  cartLinesAdd?: { cart: CartPayload | null; userErrors: ShopifyUserError[] };
  cartLinesUpdate?: { cart: CartPayload | null; userErrors: ShopifyUserError[] };
  cartLinesRemove?: { cart: CartPayload | null; userErrors: ShopifyUserError[] };
}

function normalizeCart(cart: CartPayload): ShopifyCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: cart.cost,
    lines: cart.lines?.nodes ?? [],
  };
}

function firstUserError(errors: ShopifyUserError[]): string | null {
  return errors[0]?.message ?? null;
}

export async function getCart(cartId: string): Promise<ShopifyResult<ShopifyCart>> {
  if (!cartId.startsWith("gid://shopify/Cart/")) {
    return unavailable("empty", "Your bag is empty.");
  }

  const result = await storefrontFetch<{ cart: CartPayload | null }, Record<string, unknown>>(
    GET_CART,
    { cartId },
    { cache: "no-store" },
  );
  if (result.state !== "ready") return result;
  if (!result.data.cart) return unavailable("empty", "Your bag is empty.");
  return { state: "ready", data: normalizeCart(result.data.cart) };
}

export async function createCart(input: {
  merchandiseId: string;
  quantity: number;
  attributes?: Array<{ key: string; value: string }>;
}, buyerIp?: string): Promise<ShopifyResult<ShopifyCart>> {
  const result = await storefrontFetch<CartMutationPayload, Record<string, unknown>>(
    CART_CREATE,
    {
      lines: [{
        merchandiseId: input.merchandiseId,
        quantity: Math.max(1, Math.min(10, Math.trunc(input.quantity))),
        attributes: input.attributes ?? [],
      }],
    },
    { cache: "no-store", buyerIp },
  );
  if (result.state !== "ready") return result;
  const payload = result.data.cartCreate;
  const message = payload ? firstUserError(payload.userErrors) : null;
  if (message) return unavailable("error", message);
  if (!payload?.cart) return unavailable("error", "Shopify could not create your bag.");
  return { state: "ready", data: normalizeCart(payload.cart) };
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number,
  buyerIp?: string,
  attributes?: Array<{ key: string; value: string }>,
): Promise<ShopifyResult<ShopifyCart>> {
  return mutateCart(CART_LINES_ADD, "cartLinesAdd", cartId, {
    lines: [{ merchandiseId, quantity: Math.max(1, Math.min(10, Math.trunc(quantity))), attributes: attributes ?? [] }],
  }, buyerIp);
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
  buyerIp?: string,
): Promise<ShopifyResult<ShopifyCart>> {
  return mutateCart(CART_LINES_UPDATE, "cartLinesUpdate", cartId, {
    lines: [{ id: lineId, quantity: Math.max(0, Math.min(10, Math.trunc(quantity))) }],
  }, buyerIp);
}

export async function removeCartLine(
  cartId: string,
  lineId: string,
  buyerIp?: string,
): Promise<ShopifyResult<ShopifyCart>> {
  return mutateCart(CART_LINES_REMOVE, "cartLinesRemove", cartId, { lineIds: [lineId] }, buyerIp);
}

async function mutateCart(
  query: string,
  field: "cartLinesAdd" | "cartLinesUpdate" | "cartLinesRemove",
  cartId: string,
  extra: Record<string, unknown>,
  buyerIp?: string,
): Promise<ShopifyResult<ShopifyCart>> {
  const result = await storefrontFetch<CartMutationPayload, Record<string, unknown>>(
    query,
    { cartId, ...extra },
    { cache: "no-store", buyerIp },
  );
  if (result.state !== "ready") return result;
  const payload = result.data[field];
  const message = payload ? firstUserError(payload.userErrors) : null;
  if (message) return unavailable("error", message);
  if (!payload?.cart) return unavailable("error", "Shopify could not update your bag.");
  return { state: "ready", data: normalizeCart(payload.cart) };
}
