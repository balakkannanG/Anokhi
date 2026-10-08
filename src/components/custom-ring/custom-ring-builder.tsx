"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "@/components/ui/icons";
import { placeholderImages } from "@/lib/constants/placeholder-images";

const steps = [
  { name: "Ring style", choices: ["Solitaire", "Halo", "Three stone"] },
  { name: "Diamond shape", choices: ["Round", "Oval", "Emerald", "Pear"] },
  { name: "Diamond", choices: ["Explore options", "I have a diamond"] },
  { name: "Carat", choices: ["Choose later", "Discuss with Anokhi"] },
  { name: "Colour", choices: ["Choose later", "Discuss with Anokhi"] },
  { name: "Clarity", choices: ["Choose later", "Discuss with Anokhi"] },
  { name: "Setting", choices: ["Classic", "Modern", "Choose later"] },
  { name: "Metal", choices: ["Yellow gold", "White gold", "Rose gold", "Platinum"] },
  { name: "Ring size", choices: ["Choose later", "View size guide"] },
  { name: "Engraving", choices: ["No engraving", "Discuss with Anokhi"] },
  { name: "Review", choices: ["Review selected options"] },
];

export function CustomRingBuilder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();
  const step = steps[stepIndex];

  function choose(value: string) {
    setChoices((current) => ({ ...current, [step.name]: value }));
  }

  const next = () => setStepIndex((current) => Math.min(steps.length - 1, current + 1));
  const previous = () => setStepIndex((current) => Math.max(0, current - 1));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
      <div className="lg:sticky lg:top-6">
        <div className="photo-well relative aspect-[1.12] overflow-hidden rounded-[14px] bg-cream sm:aspect-[1.25]">
          <Image alt={placeholderImages.solitaireRing.alt} className="object-cover" fill priority sizes="(max-width: 1023px) 100vw, 58vw" src={placeholderImages.solitaireRing.src} />
        </div>
        <p className="mt-3 text-[10px] text-coffee">Illustrative image. Preview is not a live product configurator.</p>
      </div>
      <div className="min-w-0 rounded-[14px] bg-cream p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div><p className="eyebrow">Ring configuration</p><p className="mt-1 text-xs text-coffee">Step {stepIndex + 1} of {steps.length}</p></div>
          <span className="text-xs text-coffee">Price not available</span>
        </div>
        <div aria-label="Custom ring steps" className="mt-4 flex gap-1.5" role="progressbar" aria-valuemax={steps.length} aria-valuemin={1} aria-valuenow={stepIndex + 1}>
          {steps.map((item, index) => <span className={`h-1 flex-1 ${index <= stepIndex ? "bg-anokhi-plum" : "bg-taupe/35"}`} key={item.name} />)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="min-h-[14rem] pt-7"
            exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            key={step.name}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="display-face text-2xl text-charcoal sm:text-3xl">{step.name}</h2>
            <p className="mt-2 text-sm leading-6 text-coffee">{step.name === "Review" ? "Review the choices you have explored." : "Choose a starting point or leave this detail for later."}</p>
            {step.name !== "Review" ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {step.choices.map((choice) => {
                  const active = choices[step.name] === choice;
                  return (
                    <button aria-pressed={active} className={`inline-flex min-h-11 items-center gap-2 border px-4 text-xs ${active ? "border-anokhi-plum bg-anokhi-plum text-ivory" : "border-taupe/60 bg-ivory text-charcoal hover:border-anokhi-plum"}`} key={choice} onClick={() => choose(choice)} type="button">
                      {active ? <Check aria-hidden="true" className="size-3.5" weight="light" /> : null}{choice}
                    </button>
                  );
                })}
              </div>
            ) : (
              <dl className="mt-5 space-y-3 border-t border-taupe/40 pt-4 text-sm">
                {steps.slice(0, -1).map((item) => <div className="flex justify-between gap-4" key={item.name}><dt className="text-coffee">{item.name}</dt><dd className="text-right text-charcoal">{choices[item.name] || "Not selected"}</dd></div>)}
                <div className="flex justify-between gap-4 border-t border-taupe/35 pt-3"><dt className="text-coffee">Price</dt><dd className="text-right text-charcoal">To be confirmed by Anokhi</dd></div>
              </dl>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-taupe/40 pt-4">
          <button className="inline-flex min-h-11 items-center gap-2 text-xs text-charcoal disabled:opacity-40" disabled={stepIndex === 0} onClick={previous} type="button"><ArrowLeft aria-hidden="true" className="size-4" weight="light" /> Back</button>
          {stepIndex < steps.length - 1 ? <button className="inline-flex min-h-11 items-center gap-3 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.12em] text-ivory" onClick={next} type="button">CONTINUE <ArrowRight aria-hidden="true" className="size-4" weight="light" /></button> : <Link className="inline-flex min-h-11 items-center bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.12em] text-ivory" href="/contact">ENQUIRE ABOUT YOUR OPTIONS</Link>}
        </div>
        <p className="mt-4 text-[10px] leading-5 text-coffee">This concept is not connected to variant pricing or inventory. Final selections, availability and pricing must be confirmed by Anokhi.</p>
      </div>
    </div>
  );
}
