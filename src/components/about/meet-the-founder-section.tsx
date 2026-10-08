"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export function MeetTheFounderSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="meet-the-founder-heading" className="overflow-hidden  px-4 py-16 sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14 lg:gap-20">
        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0, x: -32 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.2 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-[0.92] overflow-hidden rounded-[14px] bg-parchment sm:aspect-[1.05]">
            <Image
              alt={placeholderImages.craft.alt}
              className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.035]"
              fill
              sizes="(max-width: 767px) 100vw, 46vw"
              src={placeholderImages.craft.src}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-coffee">A glimpse into the Anokhi design world.</p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">The person behind the point of view</p>
          <h2
            className="display-face mt-3 text-[clamp(2.4rem,4.5vw,4.3rem)] leading-[1.08] text-charcoal"
            id="meet-the-founder-heading"
          >
            Meet the founder
          </h2>
          <p className="display-face mt-4 text-xl text-anokhi-plum sm:text-2xl">
            Shifa Khanum
          </p>
          <p className="mt-1 text-sm font-medium tracking-[0.08em] text-coffee">
            Founder &amp; Creative Director
          </p>
          <span aria-hidden="true" className="my-6 block h-px w-14 bg-muted-gold" />
          <div className="space-y-4 text-base leading-7 text-coffee sm:text-lg sm:leading-8">
            <p>
              Shifa Khanum, Founder &amp; Creative Director, is part of Anokhi&apos;s authority and personality. The website shows the thinking behind the brand and selected design stories without making the founder the model for every product.
            </p>
            <p>
              The founder ecosystem and Anokhi ecosystem complement each other: Shii_Unfolds is the founder&apos;s voice, ideas and identity; Anokhi is the jewellery, design world, philosophy and customer experience.
            </p>
            <p>
              The ambition is to build an Anokhi community around individuality, knowledge, design and meaningful jewellery choices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
