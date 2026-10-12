"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@/components/ui/icons";

const heroSlides = [
  {
    image: {
      src: "/homepage/banner/banner.jpg",
      mobileSrc: "/homepage/banner/mbanner.jpg",
      alt: "Anokhi homepage banner",
    },
    eyebrow: "INDIVIDUALLY ANOKHI",
    title: "You are the inspiration..",
    description: "Thoughtfully crafted diamond jewellery, shaped by what makes you unique.",
    link: "/jewellery",
    linkLabel: " Discover Anokhi",
  },
  {
    image: { src: "/homepage/banner/banner2.jpg",mobileSrc: "/homepage/banner/mbanner2.jpg", alt: "Anokhi homepage banner" },
    eyebrow: "YOUR STYLE · YOUR SIGNATURE",
    title: "A little of you. In every detail.",
    description: "A favourite shape. A meaningful stone. A design we bring to life together.",
    link: "/collections",
    linkLabel: "Create With Us",
  },
  {
    image: {
      src: "/homepage/banner/banner3.jpg",
      mobileSrc: "/homepage/banner/mbanner3.jpg",
      alt: "Anokhi homepage banner",
    },
    eyebrow: "PERSONAL BY DESIGN",
    title: "Only you know what it means.",
    description: "A memory, a milestone, a message—held in a piece you can wear.",
    link: "/jewellery",
    linkLabel: "Make It Yours",
  },
  {
    image: {
      src: "/homepage/banner/banner4.jpg",
      mobileSrc: "/homepage/banner/mbanner4.jpg",
      alt: "Anokhi homepage banner",
    },
    eyebrow: "CRAFTED AROUND YOU",
    title: "Your story belongs in the design.",
    description: "From a meaningful engraving to a bespoke creation, let every detail hold something of you.",
    link: "/customise-your-ring",
    linkLabel: "Make It Truly Yours",
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
          <picture className="absolute inset-0">
            {slide.image.mobileSrc ? (
              <source media="(max-width: 767px)" srcSet={slide.image.mobileSrc} />
            ) : null}
            <Image
              alt={slide.image.alt}
              className="object-cover object-[80%_center] md:object-center "
              fill
              priority={index === 0}
              sizes="100vw"
              src={slide.image.src}
            />
          </picture>
        </div>
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

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
              className="group inline-flex min-h-12 uppercase
 items-center gap-5 bg-anokhi-plum px-5 py-2 text-[10px] font-semibold tracking-[0.14em] text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
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
