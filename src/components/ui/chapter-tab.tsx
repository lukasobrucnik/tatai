"use client";

import { motion, useReducedMotion } from "framer-motion";

/** DS motion: "things reveal, they never bounce". */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A chapter's leading edge: the numbered marker naming the chapter you've
 * just entered. Numbering continues the hero's own panel labels
 * (01 — Střechy, 02 — Domy), so one index system runs through the page.
 *
 * The separating work is done by the signal rule, not by the background.
 * This used to be a bone strip with a hairline, which meant its visibility
 * depended entirely on what happened to sit above it: against the dark
 * Proces section it jumped out, but against a `tone="raised"` section it
 * was within a few percent of the same colour and effectively vanished —
 * so the same element looked present on one chapter and missing on the
 * next. Signal cyan reads against both grounds, so every chapter opens
 * identically now.
 *
 * The rule draws itself from the left as the chapter arrives — the same
 * gesture ProjectCard, MaterialStrip and PillarSplit already use on hover,
 * here held permanently as a chapter marker.
 */
export function ChapterTab({ index, label }: { index?: string; label?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="bg-surface-page">
      <motion.span
        aria-hidden
        className="block h-0.5 w-full origin-left bg-signal-500"
        initial={reduce ? undefined : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
      {/* Chapters that open on a plate name themselves there, at heading
          scale, and pass no label — the rule alone is then the sheet's
          leading edge. Only a chapter opening straight into a section still
          needs the strip to say where you are. */}
      {label && (
        <motion.div
          className="container-tatai flex items-baseline gap-3 py-5"
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          {index && <span className="font-mono text-body-sm tabular-nums text-signal-500">{index}</span>}
          <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-strong">{label}</span>
        </motion.div>
      )}
    </div>
  );
}
