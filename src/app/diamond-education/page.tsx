import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export const metadata: Metadata = { title: "Diamond Education" };

const diamondFacts = [
  { title: "Cut", body: "Cut describes the proportions and finish that influence how a diamond returns light." },
  { title: "Colour", body: "Colour grading describes how much body colour can be observed in a diamond." },
  { title: "Clarity", body: "Clarity considers naturally occurring inclusions and surface features." },
  { title: "Carat", body: "Carat is a unit of weight. It does not describe the diamond's face-up size by itself." },
];
const shapes = ["Round", "Oval", "Emerald", "Pear", "Cushion", "Princess"];

export default function DiamondEducationPage() {
  return (
    <main className="page-shell pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Diamond Education" }]} />
      <header className="grid gap-7 py-10 sm:py-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
        <div><h1 className="display-face max-w-[11ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.08] text-charcoal">A closer look at diamonds.</h1><p className="mt-4 max-w-lg text-sm leading-6 text-coffee">Learn the language used to describe a diamond, from its cut to its carat weight.</p></div>
        <div className="photo-well relative aspect-[1.25] overflow-hidden rounded-[14px] bg-cream"><Image alt={placeholderImages.diamond.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 55vw" src={placeholderImages.diamond.src} /></div>
      </header>
      <section aria-labelledby="four-cs-title" className="py-8">
        <h2 className="display-face text-3xl text-charcoal" id="four-cs-title">The 4Cs, simply.</h2>
        <p className="mt-3 max-w-[60ch] text-sm leading-6 text-coffee">These descriptions are general education. Refer to current Shopify product details for specific attributes.</p>
        <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4">
          {diamondFacts.map((fact) => <article className="border-t border-taupe/45 pt-4" key={fact.title}><h3 className="display-face text-2xl text-charcoal">{fact.title}</h3><p className="mt-2 text-sm leading-6 text-coffee">{fact.body}</p></article>)}
        </div>
      </section>
      <section className="mt-12 grid gap-8 bg-cream p-5 sm:p-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div><h2 className="display-face text-3xl text-charcoal">A matter of shape.</h2><p className="mt-3 text-sm leading-6 text-coffee">The outline of a stone can change how a jewellery piece feels. Explore these familiar shapes while considering your own preferences.</p><ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-charcoal">{shapes.map((shape) => <li className="border-b border-taupe/40 pb-1" key={shape}>{shape}</li>)}</ul></div>
        <div className="photo-well relative aspect-[1.4] overflow-hidden rounded-[12px]"><Image alt={placeholderImages.solitaireRing.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 48vw" src={placeholderImages.solitaireRing.src} /></div>
      </section>
      <section className="mt-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div><h2 className="display-face text-3xl text-charcoal">Certification & care.</h2><p className="mt-3 text-sm leading-6 text-coffee">Certification and care details vary by product. Use the live Shopify listing and any documents supplied with your selected piece.</p></div>
        <div className="border-t border-taupe/45 py-4 text-sm leading-6 text-coffee">Anokhi certification, sourcing and care information will be published when product-specific details are approved.</div>
      </section>
      <div className="mt-8"><Link className="quiet-link pb-1 text-[10px] tracking-[0.14em]" href="/jewellery">EXPLORE JEWELLERY <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
