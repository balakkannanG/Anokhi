"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

interface RevealProps extends Omit<ComponentProps<typeof motion.div>, "initial" | "whileInView" | "viewport"> {
  delay?: number;
}

export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
