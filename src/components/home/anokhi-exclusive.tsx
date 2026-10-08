import Image from "next/image";
import Link from "next/link";
import { AnokhiExclusiveProductGrid, AnokhiExclusiveHeading } from "@/components/home/anokhi-exclusive-product-grid";
import { placeholderImages } from "@/lib/constants/placeholder-images";

const exclusivePieces = [
  {
    type: "Rings",
    name: "The Heirloom Solitaire",
    detail: "A luminous centrepiece, made for your forever moments.",
    image: placeholderImages.engagementRing,
  },
  {
    type: "Earrings",
    name: "Sculpted Gold Hoops",
    detail: "An effortless golden glow, from day into evening.",
    image: placeholderImages.earrings,
  },
  {
    type: "Pendants",
    name: "The Lotus Pendant",
    detail: "A delicate keepsake with a quietly distinctive finish.",
    image: placeholderImages.pendant,
  },
  {
    type: "Necklaces",
    name: "Layered Heritage",
    detail: "A graceful statement inspired by timeless artistry.",
    image: placeholderImages.necklace,
  },
  {
    type: "Bracelets",
    name: "The Lumière Bracelet",
    detail: "A refined line of light for every occasion.",
    image: placeholderImages.bracelet,
  },
  {
    type: "Bangles",
    name: "Golden Heirloom Bangles",
    detail: "Traditional detail, reimagined for your own story.",
    image: placeholderImages.bangle,
  },
];

export function AnokhiExclusive() {
  return (
    <section
      aria-labelledby="anokhi-exclusive-heading"
      className="overflow-hidden  px-4 py-16 sm:px-7 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1480px]">
        <AnokhiExclusiveHeading />
        <AnokhiExclusiveProductGrid>
          {exclusivePieces.map((piece, index) => (
            <article className="group min-w-0" key={piece.name}>
              <Link
                aria-label={`Explore ${piece.name} in the ${piece.type} collection`}
                className="block"
                href="/shop"
              >
                <div className="relative aspect-[0.82] overflow-hidden rounded-[12px] bg-ivory">
                  <Image
                    alt={piece.image.alt}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
                    fill
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 16vw"
                    src={piece.image.src}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 transition-colors duration-500 group-hover:from-black/50 group-focus-visible:from-black/50"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/55 bg-parchment/90 px-2.5 py-1.5 text-[8px] tracking-[0.12em] text-charcoal sm:left-4 sm:top-4 sm:text-[9px]">
                    EXCLUSIVE EDIT
                  </span>
                  <span className="display-face absolute bottom-3 right-3 text-xl text-white/85 sm:bottom-4 sm:right-4 sm:text-2xl">
                    0{index + 1}
                  </span>
                </div>
                <div className="pt-4">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-coffee">
                    {piece.type}
                  </p>
                  <h3 className="display-face mt-1.5 truncate text-[17px] leading-snug text-charcoal transition-colors group-hover:text-anokhi-plum sm:text-[19px]">
                    {piece.name}
                  </h3>
                  <p className="mt-2 min-h-10 text-[11px] leading-5 text-coffee sm:text-xs">
                    {piece.detail}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 border-b border-anokhi-plum/40 pb-1 text-[9px] font-medium tracking-[0.14em] text-anokhi-plum">
                    DISCOVER THE EDIT <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </AnokhiExclusiveProductGrid>
   
      </div>
    </section>
  );
}
