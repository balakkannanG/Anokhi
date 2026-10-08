import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "Create an account", robots: { index: false, follow: false } };
const fields = [
  { id: "first-name", label: "First name", type: "text", autocomplete: "given-name" },
  { id: "last-name", label: "Last name", type: "text", autocomplete: "family-name" },
  { id: "register-email", label: "Email address", type: "email", autocomplete: "email" },
  { id: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
  { id: "password", label: "Password", type: "password", autocomplete: "new-password" },
  { id: "confirm-password", label: "Confirm password", type: "password", autocomplete: "new-password" },
];

export default function RegisterPage() {
  return (
    <main className="grid min-h-[70vh] lg:grid-cols-2" id="main-content">
      <div className="photo-well relative hidden min-h-[42rem] lg:block"><Image alt={placeholderImages.bridalSet.alt} className="object-cover" fill sizes="50vw" src={placeholderImages.bridalSet.src} /></div>
      <div className="flex items-center px-5 py-14 sm:px-10 lg:px-[13%]">
        <div className="mx-auto w-full max-w-[28rem]">
          <p className="eyebrow">ANOKHI ACCOUNT</p>
          <h1 className="display-face mt-3 text-4xl text-charcoal">Create your account.</h1>
          <p className="mt-3 text-sm leading-6 text-coffee">Registration opens when Shopify Customer Account API is configured.</p>
          <form className="mt-7 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => <div className="grid gap-2" key={field.id}><Label htmlFor={field.id}>{field.label}</Label><Input autoComplete={field.autocomplete} disabled id={field.id} name={field.id} type={field.type} /></div>)}
            <button className="h-12 bg-anokhi-plum text-[10px] font-semibold tracking-[0.14em] text-ivory opacity-50 sm:col-span-2" disabled type="submit">REGISTRATION UNAVAILABLE</button>
          </form>
          <p className="mt-5 text-xs text-coffee">Already have an account? <Link className="underline underline-offset-4" href="/account/login">Sign in</Link></p>
        </div>
      </div>
    </main>
  );
}
