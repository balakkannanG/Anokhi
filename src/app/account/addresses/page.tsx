import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";

export const metadata: Metadata = { title: "Addresses", robots: { index: false, follow: false } };

export default function AccountAddressesPage() {
  return <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content"><Breadcrumbs items={[{ label: "Account", href: "/account" }, { label: "Addresses" }]} /><header className="py-10"><h1 className="display-face text-4xl text-charcoal">Saved addresses.</h1></header><ShopifyState result={{ state: "not-configured", data: null, message: "Address management is available after Shopify Customer Account API sign-in is configured." }} /></main>;
}
