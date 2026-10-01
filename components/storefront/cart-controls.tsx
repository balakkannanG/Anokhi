"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, Heart, Minus, Plus, Trash, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ShopifyCart, ShopifyVariant } from "@/lib/shopify/types";

const CART_STORAGE_KEY = "anokhi-shopify-cart-id";
const WISHLIST_STORAGE_KEY = "anokhi-saved-products";

export function WishlistButton({ productHandle, productTitle }: { productHandle: string; productTitle: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedProducts = JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]") as string[];
        setSaved(savedProducts.includes(productHandle));
      } catch {
        window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [productHandle]);

  function toggleSaved() {
    let savedProducts: string[] = [];
    try {
      savedProducts = JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]") as string[];
    } catch {
      savedProducts = [];
    }
    const nextProducts = saved ? savedProducts.filter((handle) => handle !== productHandle) : [...new Set([...savedProducts, productHandle])];
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextProducts));
    setSaved(!saved);
  }

  return <button type="button" aria-label={saved ? `Remove ${productTitle} from saved pieces` : `Save ${productTitle}`} aria-pressed={saved} onClick={toggleSaved} className="absolute right-3 top-3 z-10 grid size-9 place-items-center bg-white/90 text-[var(--ink)] transition-colors hover:text-[var(--anokhi)]"><Heart size={17} weight={saved ? "fill" : "light"} /></button>;
}

export function QuickViewButton({
  product,
  configured,
}: {
  product: { title: string; handle: string; description: string; image: string | null; imageAlt: string | null; price: string; currencyCode: string; variantId?: string; available: boolean };
  configured: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <>
    <button type="button" onClick={() => setOpen(true)} className="absolute bottom-3 left-3 right-3 z-10 flex min-h-10 items-center justify-center gap-2 bg-white/95 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--ink)] transition-colors hover:text-[var(--anokhi)] md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100"><Eye size={15} weight="light" /> Quick view</button>
    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <motion.div role="dialog" aria-modal="true" aria-label={`Quick view: ${product.title}`} initial={{ opacity: 0, y: 14, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="relative grid w-full max-w-3xl overflow-hidden rounded-[var(--media-radius)] bg-[var(--paper)] sm:grid-cols-2">
          <button type="button" aria-label="Close quick view" onClick={() => setOpen(false)} className="absolute right-3 top-3 z-10 grid size-10 place-items-center bg-white"><X size={19} weight="light" /></button>
          <div className="relative min-h-[280px] bg-[#eee9e7] sm:min-h-[440px]">{product.image && <Image src={product.image} alt={product.imageAlt || product.title} fill unoptimized sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" />}</div>
          <div className="flex flex-col justify-center p-6 sm:p-9"><p className="font-editorial text-[34px] leading-[1.05]">{product.title}</p><p className="mt-3 text-[12px]">{formatMoney(product.price, product.currencyCode)}</p><p className="mt-4 line-clamp-5 text-[12px] leading-6 text-[var(--muted)]">{product.description}</p><div className="mt-7"><AddToBagButton variantId={product.variantId} configured={configured} available={product.available} /></div><Link onClick={() => setOpen(false)} href={`/products/${product.handle}`} className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)]">View full details <ArrowRight size={14} /></Link></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}

export function AddToBagButton({
  variantId,
  configured,
  available = true,
  quantity = 1,
  compact = false,
}: {
  variantId?: string;
  configured: boolean;
  available?: boolean;
  quantity?: number;
  compact?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const unavailable = !configured || !available || !variantId;

  async function add() {
    if (unavailable || pending) return;
    setPending(true);
    setStatus("");
    try {
      const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", cartId, variantId, quantity }),
      });
      const result = (await response.json()) as { cart?: Pick<ShopifyCart, "id">; message?: string };
      if (!response.ok || !result.cart) throw new Error(result.message || "Unable to add this piece.");
      window.localStorage.setItem(CART_STORAGE_KEY, result.cart.id);
      window.dispatchEvent(new Event("anokhi-cart-updated"));
      setStatus("Added to your bag");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to add this piece.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button type="button" disabled={unavailable || pending} onClick={add} className={`min-h-11 bg-[var(--anokhi)] px-4 text-[9px] font-medium uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-55 ${compact ? "w-full" : "w-full"}`}>
        {pending ? "Adding" : !configured ? "Connect Shopify" : !available ? "Unavailable" : "Add to bag"}
      </button>
      <p aria-live="polite" className="mt-2 min-h-4 text-[10px] text-[var(--muted)]">{status}</p>
    </div>
  );
}

export function ProductPurchasePanel({ product }: { product: { variants: { nodes: ShopifyVariant[] }; availableForSale: boolean } }) {
  const variants = product.variants.nodes;
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const selectedVariant = variants.find((variant) => variant.id === variantId) ?? variants[0];
  const optionNames = Array.from(new Set(variants.flatMap((variant) => variant.selectedOptions.map((option) => option.name))));

  return (
    <div className="mt-6 grid gap-4">
      {optionNames.map((name) => {
        const values = Array.from(new Set(variants.flatMap((variant) => variant.selectedOptions.filter((option) => option.name === name).map((option) => option.value))));
        const selectedValue = selectedVariant?.selectedOptions.find((option) => option.name === name)?.value ?? values[0];
        return <label key={name} className="grid gap-2 text-[11px]">{name}<select value={selectedValue} onChange={(event) => {
          const nextVariant = variants.find((variant) => variant.selectedOptions.some((option) => option.name === name && option.value === event.target.value));
          if (nextVariant) setVariantId(nextVariant.id);
        }} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px]">{values.map((value) => <option key={value}>{value}</option>)}</select></label>;
      })}
      <div className="flex items-center justify-between border-y border-[var(--line)] py-4">
        <span className="text-[11px]">Quantity</span>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((count) => Math.max(1, count - 1))} className="grid size-8 place-items-center disabled:opacity-40"><Minus size={14} /></button>
          <span aria-live="polite" className="min-w-4 text-center text-[12px]">{quantity}</span>
          <button type="button" aria-label="Increase quantity" disabled={quantity >= 99} onClick={() => setQuantity((count) => Math.min(99, count + 1))} className="grid size-8 place-items-center disabled:opacity-40"><Plus size={14} /></button>
        </div>
      </div>
      <div className="hidden gap-3 md:grid">
        <AddToBagButton variantId={selectedVariant?.id} configured={true} available={product.availableForSale && Boolean(selectedVariant?.availableForSale)} quantity={quantity} />
        {selectedVariant && <BuyNowButton variantId={selectedVariant.id} quantity={quantity} available={product.availableForSale && selectedVariant.availableForSale} />}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 border-t border-[var(--line)] bg-[var(--paper)] px-4 py-3 shadow-[0_-8px_24px_rgba(51,31,45,0.08)] md:hidden">
        <div className="min-w-0 flex-1"><p className="truncate text-[11px]">{selectedVariant?.title}</p><p className="mt-1 text-[10px] text-[var(--muted)]">{selectedVariant ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}</p></div>
        <div className="w-[46%]"><AddToBagButton variantId={selectedVariant?.id} configured={true} available={product.availableForSale && Boolean(selectedVariant?.availableForSale)} quantity={quantity} compact /></div>
      </div>
    </div>
  );
}

function BuyNowButton({ variantId, quantity, available }: { variantId: string; quantity: number; available: boolean }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function checkout() {
    setPending(true);
    setMessage("");
    try {
      const cartId = window.localStorage.getItem(CART_STORAGE_KEY);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", cartId, variantId, quantity }),
      });
      const result = (await response.json()) as { cart?: Pick<ShopifyCart, "id" | "checkoutUrl">; message?: string };
      if (!response.ok || !result.cart) throw new Error(result.message || "Checkout is not available.");
      window.localStorage.setItem(CART_STORAGE_KEY, result.cart.id);
      window.location.assign(result.cart.checkoutUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout is not available.");
    } finally {
      setPending(false);
    }
  }

  return <div><button type="button" disabled={!available || pending} onClick={checkout} className="min-h-12 w-full border border-[var(--line)] px-5 text-[10px] font-medium uppercase tracking-[0.11em] disabled:cursor-not-allowed disabled:opacity-50">{pending ? "Opening checkout" : "Buy now"}<ArrowRight size={13} className="ml-2 inline" /></button><p role="status" className="mt-2 min-h-4 text-[10px] text-[var(--muted)]">{message}</p></div>;
}

export function CartView({ configured }: { configured: boolean }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  const refreshCart = () => loadCart(configured, setCart, setLoading, setMessage);

  useEffect(() => {
    const refresh = () => void loadCart(configured, setCart, setLoading, setMessage);
    const timer = window.setTimeout(refresh, 0);
    const onCartUpdate = () => refresh();
    window.addEventListener("anokhi-cart-updated", onCartUpdate);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("anokhi-cart-updated", onCartUpdate);
    };
  }, [configured]);

  async function updateLine(action: "update" | "remove", lineId: string, quantity?: number) {
    if (!cart) return;
    setMessage("");
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, cartId: cart.id, lineId, quantity }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to update your bag.");
      await refreshCart();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update your bag.");
    }
  }

  async function applyDiscount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart) return;
    setMessage("");
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "discount", cartId: cart.id, code: discountCode }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to apply the code.");
      await refreshCart();
      setMessage(discountCode.trim() ? "Discount code checked by Shopify." : "Discount code removed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to apply the code.");
    }
  }

  if (loading) return <div className="border-y border-[var(--line)] py-10 text-[12px] text-[var(--muted)]">Loading your bag…</div>;
  if (!configured) return <EmptyBag message="Connect Shopify to enable bag updates and secure checkout." />;
  if (!cart || cart.lines.nodes.length === 0) return <EmptyBag message={message || "Your shopping bag is empty. Explore rings and jewellery to find your piece."} />;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_330px]">
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {cart.lines.nodes.map((line) => {
          const image = line.merchandise.product.featuredImage;
          return <article key={line.id} className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6">
            <Link href={`/products/${line.merchandise.product.handle}`} className="relative aspect-[0.85] overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7]">{image && <Image src={image.url} alt={image.altText || line.merchandise.product.title} fill unoptimized sizes="120px" className="object-cover" />}</Link>
            <div><Link href={`/products/${line.merchandise.product.handle}`} className="text-[13px]">{line.merchandise.product.title}</Link><p className="mt-2 text-[11px] text-[var(--muted)]">{line.merchandise.title}</p><div className="mt-4 flex items-center gap-3"><button type="button" aria-label="Decrease quantity" disabled={line.quantity <= 1} onClick={() => void updateLine("update", line.id, line.quantity - 1)} className="grid size-8 place-items-center disabled:opacity-40"><Minus size={14} /></button><span className="text-[12px]">{line.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => void updateLine("update", line.id, line.quantity + 1)} className="grid size-8 place-items-center"><Plus size={14} /></button><button type="button" onClick={() => void updateLine("remove", line.id)} className="ml-2 inline-flex items-center gap-1 text-[10px] text-[var(--muted)]"><Trash size={14} /> Remove</button></div></div>
            <p className="col-start-2 text-[12px] sm:col-start-auto">{formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}</p>
          </article>;
        })}
      </div>
      <aside className="h-fit border-t border-[var(--line)] pt-5 lg:sticky lg:top-8">
        <h2 className="font-editorial text-[28px]">Order summary</h2>
        <div className="mt-5 flex justify-between text-[12px]"><span>Subtotal</span><span>{formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</span></div>
        <form onSubmit={applyDiscount} className="mt-5 border-y border-[var(--line)] py-4">
          <label htmlFor="cart-discount" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.1em]">Discount code</label>
          <div className="flex gap-2"><input id="cart-discount" value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} className="min-h-10 min-w-0 flex-1 border border-[var(--line)] bg-white px-3 text-[12px]" /><button className="px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--anokhi)]">Apply</button></div>
        </form>
        <div className="mt-4 flex justify-between text-[12px]"><span>Estimated total</span><span>{formatMoney(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}</span></div>
        <p className="mt-3 text-[10px] leading-5 text-[var(--muted)]">Shipping and any remaining taxes are calculated at Shopify checkout.</p>
        <a href={cart.checkoutUrl} className="mt-6 flex min-h-12 items-center justify-center gap-3 bg-[var(--anokhi)] px-5 text-[10px] font-medium uppercase tracking-[0.11em] text-white">Continue to checkout <ArrowRight size={15} /></a>
        {message && <p role="status" className="mt-3 text-[11px] text-[var(--anokhi)]">{message}</p>}
      </aside>
    </div>
  );
}

function EmptyBag({ message }: { message: string }) {
  return <div className="grid gap-6 border-y border-[var(--line)] py-9 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-editorial text-[28px]">Your bag is waiting</p><p className="mt-2 max-w-[55ch] text-[12px] leading-6 text-[var(--muted)]">{message}</p></div><Link href="/rings" className="flex min-h-12 items-center justify-center gap-4 bg-[var(--anokhi)] px-5 text-[10px] font-medium uppercase tracking-[0.11em] text-white">Explore rings <ArrowRight size={15} weight="light" /></Link></div>;
}

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en", { style: "currency", currency: currencyCode }).format(Number(amount));
}

async function loadCart(
  configured: boolean,
  setCart: Dispatch<SetStateAction<ShopifyCart | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setMessage: Dispatch<SetStateAction<string>>,
) {
  if (!configured) {
    setCart(null);
    setLoading(false);
    return;
  }
  const id = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!id) {
    setCart(null);
    setLoading(false);
    return;
  }
  try {
    const response = await fetch(`/api/cart?id=${encodeURIComponent(id)}`, { cache: "no-store" });
    const result = (await response.json()) as { cart?: ShopifyCart | null; message?: string };
    if (!response.ok) throw new Error(result.message || "Unable to load your bag.");
    setCart(result.cart ?? null);
    if (!result.cart) window.localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    setMessage(error instanceof Error ? error.message : "Unable to load your bag.");
  } finally {
    setLoading(false);
  }
}