import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";

export const metadata: Metadata = { title: "My account", robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Account" }]} />
      <header className="py-10 sm:py-14"><h1 className="display-face text-[clamp(2.6rem,5vw,4.5rem)] text-charcoal">Your Anokhi account.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-coffee">Sign in to view order history and account details.</p></header>
      <ShopifyState result={{ state: "not-configured", data: null, message: "Account access requires Shopify Customer Account API OAuth configuration. No passwords are stored by this storefront." }} />
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {[{ label: "Orders", href: "/account/orders" }, { label: "Addresses", href: "/account/addresses" }, { label: "Wishlist", href: "/account/wishlist" }, { label: "Profile settings", href: "/account/login" }].map((item) => <Link className="border-t border-taupe/45 py-4 text-sm text-charcoal hover:text-anokhi-plum" href={item.href} key={item.label}>{item.label} <span aria-hidden="true">↗</span></Link>)}
      </div>
    </main>
  );
}
