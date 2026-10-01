"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/constants/images";

export function IntroCanvas() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section aria-labelledby="home-hero-title" className="hero-stage relative isolate overflow-hidden bg-[#1d181b]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.35, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={placeholderImages.heroRing}
            alt="A diamond ring with a sculpted halo setting"
            fill
            priority
            loading="eager"
            unoptimized
            sizes="100vw"
            className="hero-photo object-cover object-[62%_50%]"
          />
          <div className="hero-shade absolute inset-0" />
          <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 sm:flex lg:bottom-9 lg:right-12">
            <span className="h-px w-8 bg-white/60" />
            Anokhi signature · 01 / 04
          </div>
        </motion.div>

        <div className="site-frame hero-content relative z-10 flex min-h-[inherit] items-end pb-10 pt-16 sm:items-center sm:py-16 lg:py-20">
          <div className="max-w-[700px] pb-2 sm:pb-8">
          <motion.p
            {...reveal}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 sm:mb-7"
          >
            <span className="h-px w-8 bg-white/65" />
            Rings for the moments that stay
          </motion.p>
          <motion.h1
            id="home-hero-title"
            {...reveal}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial max-w-none text-[clamp(42px,8.3vw,112px)] leading-[0.84] text-white"
          >
            <span className="block whitespace-nowrap">A RING WORTH</span>
            <span className="block whitespace-nowrap text-white/80">REMEMBERING</span>
          </motion.h1>
          <motion.p
            {...reveal}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[38ch] text-[13px] leading-6 text-white/78 sm:mt-7 sm:text-[15px] sm:leading-7"
          >
            Timeless jewellery designed for unforgettable moments.
          </motion.p>
          <motion.div
            {...reveal}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-9"
          >
            <Link
              href="/rings"
              className="hero-primary group inline-flex min-h-12 items-center gap-6 bg-white px-5 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Explore rings
              <span className="grid size-7 place-items-center rounded-full bg-[var(--lavender)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                <ArrowRight size={14} weight="light" className="text-[var(--anokhi)]" />
              </span>
            </Link>
            <Link
              href="/jewellery"
              className="group inline-flex items-center gap-2 border-b border-white/45 py-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:border-white hover:text-white"
            >
              Discover jewellery
              <ArrowDownRight size={14} weight="light" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 hidden items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-white/65 sm:flex"
          >
            <span className="h-px w-8 bg-white/55" />
            Crafted for your story
          </motion.div>
          </div>
        </div>
    </section>
  );
}