"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * One sheet in the page's layer stack.
 *
 * Each chapter is pulled up over the end of the chapter before it, casts a
 * shadow upward onto it, and lifts the last stretch into place as it
 * arrives — so the page reads as sheets sliding over one another instead
 * of blocks stacked end to end. The sheet going behind takes a light veil,
 * which is the depth cue doing most of the work (things further away are
 * hazier — the same reason the hero's photos dim as they leave).
 *
 * Two geometry rules keep this from breaking:
 *
 * 1. The veil is a full-cover overlay, never a scale on the section
 *    itself. These chapters are several screens tall, and scaling one
 *    moves its visible bottom edge by hundreds of pixels — a lurch, not a
 *    recede. A uniform veil has no geometry to get wrong.
 *
 * 2. The arrival lift is always smaller than the overlap. The sheet starts
 *    `lift` pixels *below* its resting place, so if it lifted further than
 *    it overlaps, its top edge would clear the chapter underneath and open
 *    a strip of bare page background mid-scroll.
 *
 * The overlap only ever eats into the previous section's bottom padding
 * (80–176px at `density="lg"`), so no content is ever covered — the seam
 * just draws tighter, which is the point.
 */
export function ChapterLayer({
  children,
  index,
  label,
  overlap = 72,
  veiled = true,
  className = "",
}: {
  children: ReactNode;
  /** Chapter number shown on the sheet's edge. Numbering follows the hero's
   *  own panel labels (01 — Střechy, 02 — Domy), so one index system runs
   *  through the whole page. */
  index?: string;
  /** Chapter name shown on the sheet's edge — the five menu sections. The
   *  intro sheet is front matter and deliberately carries no tab. */
  label?: string;
  /** How far this sheet is pulled up over the previous one, in px. */
  overlap?: number;
  /** Set false for the last sheet: nothing slides over it, so shading it
   *  as it leaves would read as the page dimming for no reason. */
  veiled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Arrival: from the sheet's top edge entering at the bottom of the
  // viewport until it sits 60% up the screen — the window where the seam
  // is on screen and the slide-over is actually watchable.
  const { scrollYProgress: arrival } = useScroll({ target: ref, offset: ["start end", "start 0.6"] });
  // Departure: only the final screenful, as the next sheet covers this one.
  const { scrollYProgress: departure } = useScroll({ target: ref, offset: ["end end", "end start"] });

  const lift = useTransform(arrival, [0, 1], [overlap - 8, 0]);
  const veil = useTransform(departure, [0, 1], [0, 0.15]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        marginTop: -overlap,
        boxShadow: "0 -24px 56px rgba(14, 17, 19, 0.14)",
        ...(reduce ? null : { y: lift }),
      }}
    >
      {/* The sheet's leading edge, and the reason the stack means something:
          a numbered tab naming the chapter you've just entered, the way an
          index tab names a divider in a folder. The hairline gives the sheet
          a crisp edge where two same-coloured chapters meet and the shadow
          alone would be doing all the work. */}
      {label && (
        <div className="border-t border-border-hairline bg-surface-page">
          <div className="container-tatai flex items-baseline gap-3 py-4">
            {index && <span className="font-mono text-eyebrow tracking-eyebrow text-signal-500">{index}</span>}
            <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">{label}</span>
          </div>
        </div>
      )}

      {children}
      {veiled && !reduce && (
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 bg-graphite-1000" style={{ opacity: veil }} />
      )}
    </motion.div>
  );
}
