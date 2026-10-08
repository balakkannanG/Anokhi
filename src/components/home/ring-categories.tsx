"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { motion, useReducedMotion } from "motion/react";
import { TimelessCollection } from "@/components/collection/timeless-collection";
import { AnokhiSignatureCollection } from "@/components/collection/anokhi-signature-collection";
import { PersonalizingCollection } from "@/components/collection/personalizing-collection";

export function AnokhiCollection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Discover Anokhi collections" className="px-4 py-16 sm:px-7 md:py-20 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, amount: 0.4 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <SectionHeading href="/collections" linkLabel="EXPLORE ALL COLLECTIONS" title="DISCOVER THE ANOKHI COLLECTIONS" />
        </motion.div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-11 lg:gap-6">
          <TimelessCollection variant="card" />
          <AnokhiSignatureCollection variant="card" />
          <PersonalizingCollection variant="card" />
        </div>
      </div>
    </section>
  );
}
