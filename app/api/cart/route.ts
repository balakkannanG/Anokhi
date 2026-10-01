import { NextRequest, NextResponse } from "next/server";
import { addToCart, createCart, getCart, removeFromCart, updateCart, updateCartDiscountCodes } from "@/lib/shopify/cart";
import { isShopifyConfigured } from "@/lib/shopify/client";

type CartAction = "add" | "create" | "update" | "remove" | "discount";

export async function GET(request: NextRequest) {
  if (!isShopifyConfigured) return NextResponse.json({ cart: null, configured: false });
  const cartId = request.nextUrl.searchParams.get("id");
  if (!cartId) return NextResponse.json({ cart: null, configured: true });

  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart, configured: true });
  } catch {
    return NextResponse.json({ message: "Unable to retrieve the Shopify cart." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured) return NextResponse.json({ message: "Shopify is not configured yet." }, { status: 503 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = body.action as CartAction;
    const cartId = typeof body.cartId === "string" ? body.cartId : "";
    let cart;

    if (action === "create") {
      const variantId = typeof body.variantId === "string" ? body.variantId : undefined;
      cart = await createCart(variantId, validQuantity(body.quantity));
    } else if (action === "add") {
      const variantId = typeof body.variantId === "string" ? body.variantId : "";
      if (!variantId) return NextResponse.json({ message: "A product variant is required." }, { status: 400 });
      cart = cartId
        ? await addToCart(cartId, variantId, validQuantity(body.quantity))
        : await createCart(variantId, validQuantity(body.quantity));
    } else if (action === "update") {
      const lineId = typeof body.lineId === "string" ? body.lineId : "";
      if (!cartId || !lineId) return NextResponse.json({ message: "A cart and line are required." }, { status: 400 });
      cart = await updateCart(cartId, lineId, validQuantity(body.quantity));
    } else if (action === "remove") {
      const lineId = typeof body.lineId === "string" ? body.lineId : "";
      if (!cartId || !lineId) return NextResponse.json({ message: "A cart and line are required." }, { status: 400 });
      cart = await removeFromCart(cartId, lineId);
    } else if (action === "discount") {
      const code = typeof body.code === "string" ? body.code.trim().slice(0, 100) : "";
      if (!cartId) return NextResponse.json({ message: "A cart is required." }, { status: 400 });
      cart = await updateCartDiscountCodes(cartId, code ? [code] : []);
    } else {
      return NextResponse.json({ message: "Unknown cart action." }, { status: 400 });
    }

    return NextResponse.json({ cart, configured: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update the Shopify cart.";
    return NextResponse.json({ message }, { status: 502 });
  }
}

function validQuantity(value: unknown) {
  const quantity = Number(value ?? 1);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error("Quantity must be between 1 and 99.");
  return quantity;
}