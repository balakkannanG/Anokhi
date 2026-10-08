"use client";

import Link from "next/link";
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
] as const;

type ShapeType = (typeof shapes)[number]["type"];

const silhouettes: Record<ShapeType, string> = {
  round: "M80 15 C112 15 132 38 132 65 C132 92 112 115 80 115 C48 115 28 92 28 65 C28 38 48 15 80 15 Z",
  oval: "M80 10 C108 10 126 34 126 65 C126 96 108 120 80 120 C52 120 34 96 34 65 C34 34 52 10 80 10 Z",
  pear: "M80 9 C95 26 124 48 124 75 C124 101 106 119 80 119 C54 119 36 101 36 75 C36 48 65 26 80 9 Z",
  marquise: "M80 8 C94 29 128 47 128 65 C128 83 94 101 80 122 C66 101 32 83 32 65 C32 47 66 29 80 8 Z",
  emerald: "M52 12 L108 12 L128 32 L128 98 L108 118 L52 118 L32 98 L32 32 Z",
  asscher: "M49 15 L111 15 L125 29 L125 101 L111 115 L49 115 L35 101 L35 29 Z",
  princess: "M44 14 L116 14 L126 24 L126 106 L116 116 L44 116 L34 106 L34 24 Z",
  radiant: "M57 12 L103 12 L128 37 L128 93 L103 118 L57 118 L32 93 L32 37 Z",
  cushion: "M58 13 Q80 8 102 13 L121 32 Q130 44 125 65 Q130 86 121 98 L102 117 Q80 122 58 117 L39 98 Q30 86 35 65 Q30 44 39 32 Z",
};

const facets: Record<ShapeType, string[]> = {
  round: ["M80 15 L80 115", "M28 65 L132 65", "M43 28 L117 102", "M117 28 L43 102", "M52 18 L108 112", "M108 18 L52 112"],
  oval: ["M80 10 L80 120", "M36 65 L124 65", "M50 20 L110 110", "M110 20 L50 110", "M58 13 L102 117", "M102 13 L58 117"],
  pear: ["M80 9 L80 119", "M39 55 L121 88", "M121 55 L39 88", "M62 25 L104 104", "M98 25 L56 104"],
  marquise: ["M80 8 L80 122", "M36 42 L124 88", "M124 42 L36 88", "M54 24 L106 106", "M106 24 L54 106"],
  emerald: ["M52 12 L52 118", "M108 12 L108 118", "M32 32 L128 32", "M32 98 L128 98", "M52 32 L108 98", "M108 32 L52 98"],
  asscher: ["M49 15 L49 115", "M111 15 L111 115", "M35 29 L125 29", "M35 101 L125 101", "M49 29 L111 101", "M111 29 L49 101", "M35 65 L125 65"],
  princess: ["M44 14 L44 116", "M116 14 L116 116", "M34 24 L126 24", "M34 106 L126 106", "M44 24 L116 106", "M116 24 L44 106", "M34 65 L126 65"],
  radiant: ["M57 12 L57 118", "M103 12 L103 118", "M32 37 L128 37", "M32 93 L128 93", "M57 37 L103 93", "M103 37 L57 93", "M32 65 L128 65"],
  cushion: ["M58 13 L58 117", "M102 13 L102 117", "M39 32 L121 98", "M121 32 L39 98", "M35 65 L125 65", "M49 22 L111 108"],
};

function DiamondShape({ type }: { type: ShapeType }) {
  const silhouette = silhouettes[type];

  return (
    <svg
      aria-hidden="true"
      className="h-32 w-36 drop-shadow-[0_8px_7px_rgba(43,29,13,0.18)] transition-transform duration-500 group-hover:scale-105 sm:h-36 sm:w-40"
      fill="none"
      viewBox="0 0 160 130"
    >
      <defs>
        <linearGradient id={`diamond-${type}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fffef1" />
          <stop offset="45%" stopColor="#e9dfc8" />
          <stop offset="72%" stopColor="#fffdf2" />
          <stop offset="100%" stopColor="#cfc2a7" />
        </linearGradient>
        <clipPath id={`diamond-clip-${type}`}>
          <path d={silhouette} />
        </clipPath>
      </defs>
      <path d={silhouette} fill={`url(#diamond-${type})`} stroke="#8c816f" strokeWidth="1.3" />
      <g clipPath={`url(#diamond-clip-${type})`} stroke="#a69b87" strokeOpacity=".8" strokeWidth="1">
        {facets[type].map((facet) => <path d={facet} key={facet} />)}
        <path d={silhouette} fill="none" stroke="#827765" strokeWidth="2" />
      </g>
      <path d={silhouette} fill="none" stroke="#fffef5" strokeOpacity=".85" strokeWidth=".8" />
    </svg>
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
