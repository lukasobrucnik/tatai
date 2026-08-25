"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade-and-rise reveal on scroll, replacing the original IntersectionObserver hack. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      // Positive bottom margin grows the trigger zone below the fold, so the
      // fade-in starts while a section is still off-screen. On a fast/flick
      // scroll (or a scroll-to-hash jump) the animation has already resolved
      // by the time the section is actually visible, instead of the viewport
      // landing on a still-opacity:0 section.
      viewport={{ once: true, amount: 0.06, margin: "0px 0px 300px 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
