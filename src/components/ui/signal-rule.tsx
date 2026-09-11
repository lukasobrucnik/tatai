"use client";

import { motion, useReducedMotion } from "framer-motion";

/** DS motion: "things reveal, they never bounce". */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The seam between two sections: a signal hairline that draws itself in from
 * the left as the seam arrives, carrying a soft bloom of its own colour.
 *
 * The page already used this gesture in three places — the chapter tab, the
 * hover underline on cards and strips, the tick above every stat — so making
 * it the general rule for a section boundary costs no new vocabulary, and it
 * is the one mark on the site that reads equally well on bone and on
 * graphite. The glow is deliberately weak (the line is a hairline, the bloom
 * a few pixels of 40%-mixed colour): enough to feel lit rather than printed,
 * not enough to turn a divider into a light show.
 *
 * Paints the line only — the caller positions it, normally flush to the top
 * edge of a section whose own padding would otherwise inset it.
 */
export function SignalRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className={`signal-rule block h-px w-full origin-left ${className}`}
      initial={reduce ? undefined : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
