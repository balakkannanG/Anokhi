"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function GsapReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduceMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-gsap-reveal]",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, root);

    return () => context.revert();
  }, [reduceMotion]);

  return <div className={className} ref={root}><div data-gsap-reveal>{children}</div></div>;
}
