"use client";

import { motion, useReducedMotion } from "motion/react";

const promises = [
  {
    icon: "diamond",
    title: "Considered diamonds",
    description: "Explore a thoughtful edit of stones, settings and ring styles.",
  },
  {
    icon: "certificate",
    title: "Clear product details",
    description: "Find the details you need to make a choice that feels like yours.",
  },
  {
    icon: "personal",
    title: "Made more personal",
    description: "Shape your design with options in our custom ring builder.",
  },
  {
    icon: "returns",
    title: "Straightforward policies",
    description: "Review the latest shipping and returns information before you order.",
  },
  {
    icon: "secure",
    title: "Secure checkout",
    description: "Payment and order confirmation are completed securely on Shopify.",
  },
  {
    icon: "delivery",
    title: "Delivery, made clear",
    description: "Shipping and applicable charges are calculated at checkout.",
  },
];

type PromiseIconName = (typeof promises)[number]["icon"];

function PromiseIcon({ name }: { name: PromiseIconName }) {
  const shared = {
    "aria-hidden": true as const,
    className: "size-12",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.5,
    viewBox: "0 0 32 32",
  };

  switch (name) {
    case "diamond":
      return <svg {...shared}><path d="M7 5h18l5 8-14 15L2 13l5-8Z" /><path d="m2 13 28 0M7 5l4 8 5 15 5-15 4-8M11 13h10" /></svg>;
    case "certificate":
      return <svg {...shared}><circle cx="16" cy="13" r="10" /><circle cx="16" cy="13" r="6" /><path d="m12 22-2 8 6-3 6 3-2-8m-7-9 2 2 4-5" /></svg>;
    case "personal":
      return <svg {...shared}><path d="m16 3 2.4 7.1L25 13l-6.6 2.4L16 22l-2.4-6.6L7 13l6.6-2.9L16 3Z" /><path d="m25 20 .9 2.6L29 24l-3.1 1.1L25 28l-1.1-2.9L21 24l2.9-1.4L25 20Z" /></svg>;
    case "returns":
      return <svg {...shared}><path d="M7 10a11 11 0 1 1-1 10M3 10h5V5" /><path d="m13 14 6-3 6 3-6 3-6-3Zm0 0v7l6 3 6-3v-7m-6 3v7" /></svg>;
    case "secure":
      return <svg {...shared}><path d="M16 3 27 7v8c0 7-4.7 11.8-11 14-6.3-2.2-11-7-11-14V7l11-4Z" /><path d="m11 16 3.5 3.5L21 13" /></svg>;
    case "delivery":
      return <svg {...shared}><path d="M3 8h16v15H3zM19 13h6l4 5v5h-10" /><circle cx="9" cy="24" r="2.5" /><circle cx="24" cy="24" r="2.5" /><path d="M7 12h8m-10 3h8" /></svg>;
  }
}

export function AnokhiPromise() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="anokhi-promise-heading"
      className="overflow-hidden border-y border-taupe/35 px-4 py-14 sm:px-7 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <motion.header
          className="mx-auto max-w-xl text-center"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.4 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="eyebrow">The details that matter</p>
          <h2
            className="display-face mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-tight text-charcoal"
            id="anokhi-promise-heading"
          >
            The Anokhi promise
          </h2>
          <p className="mt-3 text-sm leading-6 text-coffee">
            A little more clarity and care, from choosing your ring to its arrival.
          </p>
        </motion.header>

        <ul className="mt-10 grid grid-cols-2 border-t border-taupe gap-6 sm:mt-12 sm:grid-cols-3 lg:grid-cols-6">
          {promises.map(({ icon, title, description }, index) => (
            <motion.li
              className="group border-b border-taupe px-3 py-7 text-center  sm:px-5 lg:border-b-0 lg:border-l lg:px-4 lg:py-8 lg:first:border-l-0"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              key={title}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mx-auto flex size-18 items-center justify-center rounded-full  border border-taupe bg-parchment text-anokhi-plum transition-colors duration-300 group-hover:border-anokhi-plum/45 group-hover:bg-ivory">
                <PromiseIcon name={icon} />
              </div>
              {/* <span className="mt-4 block text-[9px] font-medium tracking-[0.16em] text-taupe">
                0{index + 1}
              </span> */}
              <h3 className="display-face mt-1.5 text-xl leading-snug text-charcoal">
                {title}
              </h3>
              <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-5 text-coffee">
                {description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
