"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { addToCart, createCart, getCart, removeCartLine, updateCartLine } from "@/lib/shopify/cart";
import type { ShopifyCart, ShopifyResult } from "@/lib/shopify/types";

const cartCookie = "anokhi-cart";
const lineInputSchema = z.object({
  merchandiseId: z.string().min(1).max(512).regex(/^gid:\/\/shopify\/ProductVariant\//),
  quantity: z.number().int().min(1).max(10),
  attributes: z.array(z.object({ key: z.string().min(1).max(64), value: z.string().max(256) })).max(12).optional(),
});
const updateInputSchema = z.object({
  lineId: z.string().min(1).max(512).regex(/^gid:\/\/shopify\/CartLine\//),
  quantity: z.number().int().min(0).max(10),
});

async function getBuyerIp(): Promise<string | undefined> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded && forwarded.length <= 64 ? forwarded : undefined;
}

async function setCartCookie(id: string) {
  const cookieStore = await cookies();
  cookieStore.set(cartCookie, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCurrentCart(): Promise<ShopifyResult<ShopifyCart>> {
  const cookieStore = await cookies();
  const id = cookieStore.get(cartCookie)?.value;
  if (!id) return { state: "empty", data: null, message: "Your bag is empty." };
  return getCart(id);
}

export async function addToCartAction(
  input: { merchandiseId: string; quantity: number; attributes?: Array<{ key: string; value: string }> },
): Promise<ShopifyResult<ShopifyCart>> {
  const parsed = lineInputSchema.safeParse(input);
  if (!parsed.success) {
    return { state: "error", data: null, message: "Choose an available product option before adding it to your bag." };
  }

  const buyerIp = await getBuyerIp();
  const cookieStore = await cookies();
  const existingId = cookieStore.get(cartCookie)?.value;
  const result = existingId
    ? await addToCart(existingId, parsed.data.merchandiseId, parsed.data.quantity, buyerIp, parsed.data.attributes)
    : await createCart(parsed.data, buyerIp);

  if (result.state === "ready") await setCartCookie(result.data.id);
  return result;
}

export async function updateCartLineAction(
  input: { lineId: string; quantity: number },
): Promise<ShopifyResult<ShopifyCart>> {
  const parsed = updateInputSchema.safeParse(input);
  if (!parsed.success) {
    return { state: "error", data: null, message: "That bag item could not be updated." };
  }
  const buyerIp = await getBuyerIp();
  const cookieStore = await cookies();
  const cartId = cookieStore.get(cartCookie)?.value;
  if (!cartId) return { state: "empty", data: null, message: "Your bag is empty." };
  return updateCartLine(cartId, parsed.data.lineId, parsed.data.quantity, buyerIp);
}

export async function removeCartLineAction(lineId: string): Promise<ShopifyResult<ShopifyCart>> {
  const parsed = z.string().min(1).max(512).regex(/^gid:\/\/shopify\/CartLine\//).safeParse(lineId);
  if (!parsed.success) return { state: "error", data: null, message: "That bag item could not be removed." };
  const buyerIp = await getBuyerIp();
  const cookieStore = await cookies();
  const cartId = cookieStore.get(cartCookie)?.value;
  if (!cartId) return { state: "empty", data: null, message: "Your bag is empty." };
  return removeCartLine(cartId, parsed.data, buyerIp);
}
