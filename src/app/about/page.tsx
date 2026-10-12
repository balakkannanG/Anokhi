import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { OurStorySection } from "@/components/about/our-story-section";
import { MeetTheFounderSection } from "@/components/about/meet-the-founder-section";
import { VisionMissionSection } from "@/components/about/vision-mission-section";
import { AnokhiCodeSection } from "@/components/about/anokhi-code-section";
import { CustomizationBookingDialog } from "@/components/about/customization-booking-dialog";
import { Reveal } from "@/components/ui/reveal";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export const metadata: Metadata = { title: "About Anokhi" };

export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="page-shell pt-6 sm:pt-8"><Breadcrumbs items={[{ label: "Our story" }]} /></div>
      <header className="page-shell grid gap-8 py-10 sm:py-14 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-14">
        <Reveal className="flex flex-col justify-center">
          <h1 className="display-face max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] leading-[1.08] text-charcoal">Designed around moments that matter.</h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">Anokhi is a fine jewellery house bringing together considered designs for every side of your story.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="photo-well relative aspect-[1.2] overflow-hidden rounded-[14px]">
            <Image alt={placeholderImages.craft.alt} className="object-cover" fill priority sizes="(max-width: 767px) 100vw, 60vw" src={placeholderImages.craft.src} />
          </div>
        </Reveal>
      </header>
      <OurStorySection />
      <VisionMissionSection />
      <AnokhiCodeSection />
      <MeetTheFounderSection />
      <CustomizationBookingDialog />
      {/* <section className="bg-cream px-4 py-12 sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2 md:items-center md:gap-14">
          <Reveal>
            <div>
              <h2 className="display-face text-3xl text-charcoal">A considered collection.</h2>
              <p className="mt-4 text-sm leading-7 text-coffee">Explore signature jewellery across rings, earrings, necklaces, pendants, bracelets, bangles and sets—each designed to find its place in your own collection.</p>
              <Link className="quiet-link mt-5 inline-block pb-1 text-[10px] tracking-[0.14em]" href="/jewellery">DISCOVER JEWELLERY <span aria-hidden="true">↗</span></Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="photo-well relative aspect-[1.35] overflow-hidden rounded-[14px]">
              <Image alt={placeholderImages.bridalSet.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 52vw" src={placeholderImages.bridalSet.src} />
            </div>
          </Reveal>
        </div>
      </section> */}
      {/* <section className="page-shell py-14 md:py-20">
        <Reveal>
          <h2 className="display-face max-w-[15ch] text-[clamp(2rem,4vw,3.6rem)] text-charcoal">Craft, shape and diamond details.</h2>
          <p className="mt-4 max-w-[58ch] text-sm leading-7 text-coffee">The details of a piece are part of its story. Anokhi will share product-specific craft, diamond standards, materials and certification information as those details are confirmed.</p>
        </Reveal>
      </section> */}
      {/* <section className="bg-charcoal px-4 py-14 text-ivory sm:px-7 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-7 md:grid-cols-2 md:items-center md:gap-14">
          <Reveal>
            <div className="photo-well relative aspect-[1.2] overflow-hidden rounded-[14px]">
              <Image alt={placeholderImages.model.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 50vw" src={placeholderImages.model.src} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <h2 className="display-face text-3xl">Explore the Anokhi point of view.</h2>
              <p className="mt-4 text-sm leading-6 text-ivory/75">Discover fine jewellery and signature collections for every moment.</p>
              <Link className="mt-6 inline-flex min-h-12 items-center gap-4 bg-anokhi-plum px-5 text-[10px] tracking-[0.14em]" href="/collections">EXPLORE COLLECTIONS <span aria-hidden="true">↗</span></Link>
            </div>
          </Reveal>
        </div>
      </section> */}
    </main>
  );
}
