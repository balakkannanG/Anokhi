"use client";

import { motion, useReducedMotion } from "motion/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomizationBookingDialog() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-4 py-12 text-charcoal sm:px-7 md:py-16 lg:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="eyebrow text-coffee">Make it yours</p>
          <h2 className="display-face mt-2 text-3xl sm:text-4xl">A piece, personalized for you.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-coffee">
            Tell us what you have in mind and explore a more personal way to wear jewellery.
          </p>
        </motion.div>
        <Dialog>
          <DialogTrigger asChild>
            <motion.button
              className="inline-flex min-h-12 shrink-0 items-center justify-center border border-charcoal px-6 text-xs font-semibold tracking-[0.12em] transition-colors hover:bg-ivory hover:text-anokhi-plum"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: false, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              type="button"
            >
              BOOK A CUSTOMIZATION
            </motion.button>
          </DialogTrigger>
          <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-xl overflow-y-auto border border-taupe/35 bg-parchment p-6 text-charcoal sm:p-8">
            <DialogHeader className="pr-8">
              <p className="eyebrow">Your idea, thoughtfully made</p>
              <DialogTitle className="display-face text-3xl font-normal leading-tight tracking-normal normal-case text-charcoal sm:text-4xl">
                Book a customization
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-coffee">
                Share a few details about the piece you are imagining.
              </DialogDescription>
            </DialogHeader>

            <form aria-label="Customization booking form" className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customization-name">Your name</Label>
                <Input autoComplete="name" disabled id="customization-name" name="name" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="customization-email">Email address</Label>
                  <Input autoComplete="email" disabled id="customization-email" name="email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="customization-phone">Phone number</Label>
                  <Input autoComplete="tel" disabled id="customization-phone" name="phone" type="tel" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customization-piece">What would you like to customize?</Label>
                <select
                  className="h-11 border border-taupe/55 bg-ivory px-3 text-sm text-charcoal outline-none focus:border-anokhi-plum disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                  id="customization-piece"
                  name="piece"
                  defaultValue=""
                >
                  <option disabled value="">Choose a jewellery type</option>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace or pendant</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelet">Bracelet or bangle</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customization-details">Tell us about your idea</Label>
                <textarea
                  className="min-h-28 resize-y border border-taupe/55 bg-ivory p-3 text-sm text-charcoal outline-none focus:border-anokhi-plum disabled:cursor-not-allowed disabled:opacity-50"
                  disabled
                  id="customization-details"
                  name="details"
                />
              </div>
              <p className="text-xs leading-5 text-coffee" role="status">
                Online booking is not available yet. We&apos;ll enable this form once Anokhi&apos;s approved contact details are configured.
              </p>
              <button
                className="min-h-12 bg-anokhi-plum px-5 text-xs font-semibold tracking-[0.12em] text-charcoal opacity-50"
                disabled
                type="submit"
              >
                SEND BOOKING REQUEST
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
