import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { CartLineControls } from "@/components/cart/cart-line-controls";
import { Price } from "@/components/product/price";
import { getCurrentCart } from "@/lib/shopify/actions";

export const metadata: Metadata = { title: "Your bag", robots: { index: false, follow: false } };

export default async function CartPage() {
  const cart = await getCurrentCart();
  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Your bag" }]} />
      <header className="py-8 sm:py-12">
        <h1 className="display-face text-[clamp(2.5rem,5vw,4.2rem)] text-charcoal">Your bag</h1>
        {cart.state === "ready" ? <p className="mt-2 text-sm text-coffee">{cart.data.totalQuantity} items</p> : null}
      </header>
      {cart.state === "ready" ? cart.data.lines.length ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <div className="divide-y divide-taupe/35 border-t border-taupe/35">
            {cart.data.lines.map((line) => {
              const product = line.merchandise.product;
              const image = line.merchandise.image ?? product.featuredImage;
              return (
                <article className="grid grid-cols-[96px_1fr] gap-4 py-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6" key={line.id}>
                  <Link className="photo-well relative aspect-square overflow-hidden rounded-[9px] bg-cream" href={`/products/${product.handle}`}>
                    {image ? <Image alt={image.altText || product.title} className="object-cover" fill sizes="120px" src={image.url} /> : null}
                  </Link>
                  <div>
                    <Link className="display-face text-lg text-charcoal hover:text-anokhi-plum" href={`/products/${product.handle}`}>{product.title}</Link>
                    <p className="mt-1 text-xs text-coffee">{line.merchandise.selectedOptions.map((option) => option.value).join(" / ")}</p>
                    {line.attributes.map((attribute) => <p className="mt-1 text-[11px] text-coffee" key={attribute.key}>{attribute.key}: {attribute.value}</p>)}
                    <div className="mt-3 sm:hidden"><Price money={line.cost.totalAmount} /></div>
                    <CartLineControls lineId={line.id} quantity={line.quantity} />
                  </div>
                  <div className="hidden pt-1 text-sm text-charcoal sm:block"><Price money={line.cost.totalAmount} /></div>
                </article>
              );
            })}
          </div>
          <aside className="h-fit bg-cream p-5 sm:p-7">
            <h2 className="display-face text-2xl text-charcoal">Order summary</h2>
            <div className="mt-5 flex justify-between border-t border-taupe/40 pt-4 text-sm"><span>Subtotal</span><Price money={cart.data.cost.subtotalAmount} /></div>
            <p className="mt-3 text-xs leading-5 text-coffee">Shipping, taxes and any applicable charges are calculated at Shopify checkout.</p>
            <Link className="mt-6 flex min-h-12 items-center justify-center bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.14em] text-ivory" href="/checkout">CONTINUE TO CHECKOUT <span aria-hidden="true" className="ml-3">↗</span></Link>
            <p className="mt-3 text-center text-[10px] text-coffee">Secure checkout is completed by Shopify.</p>
          </aside>
        </div>
      ) : <ShopifyState result={{ state: "empty", data: null, message: "Your bag is empty. Explore Anokhi jewellery to find something you love." }} emptyAction={{ label: "EXPLORE JEWELLERY", href: "/jewellery" }} /> : <ShopifyState result={cart} emptyAction={{ label: "EXPLORE JEWELLERY", href: "/jewellery" }} />}
      <section className="mt-14 border-t border-taupe/35 pt-8 sm:mt-20" aria-labelledby="cart-recommendations-title">
        <h2 className="display-face text-2xl text-charcoal" id="cart-recommendations-title">Explore more jewellery.</h2>
        <p className="mt-2 text-sm text-coffee">Discover signature pieces across the Anokhi collections.</p>
        <Link className="quiet-link mt-4 inline-block pb-1 text-[10px] tracking-[0.14em]" href="/collections">BROWSE COLLECTIONS <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
