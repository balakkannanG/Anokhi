"use client";

import { Children, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function AnokhiExclusiveHeading() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      className="mb-8 flex flex-col justify-between gap-4 border-b border-taupe/40 pb-5 sm:mb-10 sm:flex-row sm:items-end"
      initial={reduceMotion ? false : { opacity: 0, x: -36 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: false, amount: 0.35 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      <div>
        <p className="eyebrow">A world of Anokhi</p>
        <h2
          className="display-face mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight text-charcoal"
          id="anokhi-exclusive-heading"
        >
          Anokhi Exclusive
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-coffee">
          Six signature jewellery styles, chosen for the moments worth keeping.
        </p>
      </div>
      <Link
        className="quiet-link inline-flex w-fit items-center gap-3 pb-1 text-[10px] font-medium tracking-[0.14em] text-charcoal"
        href="/shop"
      >
        SHOP ALL PRODUCTS <span aria-hidden="true">↗</span>
      </Link>
    </motion.header>
  );
}

export function AnokhiExclusiveProductGrid({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
      {Children.toArray(children).map((child, index) => (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          key={index}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
          }
          viewport={{ once: false, amount: 0.15 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
