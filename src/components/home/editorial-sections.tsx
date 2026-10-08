import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { GsapReveal } from "@/components/ui/gsap-reveal";
import { Reveal } from "@/components/ui/reveal";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export function PromotionBanner() {
  return (
    <section className="grid bg-cream lg:min-h-[32rem] lg:grid-cols-[1fr_1fr]">
      <div className="photo-well relative min-h-[18rem] lg:min-h-[32rem]">
        <Image alt={placeholderImages.solitaireRing.alt} className="object-cover" fill sizes="(max-width: 1023px) 100vw, 50vw" src={placeholderImages.solitaireRing.src} />
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-[11%] lg:py-16">
        <h2 className="display-face max-w-[12ch] text-[clamp(2.1rem,4.3vw,4rem)] leading-[1.12] text-charcoal">
          Every story begins somewhere.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-6 text-coffee">
          Explore the designs and details that inspire the Anokhi collections.
        </p>
        <Link className="mt-7 inline-flex min-h-12 w-fit items-center gap-5 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.14em] text-ivory transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0" href="/collections">
          EXPLORE COLLECTIONS <ArrowUpRight aria-hidden="true" className="size-4" weight="light" />
        </Link>
      </div>
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="px-4 py-16 sm:px-7 md:py-24 lg:px-10" id="story">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-14 lg:gap-20">
        <Reveal>
          <div className="photo-well relative aspect-[1.06] overflow-hidden rounded-[14px] bg-cream">
            <Image alt={placeholderImages.craft.alt} className="object-cover" fill sizes="(max-width: 767px) 100vw, 46vw" src={placeholderImages.craft.src} />
          </div>
        </Reveal>
        <GsapReveal>
          <div>
            <h2 className="display-face max-w-[13ch] text-[clamp(2rem,4vw,3.7rem)] leading-[1.13] text-charcoal">
              Designed around the moments that matter.
            </h2>
            <p className="mt-5 max-w-[38rem] text-sm leading-7 text-coffee">
              At Anokhi, jewellery is more than a finishing touch. It marks the stories we carry forward. Our point of view begins with thoughtful design, then follows the details that make each piece feel personal.
            </p>
            <Link className="quiet-link mt-6 inline-block pb-1 text-[10px] font-medium tracking-[0.14em] text-charcoal" href="/about">
              A LITTLE MORE ABOUT ANOKHI <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </GsapReveal>
      </div>
      <div aria-hidden="true" className="mx-auto mt-16 max-w-[1320px] border-t border-taupe/45 pt-8 text-center sm:mt-24">
        <span className="display-face text-[clamp(2.3rem,8vw,6.5rem)] leading-none text-taupe/30">CRAFT & CARE</span>
      </div>
    </section>
  );
}

const principles = [
  { title: "Designed with intention", copy: "Explore considered jewellery styles, from everyday signatures to meaningful occasion pieces." },
  { title: "Detail that matters", copy: "Find a silhouette and finish that feels right for the moment you are marking." },
  { title: "Room for your story", copy: "Build a personal collection across rings, earrings, necklaces and more." },
];

export function WhyAnokhi() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-[1180px] gap-9 md:grid-cols-[0.78fr_1.22fr] md:gap-16">
        <div>
          <h2 className="display-face max-w-[12ch] text-[clamp(2rem,4vw,3.6rem)] leading-[1.12] text-charcoal">
            A point of view, shaped by craft.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">
            Anokhi brings fine jewellery together across thoughtfully designed collections for every expression.
          </p>
        </div>
        <div className="divide-y divide-taupe/40 border-t border-taupe/40">
          {principles.map((principle, index) => (
            <Reveal delay={index * 0.08} key={principle.title}>
              <article className="grid gap-2 py-5 sm:grid-cols-[0.5fr_1fr] sm:gap-8 sm:py-6">
                <h3 className="display-face text-[19px] text-charcoal sm:text-[21px]">{principle.title}</h3>
                <p className="text-sm leading-6 text-coffee">{principle.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const fourCs = [
  { title: "Cut", copy: "How proportions and finish help a diamond return light." },
  { title: "Colour", copy: "The degree of tint visible in a diamond." },
  { title: "Clarity", copy: "The natural inclusions and features within a stone." },
  { title: "Carat", copy: "A measure of a diamond's weight, not its face-up size alone." },
];

export function DiamondEducationPreview() {
  return (
    <section className="px-4 py-16 sm:px-7 md:py-24 lg:px-10" id="diamond-guide">
      <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
        <div>
          <h2 className="display-face max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.14] text-charcoal">
            A closer look at diamonds.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">
            Each diamond has its own character. The 4Cs can help you understand the details behind its appearance.
          </p>
          <Link className="quiet-link mt-6 inline-block pb-1 text-[10px] font-medium tracking-[0.14em] text-charcoal" href="/diamond-education">
            EXPLORE DIAMOND EDUCATION <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-[15px] border border-taupe/45 bg-ivory p-3 sm:gap-4 sm:p-4">
          <div className="photo-well relative col-span-2 aspect-[1.9] overflow-hidden rounded-[10px] sm:aspect-[2.4]">
            <Image alt={placeholderImages.diamond.alt} className="object-cover" fill sizes="(max-width: 1023px) 100vw, 62vw" src={placeholderImages.diamond.src} />
          </div>
          {fourCs.map((item) => (
            <article className="border-t border-taupe/45 pt-3 sm:pt-4" key={item.title}>
              <h3 className="display-face text-lg text-charcoal sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-[11px] leading-5 text-coffee sm:text-xs">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomRingPreview() {
  return (
    <section className="overflow-hidden bg-anokhi-plum px-4 pb-16 pt-16 sm:px-7 md:pb-24 md:pt-24 lg:px-10" id="customise">
      <div className="mx-auto grid max-w-[1240px] items-center gap-6 md:grid-cols-[0.92fr_1.08fr] md:gap-10">
        <div className="text-white">
          <h2 className="display-face max-w-[12ch] text-[clamp(2.1rem,4.5vw,4rem)] leading-[1.12]">
            Make it unmistakably yours.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white">
            Start with a ring style, then explore the details you would like to make your own.
          </p>
          <Link className="mt-6 inline-flex min-h-12 items-center gap-5 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.14em] text-ivory" href="/customise-your-ring">
            EXPLORE CUSTOM RINGS <ArrowUpRight aria-hidden="true" className="size-4" weight="light" />
          </Link>
        </div>
        <Link aria-label="Explore ring customisation" className="group block" href="/customise-your-ring">
          <div className="overflow-hidden rounded-[16px] bg-cream p-2.5 sm:p-3">
            <div className="photo-well relative aspect-[1.15] overflow-hidden rounded-[12px] bg-ivory">
              <Image alt={placeholderImages.solitaireRing.alt} className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]" fill sizes="(max-width: 767px) 100vw, 55vw" src={placeholderImages.solitaireRing.src} />
            </div>
            <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-4 text-charcoal sm:px-4 sm:pb-3">
              <div>
                <span className="eyebrow">A visual concept</span>
                <h3 className="display-face mt-1 text-xl sm:text-2xl">Begin with a setting.</h3>
              </div>
              <ArrowUpRight aria-hidden="true" className="mb-1 size-5 text-anokhi-plum" weight="light" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function RingBuyingGuide() {
  const guides = [
    { title: "Start with a ring style", description: "Explore the silhouettes and settings.", href: "/rings" },
    { title: "Understand the diamond", description: "A simple introduction to the 4Cs.", href: "/diamond-education" },
    { title: "Find your size", description: "Use the ring size guide to compare measurements.", href: "/ring-size-guide" },
  ];
  return (
    <section className="px-4 py-16 sm:px-7 md:py-24 lg:px-10" id="buying-guide">
      <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[0.78fr_1.22fr] md:gap-14">
        <div>
          <h2 className="display-face max-w-[12ch] text-[clamp(2rem,4vw,3.5rem)] leading-[1.13] text-charcoal">A guide to choosing your ring.</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">Take each decision at your own pace, from the style you love to the details you want to understand.</p>
        </div>
        <div className="border-t border-taupe/45">
          {guides.map((guide) => (
            <Link className="group flex items-center justify-between gap-4 border-b border-taupe/30 py-4" href={guide.href} key={guide.title}>
              <span>
                <span className="display-face block text-[18px] text-charcoal">{guide.title}</span>
                <span className="mt-1 block text-[11px] leading-5 text-coffee">{guide.description}</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-taupe transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" weight="light" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedTestimonial() {
  return (
    <section className="bg-cream px-4 py-14 sm:px-7 md:py-20 lg:px-10" aria-labelledby="customer-stories-heading">
      <div className="mx-auto grid max-w-[1040px] items-center gap-7 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <div className="photo-well relative mx-auto aspect-[0.92] w-full max-w-[21rem] overflow-hidden rounded-[14px] bg-parchment md:max-w-none">
          <Image alt={placeholderImages.model.alt} className="object-cover" fill sizes="(max-width: 767px) 80vw, 38vw" src={placeholderImages.model.src} />
        </div>
        <div>
          <h2 className="display-face text-[clamp(1.9rem,4vw,3rem)] leading-tight text-charcoal" id="customer-stories-heading">Moments to tell.</h2>
          <p className="display-face mt-5 max-w-[27ch] text-[clamp(1.45rem,3vw,2.1rem)] leading-[1.4] text-charcoal">
            Anokhi customer stories will take their place here.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-coffee">
            We will share customer words when approved stories are available.
          </p>
          <p className="eyebrow mt-5">Customer story content pending approval</p>
        </div>
      </div>
    </section>
  );
}

export function SocialGallery() {
  const photos = [placeholderImages.heroRing, placeholderImages.engagementRing, placeholderImages.earrings, placeholderImages.bridalSet];
  return (
    <section className="px-4 py-14 sm:px-7 md:py-20 lg:px-10" aria-labelledby="social-gallery-heading">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex items-end justify-between gap-5">
          <div>
            <h2 className="display-face text-[clamp(1.8rem,4vw,2.7rem)] text-charcoal" id="social-gallery-heading">Anokhi, in moments.</h2>
            <p className="mt-2 text-xs leading-5 text-coffee">Editorial imagery for the visual concept, not customer photographs.</p>
          </div>
          <span aria-label="Instagram" className="display-face hidden text-sm text-anokhi-plum sm:block">SOCIAL</span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {photos.map((photo, index) => (
            <div className="photo-well relative aspect-square overflow-hidden rounded-[8px] bg-cream sm:rounded-[12px]" key={`${photo.src}-${index}`}>
              <Image alt={photo.alt} className="object-cover" fill sizes="(max-width: 640px) 23vw, 24vw" src={photo.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JournalFeature() {
  return (
    <section className="bg-ivory px-4 py-14 sm:px-7 md:py-20 lg:px-10" id="journal">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading title="Notes on adornment" description="A place to begin learning about the details that shape fine jewellery." />
        <article className="mt-7 grid items-center gap-6 sm:grid-cols-[0.86fr_1.14fr] sm:gap-10">
          <Link aria-label="Read about diamonds" className="photo-well relative block aspect-[1.16] overflow-hidden rounded-[12px]" href="/diamond-education">
            <Image alt={placeholderImages.diamond.alt} className="object-cover" fill sizes="(max-width: 639px) 100vw, 45vw" src={placeholderImages.diamond.src} />
          </Link>
          <div>
            <p className="eyebrow">Diamond education</p>
            <h3 className="display-face mt-3 max-w-[20ch] text-[clamp(1.7rem,3.5vw,2.7rem)] leading-tight text-charcoal">A first look at the 4Cs.</h3>
            <p className="mt-3 max-w-[32rem] text-sm leading-6 text-coffee">Explore cut, colour, clarity and carat, and learn how these terms describe different aspects of a diamond.</p>
            <Link className="quiet-link mt-5 inline-block pb-1 text-[10px] font-medium tracking-[0.14em] text-charcoal" href="/diamond-education">READ THE GUIDE <span aria-hidden="true">↗</span></Link>
          </div>
        </article>
      </div>
    </section>
  );
}
