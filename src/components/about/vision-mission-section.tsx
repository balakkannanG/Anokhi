"use client";

import { motion, useReducedMotion } from "motion/react";

const statements = [
  {
    number: "01",
    title: "Our Vision",
    text: "To build a community where jewellery becomes a language of individuality — where every person feels seen, understood and celebrated for what makes them rare and real.",
    tone: "bg-anokhi-plum text-ivory",
    detail: "text-ivory/75",
  },
  {
    number: "02",
    title: "Our Mission",
    text: "To create thoughtfully designed diamond jewellery that transforms personal stories, choices and milestones into pieces that feel unmistakably yours.Long-term ambition: Anokhi should grow beyond a jewellery store into a community around individuality, informed jewellery choices,design and meaningful self-expression.",
    tone: "bg-ivory text-charcoal",
    detail: "text-coffee",
  },
];

export function VisionMissionSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="vision-mission-heading" className="px-4 py-16 sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <motion.header
          className="mb-8 max-w-2xl sm:mb-10"
          initial={reduceMotion ? false : { opacity: 0, x: -28 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="eyebrow">What guides us</p>
          <h2
            className="display-face mt-3 text-[clamp(2.2rem,4vw,3.6rem)] leading-tight text-charcoal"
            id="vision-mission-heading"
          >
            Vision &amp; Mission
          </h2>
          <p className="body-copy mt-3 max-w-xl">
            The ideas behind the collections we bring together and the way we want each piece to feel.
          </p>
        </motion.header>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {statements.map((statement, index) => (
            <motion.article
              className={`relative min-h-[270px] overflow-hidden rounded-[14px] p-6 sm:min-h-[310px] sm:p-9 lg:p-11 ${statement.tone}`}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              key={statement.title}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span
                aria-hidden="true"
                className={`display-face absolute -right-1 -top-8 text-[9rem] leading-none opacity-[0.07] sm:-right-2 sm:-top-10 sm:text-[12rem] ${statement.detail}`}
              >
                {statement.number}
              </span>
              <div className="relative flex h-full min-h-[220px] flex-col justify-between sm:min-h-[230px]">
                <p className={`text-xs font-medium uppercase tracking-[0.2em] ${statement.detail}`}>
                  ANOKHI · {statement.number}
                </p>
                <div className="mt-12 max-w-lg">
                  <h3 className="display-face text-3xl sm:text-4xl">{statement.title}</h3>
                  <p className={`mt-4 max-w-[42ch] text-base leading-7 sm:text-lg sm:leading-8 ${statement.detail}`}>
                    {statement.text}
                  </p>
                </div>
                <span aria-hidden="true" className="mt-6 block h-px w-14 bg-muted-gold/80" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
