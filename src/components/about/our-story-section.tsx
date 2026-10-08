"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { placeholderImages } from "@/lib/constants/placeholder-images";

const storyImages = [
  {
    image: placeholderImages.earrings,
    className: "col-start-1 row-start-1 md:col-start-1 md:row-start-1",
    direction: -28,
  },
  {
    image: placeholderImages.model,
    className: "col-start-2 row-start-1 md:col-start-3 md:row-start-1",
    direction: 28,
  },
];

export function OurStorySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="our-story-heading" className="overflow-hidden  px-4 py-16 sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 items-center gap-x-3 gap-y-8 md:grid-cols-[0.85fr_1.3fr_0.85fr] md:gap-8 lg:gap-14">
        {storyImages.map(({ image, className, direction }, index) => (
          <motion.div
            className={`relative aspect-[0.8] overflow-hidden rounded-[12px] bg-parchment sm:aspect-[0.95] md:aspect-[0.72] ${className}`}
            initial={reduceMotion ? false : { opacity: 0, x: direction, scale: 0.97 }}
            key={image.src}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
          >
            <Image
              alt={image.alt}
              className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.04]"
              fill
              sizes="(max-width: 767px) 46vw, (max-width: 1279px) 28vw, 340px"
              src={image.src}
            />
          </motion.div>
        ))}

        <motion.div
          className="col-span-2 row-start-2 mx-auto max-w-[38rem] py-2 text-center md:col-span-1 md:col-start-2 md:row-start-1 md:py-8"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">The story of Anokhi</p>
          <h2
            className="display-face mx-auto mt-4 max-w-[13ch] text-[clamp(2.3rem,4vw,4rem)] leading-[1.08] text-charcoal"
            id="our-story-heading"
          >
            Made for the moments that become yours.
          </h2>
          <span aria-hidden="true" className="mx-auto mt-6 block h-px w-12 bg-muted-gold" />
          <p className="body-copy mt-6">
            Anokhi brings together fine jewellery for every side of your story. From a piece you reach for every day to one that marks a moment, each design is an invitation to choose what feels like you.
          </p>
          <p className="body-copy mt-4">
            Explore signature collections across rings, earrings, necklaces, pendants, bracelets and more.
          </p>
          <Link
            className="quiet-link mt-7 inline-flex items-center gap-3 border-b border-taupe/60 pb-2 text-xs font-medium tracking-[0.14em] text-charcoal"
            href="/collections"
          >
            DISCOVER OUR COLLECTIONS <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
