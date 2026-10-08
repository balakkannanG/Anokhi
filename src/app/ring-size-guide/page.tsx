import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export const metadata: Metadata = { title: "Ring Size Guide" };

const steps = [
  { title: "Choose the right time", text: "Measure when your hands are at a comfortable, typical temperature." },
  { title: "Measure the finger", text: "Use a flexible measuring tape or a strip of paper, wrapped snugly where the ring will sit." },
  { title: "Compare carefully", text: "If you use paper, mark where it meets, then measure the length against a ruler." },
];

export default function RingSizeGuidePage() {
  return (
    <main className="page-shell pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Ring Size Guide" }]} />
      <header className="grid gap-7 py-10 sm:py-14 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12">
        <div><h1 className="display-face max-w-[11ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.08] text-charcoal">Find a comfortable fit.</h1><p className="mt-4 max-w-lg text-sm leading-6 text-coffee">A few careful steps can help you start a sizing conversation.</p></div>
        <div className="photo-well relative aspect-[1.35] overflow-hidden rounded-[14px] bg-cream"><Image alt={placeholderImages.engagementRing.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 55vw" src={placeholderImages.engagementRing.src} /></div>
      </header>
      <section>
        <h2 className="display-face mb-6 text-3xl text-charcoal">How to measure</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => <article className="border-t border-taupe/45 pt-4" key={step.title}><h3 className="display-face text-xl text-charcoal">{step.title}</h3><p className="mt-2 text-sm leading-6 text-coffee">{step.text}</p></article>)}
        </div>
      </section>
      <section className="mt-12 grid gap-6 bg-cream p-5 sm:p-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">
        <div><h2 className="display-face text-2xl text-charcoal">Size conversion chart</h2><p className="mt-3 text-sm leading-6 text-coffee">The approved Indian and international ring size conversion chart has not yet been supplied.</p></div>
        <div className="border border-taupe/45 bg-ivory p-5 sm:p-8" role="status">
          <p className="eyebrow">Sizing information pending</p>
          <p className="mt-3 text-sm leading-6 text-coffee">Please confirm your size with Anokhi before ordering. Conversion values will be added here after review by the client.</p>
          <Link className="quiet-link mt-4 inline-block pb-1 text-[10px] tracking-[0.14em] text-charcoal" href="/contact">CONTACT ANOKHI <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section className="mt-12"><h2 className="display-face text-3xl text-charcoal">A few helpful reminders</h2><ul className="mt-5 grid gap-4 sm:grid-cols-2"><li className="border-t border-taupe/40 pt-3 text-sm leading-6 text-coffee">Measure more than once to compare your results.</li><li className="border-t border-taupe/40 pt-3 text-sm leading-6 text-coffee">A wider band may feel different from a narrow ring.</li><li className="border-t border-taupe/40 pt-3 text-sm leading-6 text-coffee">If the ring is a gift, seek a quiet sizing suggestion from someone close to the wearer.</li><li className="border-t border-taupe/40 pt-3 text-sm leading-6 text-coffee">Use confirmed size options when choosing a product variant.</li></ul></section>
    </main>
  );
}
