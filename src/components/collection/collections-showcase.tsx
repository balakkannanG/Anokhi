"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { placeholderImages } from "@/lib/constants/placeholder-images";


const collections = [
  {
    name: "Timeless",
    eyebrow: "The forever edit",
    description: "Enduring jewellery silhouettes, thoughtfully chosen to become part of your story.",
    href: "/collections?collection=timeless",
    image: { src: "/homepage/collections/timeless.png", alt: "A selection of timeless jewellery pieces, including rings, earrings, and necklaces." },
    products: [
      { name: "Aurelia Sculpted Hoops", type: "Gold earrings", price: "₹32,450", description: "A softly sculpted silhouette with an enduring golden glow.", image: placeholderImages.earrings },
      { name: "The Lotus Keepsake", type: "Pendant necklace", price: "₹28,900", description: "A delicate floral motif, made to stay close to the heart.", image: placeholderImages.pendant },
      { name: "Windsor Crown Solitaire", type: "Gold ring", price: "₹85,130", description: "A sculptural crown setting with a luminous centre.", image: placeholderImages.solitaireRing },
      { name: "Noor Heritage Necklace", type: "Gold necklace", price: "₹76,200", description: "A graceful layered line inspired by heirloom forms.", image: placeholderImages.necklace },
      { name: "Harcourt Crown Ring", type: "Diamond ring", price: "₹83,923", description: "A classic ring profile with fine pavé-set shoulders.", image: placeholderImages.weddingRing },
      { name: "Saanvi Line Bracelet", type: "Diamond bracelet", price: "₹42,600", description: "A fine line of light that moves effortlessly through the day.", image: placeholderImages.bracelet },
      { name: "Aadhya Mangalsutra", type: "Mangalsutra", price: "₹61,350", description: "A contemporary expression of a treasured tradition.", image: placeholderImages.bridalSet },
      { name: "Ivory Curl Solitaire", type: "Diamond ring", price: "₹76,519", description: "Softly curved gold embraces a bright solitaire centre.", image: placeholderImages.heroRing },
      { name: "Tara Diamond Band", type: "Diamond ring", price: "₹58,900", description: "A slim, polished band with a delicate line of light.", image: placeholderImages.diamond },
      { name: "Iris Oval Solitaire", type: "Diamond ring", price: "₹100,323", description: "A refined oval centre and a softly tapered band.", image: placeholderImages.diamond },
    ],
  },
  {
    name: "Anokhi Collection",
    eyebrow: "Signature, by Anokhi",
    description: "A considered mix of fine jewellery, shaped by craft, character, and quiet confidence.",
    href: "/collections?collection=anokhi-collection",
      image: { src: "/homepage/collections/anokhi collection.png", alt: "A selection of timeless jewellery pieces, including rings, earrings, and necklaces." },

    products: [
      { name: "Aurelia Gold Hoops", type: "Earrings", price: "₹32,450", description: "Sculpted gold hoops with a softly radiant finish.", image: placeholderImages.earrings },
      { name: "Anokhi Signature Solitaire", type: "Diamond ring", price: "₹68,084", description: "A signature diamond silhouette with a timeless, polished band.", image: placeholderImages.engagementRing },
      { name: "Lotus Bloom Pendant", type: "Pendant", price: "₹28,900", description: "A delicate floral motif suspended on a fine chain.", image: placeholderImages.pendant },
      { name: "Noor Heritage Necklace", type: "Necklace", price: "₹76,200", description: "A graceful layered silhouette inspired by heirloom forms.", image: placeholderImages.necklace },
      { name: "Windsor Crown Solitaire", type: "Gold ring", price: "₹85,130", description: "A sculptural crown setting with a luminous centre.", image: placeholderImages.solitaireRing },
      { name: "Meher Gold Bangle", type: "Bangle", price: "₹54,800", description: "A smooth gold profile detailed with a subtle edge.", image: placeholderImages.bangle },
      { name: "Saanvi Line Bracelet", type: "Bracelet", price: "₹42,600", description: "A light-catching row of stones for day-to-evening wear.", image: placeholderImages.bracelet },
      { name: "Aadhya Mangalsutra", type: "Mangalsutra", price: "₹61,350", description: "A modern take on a treasured symbol, finished in gold.", image: placeholderImages.bridalSet },
      { name: "Ira Oval Solitaire", type: "Diamond ring", price: "₹100,323", description: "A refined oval centre and a softly tapered band.", image: placeholderImages.diamond },
      { name: "Kavya Sculpted Ring", type: "Gold ring", price: "₹48,250", description: "A softly sculptural gold ring with a quietly individual finish.", image: placeholderImages.weddingRing },
    ],
  },
  {
    name: "Personalizing",
    eyebrow: "Made more you",
    description: "Explore distinctive jewellery forms and thoughtful details that make a piece feel personal.",
    href: "/collections?collection=personalizing",
     image: { src: "/homepage/collections/personalizing.png", alt: "A selection of personalised jewellery pieces, including rings, earrings, and necklaces." },

    products: [
      { name: "The Signature Pendant", type: "Personalised necklace", price: "From ₹28,000", description: "A delicate focal piece with a style that feels distinctly yours.", image: placeholderImages.pendant },
      { name: "Petite Halo Studs", type: "Diamond earrings", price: "From ₹32,500", description: "A fine halo silhouette for a subtle, individual sparkle.", image: placeholderImages.earrings },
      { name: "The Signature Solitaire", type: "Custom ring", price: "From ₹68,000", description: "Choose your centre stone and create a ring setting of your own.", image: placeholderImages.engagementRing },
      { name: "Modern Heirloom Chain", type: "Gold necklace", price: "From ₹34,900", description: "A versatile chain to layer, gift or wear as your signature.", image: placeholderImages.necklace },
      { name: "Petite Halo Ring", type: "Custom ring", price: "From ₹72,500", description: "Personalise a delicate halo setting and choose your metal tone.", image: placeholderImages.solitaireRing },
      { name: "The Oval Keepsake", type: "Pendant", price: "From ₹41,000", description: "An oval centre creates a personal mark on a fine chain.", image: placeholderImages.diamond },
      { name: "Twisted Vine Ring", type: "Custom ring", price: "From ₹78,200", description: "Personalise a graceful, nature-inspired ring with your choice of detail.", image: placeholderImages.weddingRing },
      { name: "Pavé Promise Band", type: "Custom ring", price: "From ₹56,800", description: "Personalise a sparkling band as an everyday signature.", image: placeholderImages.engagementRing },
      { name: "Everyday Signet", type: "Gold ring", price: "From ₹49,900", description: "A confident, polished signet with a personal feel.", image: placeholderImages.coupleRings },
      { name: "The Bespoke Keepsake", type: "Custom design", price: "By consultation", description: "Explore a one-to-one conversation about a personal jewellery design.", image: placeholderImages.craft },
    ],
  },
];

export type AnokhiCollectionId = "timeless" | "anokhi-collection" | "personalizing";
type Collection = (typeof collections)[number];

const collectionIds: AnokhiCollectionId[] = ["timeless", "anokhi-collection", "personalizing"];

function CollectionCard({ collection, id }: { collection: Collection; id: AnokhiCollectionId }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-lg"
    >
      <Link
        aria-label={`Explore ${collection.name}. ${collection.description}`}
        className="group relative isolate block aspect-[0.82] overflow-hidden bg-anokhi-plum sm:aspect-[0.76] lg:aspect-[0.82]"
        href={`/collections?collection=${id}`}
      >
        <Image
          alt={collection.image.alt}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 420px"
          src={collection.image.src}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
        />
        <span className="absolute bottom-5 left-5 text-left text-white transition-[opacity,transform] duration-500 ease-out sm:bottom-7 sm:left-7 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
          <span className="display-face block text-2xl lg:text-3xl">{collection.name}</span>
          <span className="mt-2 block max-w-[22rem] text-sm leading-6 text-white/90">
            {collection.description}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export function CollectionsShowcase({
  selectedCollection,
  variant = "full",
}: {
  selectedCollection?: AnokhiCollectionId;
  variant?: "card" | "full";
}) {
  const reduceMotion = useReducedMotion();
  const visibleCollections = collections
    .map((collection, index) => ({ collection, id: collectionIds[index] }))
    .filter(({ id }) => !selectedCollection || id === selectedCollection);

  if (variant === "card") {
    return (
      <>
        {visibleCollections.map(({ collection, id }) => (
          <CollectionCard collection={collection} id={id} key={id} />
        ))}
      </>
    );
  }

  return (
    <div className="space-y-16 pb-16 sm:space-y-20 sm:pb-24">
      {visibleCollections.map(({ collection, id }, collectionIndex) => (
        <section
          aria-labelledby={`collection-${id}-heading`}
          className="page-shell"
          key={collection.name}
        >
          <motion.div
            className="relative isolate min-h-[260px] overflow-hidden rounded-xl bg-anokhi-plum sm:min-h-[340px] lg:min-h-[400px]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt={collection.image.alt}
              className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.025]"
              fill
              priority={collectionIndex === 0}
              sizes="(max-width: 767px) 100vw, 92vw"
              src={collection.image.src}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 lg:p-14">
              <div className="max-w-2xl text-center text-white">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/85 sm:text-sm">
                  {collection.eyebrow}
                </p>
                <h2
                  className="display-face mt-3 text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]"
                  id={`collection-${id}-heading`}
                >
                  {collection.name}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  {collection.description}
                </p>
                <Link
                  className="mt-6 inline-flex min-h-12 items-center gap-3 border border-white/70 px-5 text-xs font-medium tracking-[0.14em] transition-colors hover:bg-white hover:text-anokhi-plum"
                  href={collection.href}
                >
                  EXPLORE {collection.name.toUpperCase()} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mb-5 mt-8 flex items-end justify-between gap-4 border-b border-taupe/40 pb-4 sm:mb-6 sm:mt-10">
            <div>
              <p className="eyebrow">A curated selection</p>
              <h3 className="display-face mt-2 text-2xl text-charcoal sm:text-3xl">
                Pieces to make your own
              </h3>
            </div>
            <span className="hidden pb-1 text-sm text-coffee sm:block">10 designs</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-10">
            {collection.products.map((product, productIndex) => (
              <motion.article
                className="group min-w-0"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                key={product.name}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.55,
                        delay: (productIndex % 5) * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                viewport={{ once: false, amount: 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative aspect-[0.92] overflow-hidden rounded-lg bg-ivory">
                  <Image
                    alt={product.image.alt}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    fill
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 18vw"
                    src={product.image.src}
                  />
                </div>
                <div className="pt-3">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-coffee">{product.type}</p>
                  <h4 className="display-face mt-1.5 min-h-[2.8rem] text-base leading-6 text-charcoal sm:text-lg sm:leading-7">
                    {product.name}
                  </h4>
                  <p className="mt-1 min-h-[3rem] text-sm leading-6 text-coffee">{product.description}</p>
                  <p className="mt-2 text-base font-medium text-charcoal">{product.price}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-9 flex justify-center">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-anokhi-plum px-7 text-xs font-medium tracking-[0.14em] text-anokhi-plum transition-colors hover:bg-anokhi-plum hover:text-ivory"
              href={collection.href}
            >
              VIEW MORE <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
