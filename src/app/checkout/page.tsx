import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { getCurrentCart } from "@/lib/shopify/actions";

export default async function CheckoutPage() {
  const cart = await getCurrentCart();
  if (cart.state === "ready" && cart.data.checkoutUrl) redirect(cart.data.checkoutUrl);

  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Checkout" }]} />
      <header className="py-10 sm:py-14"><h1 className="display-face text-[clamp(2.5rem,5vw,4rem)] text-charcoal">Continue with Shopify.</h1></header>
      <ShopifyState result={cart} emptyAction={{ label: "RETURN TO YOUR BAG", href: "/cart" }} />
      <p className="mt-5 text-center text-xs text-coffee">Payment and order confirmation are securely completed on Shopify.</p>
    </main>
  );
}
