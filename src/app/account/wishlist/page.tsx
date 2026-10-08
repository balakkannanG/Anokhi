import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ShopifyState } from "@/components/common/shopify-state";
import { WishlistList } from "@/components/wishlist/wishlist-list";
import { getProducts } from "@/lib/shopify/products";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false, follow: false } };

export default async function WishlistPage() {
  const result = await getProducts({ first: 48 });
  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Account", href: "/account" }, { label: "Wishlist" }]} />
      <header className="py-10"><h1 className="display-face text-[clamp(2.6rem,5vw,4.3rem)] text-charcoal">Saved pieces.</h1><p className="mt-3 text-sm text-coffee">Your saved pieces are stored in this browser.</p></header>
      {result.state === "ready" ? <WishlistList products={result.data.products} /> : <ShopifyState result={result} emptyAction={{ label: "EXPLORE JEWELLERY", href: "/jewellery" }} />}
    </main>
  );
}
