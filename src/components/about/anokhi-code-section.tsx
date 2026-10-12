"use client";

import { motion, useReducedMotion } from "motion/react";

const codeEntries = [
  { letter: "A", meaning: "Authentic Self-Expression" },
  { letter: "N", meaning: "Nuance" },
  { letter: "O", meaning: "Originality" },
  { letter: "K", meaning: "Knowledge" },
  { letter: "H", meaning: "Her Choice" },
  { letter: "I", meaning: "Individuality" },
];

export function AnokhiCodeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="anokhi-code-heading" className="bg-cream px-4 py-16 sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <motion.header
          className="mb-8 sm:mb-10"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow">What we stand for</p>
          <h2
            className="display-face mt-3 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-charcoal"
            id="anokhi-code-heading"
          >
            The Anokhi Code
          </h2>
          <p className="body-copy mt-3 max-w-xl">
            Six letters. Six principles that shape how we design, guide and celebrate individuality.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {codeEntries.map((entry, index) => (
            <motion.article
              className="group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory p-6 shadow-[0_22px_70px_-48px_rgba(36,3,42,0.45)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-anokhi-plum/30 hover:shadow-[0_28px_70px_-42px_rgba(36,3,42,0.55)] sm:min-h-[210px] sm:p-7"
              initial={reduceMotion ? false : { opacity: 0, y: 30, x: index % 2 === 0 ? -12 : 12 }}
              key={entry.letter}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.35 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
            >
              <span
                aria-hidden="true"
                className="display-face pointer-events-none absolute -right-1 -top-6 text-[8rem] leading-none text-anokhi-plum/[0.06] transition-transform duration-500 group-hover:scale-105 sm:text-[9rem]"
              >
                {entry.letter}
              </span>
              <div className="relative flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-coffee/70">
                  ANOKHI CODE
                </span>
                <span className="text-xs tabular-nums text-coffee/60">
                  {String(index + 1).padStart(2, "0")} / 06
                </span>
              </div>
              <div className="relative mt-8">
                <span className="display-face block text-5xl leading-none text-anokhi-plum sm:text-6xl">
                  {entry.letter}
                </span>
                <h3 className="mt-4 text-lg font-medium leading-snug text-charcoal sm:text-xl">
                  {entry.meaning}
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="relative mt-6 block h-px w-10 origin-left bg-muted-gold transition-[width] duration-300 group-hover:w-16"
              />
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-5 max-w-3xl text-sm leading-6 text-coffee sm:mt-6 sm:text-base sm:leading-7"
          initial={reduceMotion ? false : { opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          whileInView={{ opacity: 1 }}
        >
          The Code should be displayed in this exact A–N–O–K–H–I order wherever presented as a brand framework.
        </motion.p>
      </div>
    </section>
  );
}
