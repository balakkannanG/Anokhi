"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const categoryImages = {
  Rings: "/homepage/category/rings.png",
  Earrings: "/homepage/category/earrings.png",
  Pendants: "/homepage/category/pendants.png",
  Bracelets: "/homepage/category/bracelets.png",
  Necklaces: "/homepage/category/necklsaces.png",
  "Men's Rings": "/homepage/category/men's ring.png",
  "Men's Studs": "/homepage/category/men's studs.png",
} as const;

const categories = [
  {
    label: "Rings",
    description: "An everyday promise, made entirely your own.",
    href: "/rings",
    image: { src: categoryImages.Rings, alt: "Rings category" },
    featured: true,
  },
  {
    label: "Earrings",
    description: "A little light to frame your face.",
    href: "/collections/earrings",
    image: { src: categoryImages.Earrings, alt: "Earrings category" },
  },
  {
    label: "Pendants",
    description: "A meaningful detail, close to your heart.",
    href: "/collections/pendants",
    image: { src: categoryImages.Pendants, alt: "Pendants category" },
  },
  // {
  //   label: "Mangalsutras",
  //   description: "A cherished tradition, beautifully reimagined.",
  //   href: "/collections/mangalsutras",
  //   image: { src: categoryImages.Bracelets, alt: "Mangalsutras category" },
  // },
  {
    label: "Bracelets",
    description: "An elegant finishing touch for every day.",
    href: "/collections/bracelets",
    image: { src: categoryImages.Bracelets, alt: "Bracelets category" },
  },
  {
    label: "Necklaces",
    description: "A graceful statement for your own story.",
    href: "/collections/necklaces",
    image: { src: categoryImages.Necklaces, alt: "Necklaces category" },
  },
  {
    label: "Men's Rings",
    description: "Distinctive design with a confident edge.",
    href: "/collections/mens-rings",
    image: { src: categoryImages["Men's Rings"], alt: "Men's Rings category" },
  },
  // {
  //   label: "Nosepins",
  //   description: "A delicate accent with unmistakable character.",
  //   href: "/collections/nosepins",
  //   image: { src: categoryImages.Rings, alt: "Nosepins category" },
  // },
  {
    label: "Men's Studs",
    description: "A subtle signature, crafted to stand apart.",
    href: "/collections/mens-studs",
    image: { src: categoryImages["Men's Studs"], alt: "Men's Studs category" },
  },
];

export function JewelleryCategories() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="jewellery-categories-title"
      className="overflow-hidden  px-4 py-16 sm:px-7 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-[1480px]">
        <motion.header
          className="mb-7 flex flex-col justify-between gap-4 border-b border-taupe/40 pb-5 sm:mb-9 sm:flex-row sm:items-end"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.35 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div>
            <p className="eyebrow">Find your signature</p>
            <h2
              className="display-face mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight text-charcoal"
              id="jewellery-categories-title"
            >
              Shop by category
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-coffee sm:text-lg">
              Some pieces simply feel like you. Explore diamond jewellery you see yourself in.
            </p>
          </div>
          <Link
            className="quiet-link inline-flex w-fit items-center gap-3 pb-1 text-[10px] font-medium tracking-[0.14em] text-charcoal"
            href="/jewellery"
          >
            EXPLORE ALL JEWELLERY <span aria-hidden="true">↗</span>
          </Link>
        </motion.header>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:auto-rows-[minmax(190px,18vw)] lg:grid-cols-6 lg:gap-3.5">
          {categories.map((category, index) => (
            <motion.div
              className={category.featured ? "col-span-3 lg:row-span-2" : undefined}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              key={category.label}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.12 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link
                aria-label={`Explore ${category.label}: ${category.description}`}
                className="group relative isolate block h-full min-h-40 overflow-hidden rounded-[10px] bg-anokhi-plum lg:min-h-0"
                href={category.href}
              >
                <Image
                  alt={category.image.alt}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
                  fill
                  sizes={
                    category.featured
                      ? "(max-width: 639px) 94vw, (max-width: 1023px) 64vw, 50vw"
                      : "(max-width: 639px) 46vw, (max-width: 1023px) 31vw, 17vw"
                  }
                  src={category.image.src}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-colors duration-500 group-hover:bg-black/40 group-focus-visible:bg-black/40"
                />
                <span className="absolute bottom-0 left-0 right-0 p-3 text-white sm:p-4 lg:p-5">
                  <span
                    className={`display-face block leading-tight tracking-[0.08em] ${
                      category.featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-sm sm:text-lg"
                    }`}
                  >
                    {category.label}
                  </span>
                  <span
                    className={`mt-2 block overflow-hidden text-sm leading-5 text-white transition-all duration-500 sm:text-base sm:leading-6 ${
                      category.featured
                        ? "max-h-10 opacity-100"
                        : "max-h-0 translate-y-2 opacity-0 group-hover:max-h-10 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:max-h-10 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    }`}
                  >
                    {category.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 grid size-8 translate-y-1 place-items-center rounded-full border border-white/70 text-sm text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:right-4 sm:top-4"
                >
                  ↗
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
