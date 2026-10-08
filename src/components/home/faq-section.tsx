"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqGroups } from "@/lib/constants/faqs";

const questions = faqGroups.flatMap((group) =>
  group.questions.map((item) => ({ ...item, category: group.category })),
);

export function FaqSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="overflow-hidden border-t border-taupe/35 px-4 py-16 sm:px-7 md:py-24 lg:px-10"
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.header
          className="relative self-start lg:sticky lg:top-28"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.35 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 left-0 display-face text-[8rem] leading-none text-taupe/15 sm:-top-16 sm:text-[10rem]"
          >
            FAQ
          </span>
          <div className="relative">
            <p className="eyebrow">A little clarity goes a long way</p>
            <h2
              className="display-face mt-4 max-w-[12ch] text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.08] text-charcoal"
              id="home-faq-heading"
            >
              Good to know.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-coffee">
              From exploring jewellery to finding care details, start with the information you need.
            </p>
            <Link
              className="quiet-link mt-7 inline-flex items-center gap-3 border-b border-taupe/60 pb-2 text-[10px] font-medium tracking-[0.14em] text-charcoal"
              href="/faq"
            >
              VISIT THE HELP CENTRE <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </motion.header>

        <Accordion className="flex flex-col gap-3" collapsible type="single">
          {questions.map((item, index) => (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              key={item.question}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <AccordionItem
                className="rounded-[12px] border border-taupe/35 bg-ivory px-4 transition-colors duration-300 hover:border-taupe/70 sm:px-6"
                value={`faq-${index}`}
              >
                <AccordionTrigger className="gap-4 py-5 text-left font-normal hover:no-underline sm:gap-6 sm:py-6">
                  <span className="flex min-w-0 items-start gap-4 sm:gap-5">
                    <span className="display-face pt-0.5 text-2xl text-taupe">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      {/* <span className="mb-1.5 block text-[9px] font-medium tracking-[0.14em] text-coffee/80">
                        {item.category}
                      </span> */}
                      <span className="display-face block text-lg leading-snug text-charcoal sm:text-xl">
                        {item.question}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="ml-9 max-w-[62ch] pb-5 text-sm leading-7 text-coffee sm:ml-12 sm:pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
