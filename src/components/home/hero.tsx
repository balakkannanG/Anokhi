"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@/components/ui/icons";
import { placeholderImages } from "@/lib/constants/placeholder-images";

const heroSlides = [
  {
    image: placeholderImages.jewellerySet,
    eyebrow: "ANOKHI · MADE FOR YOUR MOMENTS",
    title: "Jewellery worth remembering.",
    description: "Thoughtfully designed pieces for the moments and stories you carry with you.",
    link: "/jewellery",
    linkLabel: "EXPLORE JEWELLERY",
  },
  {
    image: placeholderImages.model,
    eyebrow: "SIGNATURE ANOKHI STYLE",
    title: "Find the pieces you’ll keep.",
    description: "Explore signature jewellery selected to feel unmistakably yours.",
    link: "/collections",
    linkLabel: "DISCOVER OUR COLLECTIONS",
  },
  {
    image: placeholderImages.earrings,
    eyebrow: "A LITTLE LIGHT, EVERY DAY",
    title: "Details that feel like you.",
    description: "Explore thoughtful finishing touches, made to become part of your story.",
    link: "/jewellery",
    linkLabel: "DISCOVER JEWELLERY",
  },
  {
    image: placeholderImages.bridalSet,
    eyebrow: "CRAFTED FOR WHAT MATTERS",
    title: "Make it unmistakably yours.",
    description: "Begin with a ring style and explore the details you would like to make your own.",
    link: "/customise-your-ring",
    linkLabel: "EXPLORE CUSTOM RINGS",
  },
];

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (isPaused || motionPreference.matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  };

  return (
    <section
      aria-label="Featured Anokhi collections"
      aria-roledescription="carousel"
      className="relative isolate h-[clamp(40rem,78vh,48rem)] overflow-hidden bg-charcoal text-ivory"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      onFocusCapture={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroSlides.map((slide, index) => (
        <div
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
          key={slide.image.src}
        >
          <Image
            alt={slide.image.alt}
            className="object-cover object-center"
            fill
            priority={index === 0}
            sizes="100vw"
            src={slide.image.src}
          />
        </div>
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/5" />

      <div
        aria-live="polite"
        className="relative flex h-full items-end px-6 pb-24 pt-20 sm:px-10 sm:pb-28 md:items-center md:px-16 lg:px-[11%]"
      >
        <div className="max-w-[42rem]">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white">
            {heroSlides[activeIndex].eyebrow}
          </p>
          <h1 className="display-face mt-4 max-w-[13ch] text-[clamp(2.7rem,6.7vw,6rem)] leading-[1.04] text-white">
            {heroSlides[activeIndex].title}
          </h1>
          <p className="mt-5 max-w-[25rem] text-sm leading-6 text-white sm:text-base sm:leading-7">
            {heroSlides[activeIndex].description}
          </p>
          <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <Link
              className="group inline-flex min-h-12 items-center gap-5 bg-anokhi-plum px-5 py-2 text-[10px] font-semibold tracking-[0.14em] text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              href={heroSlides[activeIndex].link}
            >
              {heroSlides[activeIndex].linkLabel}
              <span className="grid size-7 place-items-center rounded-full bg-ivory/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight aria-hidden="true" className="size-4" weight="light" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between sm:inset-x-10 md:inset-x-16 lg:inset-x-[11%]">
        <div className="flex items-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show banner ${index + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex ? "w-9 bg-white" : "w-5 bg-muted-gold hover:bg-ivory/80"}`}
              key={slide.image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
          <span className="ml-2 text-[10px] tracking-[0.12em] text-white">
            {String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous banner"
            className="flex size-10 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-ivory/15"
            onClick={showPrevious}
            type="button"
          >
            <CaretLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label="Next banner"
            className="flex size-10 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-ivory/15"
            onClick={showNext}
            type="button"
          >
            <CaretRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
