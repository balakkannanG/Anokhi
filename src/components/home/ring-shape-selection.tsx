"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";

const shapes = [
  { name: "Round", type: "round" },
  { name: "Oval", type: "oval" },
  { name: "Pear", type: "pear" },
  { name: "Marquise", type: "marquise" },
  { name: "Emerald", type: "emerald" },
  { name: "Asscher", type: "asscher" },
  { name: "Princess", type: "princess" },
  { name: "Radiant", type: "radiant" },
  { name: "Cushion", type: "cushion" },
  { name: "Heart", type: "heart" },
] as const;

type ShapeType = (typeof shapes)[number]["type"];

function DiamondShape({ type }: { type: ShapeType }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className="h-32 w-36 object-contain drop-shadow-[0_8px_7px_rgba(43,29,13,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-36 sm:w-40"
      height={130}
      src={`/shape/${type}.png`}
      width={160}
    />
  );
}

export function RingShapeSelection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * track.clientWidth * 0.72,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section aria-labelledby="ring-shapes-heading" className=" px-4 py-12 sm:px-7 md:py-16 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <motion.div
          className="relative mb-7 flex items-center justify-between gap-4"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.4 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="display-face mx-auto text-center text-[clamp(2rem,4vw,3rem)] leading-tight text-charcoal" id="ring-shapes-heading">
            Shop By Shape
          </h2>
          <div className="absolute right-0 flex gap-2">
            <button
              aria-label="Scroll to previous diamond shapes"
              className="flex size-10 items-center justify-center rounded-full border border-taupe/40 bg-ivory/70 text-charcoal transition-colors hover:bg-ivory"
              onClick={() => scroll(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              aria-label="Scroll to more diamond shapes"
              className="flex size-10 items-center justify-center rounded-full border border-taupe/40 bg-ivory/70 text-charcoal transition-colors hover:bg-ivory"
              onClick={() => scroll(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </motion.div>

        <div
          aria-label="Diamond shapes"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
          ref={trackRef}
          role="list"
        >
          {shapes.map(({ name, type }, index) => (
            <motion.div
              className="shrink-0 basis-[38%] snap-start sm:basis-[24%] lg:basis-[15%]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              key={name}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              viewport={{ once: false, amount: 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
              role="listitem"
            >
              <Link
                aria-label={`Shop ${name.toLowerCase()} cut rings`}
                className="group flex h-full flex-col items-center rounded-xl px-2 py-3 text-center transition-colors hover:bg-ivory/45"
                href={`/search?q=${encodeURIComponent(name)}&category=rings`}
              >
                <DiamondShape type={type} />
                <span className="display-face mt-2 text-lg font-semibold text-charcoal">{name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
