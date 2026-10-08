"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@/components/ui/icons";
import { placeholderImages } from "@/lib/constants/placeholder-images";

const testimonials = [
  {
    category: "Ring story",
    quote: "I was looking for a ring that felt personal, and the thoughtful details made the whole search feel special.",
    image: placeholderImages.solitaireRing,
    href: "/rings",
  },
  {
    category: "Jewellery story",
    quote: "The piece is beautifully finished and feels just as considered in person as it did when I first saw it.",
    image: placeholderImages.earrings,
    href: "/jewellery",
  },
  {
    category: "Ring story",
    quote: "A timeless design with a lovely sense of detail. It has quickly become part of my everyday collection.",
    image: placeholderImages.engagementRing,
    href: "/rings",
  },
  {
    category: "Jewellery story",
    quote: "Finding a style that felt like me was easy, and the finished piece is something I will treasure.",
    image: placeholderImages.necklace,
    href: "/jewellery",
  },
  {
    category: "Ring story",
    quote: "The craftsmanship and elegant design made this a meaningful choice for a moment I will always remember.",
    image: placeholderImages.weddingRing,
    href: "/rings",
  },
  {
    category: "Jewellery story",
    quote: "Beautifully made, comfortable to wear, and full of the little details that make it feel truly special.",
    image: placeholderImages.jewellerySet,
    href: "/jewellery",
  },
];

export function TestimonialsCarousel() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const moveTo = useCallback((index: number, direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = (index + testimonials.length) % testimonials.length;
    const currentPosition = track.scrollLeft;
    const candidates = [nextIndex, nextIndex + testimonials.length, nextIndex + testimonials.length * 2]
      .map((candidateIndex) => track.children.item(candidateIndex))
      .filter((candidate): candidate is HTMLElement => candidate instanceof HTMLElement)
      .filter((candidate) => direction > 0 ? candidate.offsetLeft > currentPosition : candidate.offsetLeft < currentPosition)
      .sort((a, b) => Math.abs(a.offsetLeft - currentPosition) - Math.abs(b.offsetLeft - currentPosition));
    const target = candidates[0];
    if (!(target instanceof HTMLElement)) return;

    setActiveIndex(nextIndex);
    track.scrollTo({
      left: target.offsetLeft,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, [reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    const middleFirstSlide = track?.children.item(testimonials.length);
    if (track && middleFirstSlide instanceof HTMLElement) {
      track.scrollLeft = middleFirstSlide.offsetLeft;
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !isInView) return;

    let frame = 0;
    let previousTime = 0;
    const animate = (time: number) => {
      const track = trackRef.current;
      if (!track) return;

      if (previousTime && !isHovered && !isFocused && !document.hidden) {
        const firstSlide = track.children.item(0);
        const middleSlide = track.children.item(testimonials.length);
        if (firstSlide instanceof HTMLElement && middleSlide instanceof HTMLElement) {
          const loopWidth = middleSlide.offsetLeft - firstSlide.offsetLeft;
          const loopStart = middleSlide.offsetLeft;
          const loopEnd = loopStart + loopWidth;

          track.scrollLeft += (time - previousTime) * 0.024;
          if (track.scrollLeft >= loopEnd) track.scrollLeft -= loopWidth;
          else if (track.scrollLeft < loopStart) track.scrollLeft += loopWidth;
        }
      }

      previousTime = time;
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [isFocused, isHovered, isInView, reduceMotion]);

  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      const currentSlide = track?.children.item(testimonials.length + activeIndex);
      if (track && currentSlide instanceof HTMLElement) {
        track.scrollTo({ left: currentSlide.offsetLeft, behavior: "instant" });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <section
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
      className="overflow-hidden  px-4 py-16 sm:px-7 md:py-24 lg:px-10"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-[1320px]">
        <motion.header
          className="mx-auto mb-9 max-w-2xl text-center sm:mb-12"
          initial={reduceMotion ? false : { opacity: 0, x: -36 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.35 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="eyebrow">Notes on pieces to treasure</p>
          <h2 className="display-face mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-tight text-charcoal">
            Stories, thoughtfully chosen.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-coffee">
            Sample review cards and ratings shown for design preview; replace with approved customer reviews before publishing.
          </p>
        </motion.header>

        <div
          className="relative"
          onBlurCapture={(event) => setIsFocused(event.currentTarget.contains(event.relatedTarget))}
          onFocusCapture={() => setIsFocused(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            aria-live="off"
            className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
            onScroll={(event) => {
              const track = event.currentTarget;
              const nextIndex = Array.from(track.children).slice(0, testimonials.length * 2).reduce((closestIndex, child, index) => {
                const closest = track.children.item(closestIndex);
                if (!(child instanceof HTMLElement) || !(closest instanceof HTMLElement)) return closestIndex;
                return Math.abs(child.offsetLeft - track.scrollLeft) < Math.abs(closest.offsetLeft - track.scrollLeft)
                  ? index
                  : closestIndex;
              }, testimonials.length);
              setActiveIndex(nextIndex % testimonials.length);
            }}
            ref={trackRef}
            role="list"
          >
            {Array.from({ length: 3 }, (_, copyIndex) => testimonials.map((testimonial, index) => (
              <motion.article
                aria-label={`Sample review ${index + 1} of ${testimonials.length}`}
                aria-hidden={copyIndex !== 1}
                inert={copyIndex !== 1}
                className="w-full shrink-0 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                key={`${copyIndex}-${testimonial.category}-${index}`}
                role="listitem"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.65, delay: (index % 3) * 0.18, ease: [0.22, 1, 0.36, 1] }
                }
                viewport={{ once: false, amount: 0.15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="h-full overflow-hidden border border-taupe/35 bg-ivory bo rounded-lg ">
                  <Link
                    aria-label={`Explore ${testimonial.category.toLowerCase()}s`}
                    className="group relative block aspect-[1.65] overflow-hidden bg-parchment"
                    href={testimonial.href}
                  >
                    <Image
                      alt={testimonial.image.alt}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      fill
                      sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                      src={testimonial.image.src}
                    />
                    <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1.5 text-[9px] font-medium tracking-[0.14em] text-anokhi-plum">
                      {testimonial.category}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-ivory px-3 py-2 text-[10px] font-medium tracking-[0.12em] text-anokhi-plum transition-colors group-hover:bg-anokhi-plum group-hover:text-ivory">
                      EXPLORE ↗
                    </span>
                  </Link>

                  <div className="flex h-[14rem] flex-col p-5 sm:p-6">
                    <div aria-label="5 out of 5 stars, sample rating" className="flex gap-1 text-muted-gold" role="img">
                      {Array.from({ length: 5 }, (_, star) => (
                        <span aria-hidden="true" key={star}>★</span>
                      ))}
                    </div>
                    <blockquote className="display-face mt-4 text-xl leading-[1.45] text-charcoal">
                      “{testimonial.quote}”
                    </blockquote>
                    <div className="mt-auto border-t border-taupe/30 pt-4">
                      <p className="text-[10px] font-semibold tracking-[0.14em] text-charcoal">
                        SAMPLE CUSTOMER STORY
                      </p>
                      <p className="mt-1 text-[10px] tracking-[0.08em] text-coffee">
                        ILLUSTRATIVE REVIEW · NOT VERIFIED
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            )))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-taupe/40 pt-5">
            <p className="text-[10px] font-medium tracking-[0.12em] text-coffee">
              {String(activeIndex + 1).padStart(2, "0")} — {testimonials.length}
            </p>
            <div className="flex gap-2">
              <button
                aria-label="Previous customer story"
                className="flex size-11 items-center justify-center rounded-full border border-taupe/50 text-charcoal transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-anokhi-plum"
                onClick={() => moveTo(activeIndex - 1, -1)}
                type="button"
              >
                <CaretLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label="Next customer story"
                className="flex size-11 items-center justify-center rounded-full border border-taupe/50 text-charcoal transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-anokhi-plum"
                onClick={() => moveTo(activeIndex + 1, 1)}
                type="button"
              >
                <CaretRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
