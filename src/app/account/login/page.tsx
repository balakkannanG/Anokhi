import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="grid min-h-[70vh] lg:grid-cols-2" id="main-content">
      <div className="photo-well relative hidden min-h-[42rem] lg:block"><Image alt={placeholderImages.model.alt} className="object-cover" fill sizes="50vw" src={placeholderImages.model.src} /></div>
      <div className="flex items-center px-5 py-14 sm:px-10 lg:px-[13%]">
        <div className="mx-auto w-full max-w-[28rem]">
          <p className="eyebrow">ANOKHI ACCOUNT</p>
          <h1 className="display-face mt-3 text-4xl text-charcoal">Welcome back.</h1>
          <p className="mt-3 text-sm leading-6 text-coffee">Sign in to view orders and manage your account.</p>
          <div className="mt-7 border border-taupe/45 bg-cream p-4 text-xs leading-5 text-coffee" role="status">Customer Account sign-in will be available when Shopify Customer Account API OAuth is configured for this storefront.</div>
          <form className="mt-7 grid gap-4">
            <div className="grid gap-2"><Label htmlFor="login-email">Email address</Label><Input autoComplete="email" disabled id="login-email" name="email" type="email" /></div>
            <button className="h-12 bg-anokhi-plum text-[10px] font-semibold tracking-[0.14em] text-ivory opacity-50" disabled type="submit">SIGN IN UNAVAILABLE</button>
          </form>
          <div className="mt-5 flex items-center justify-between gap-4 text-xs text-coffee"><Link href="/account/register">Create an account</Link><Link href="/account">Account details</Link></div>
        </div>
      </div>
    </main>
  );
}
