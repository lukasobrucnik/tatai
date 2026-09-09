"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChapterTab } from "./chapter-tab";

/**
 * A chapter built from two planes: a full-screen **plate** that pins itself
 * to the viewport, and the chapter's **body**, which slides up and covers
 * it. Where ChapterLayer only overlaps its neighbour by a strip, here one
 * section genuinely stays put on screen while the next one takes it over.
 *
 * The mechanic is native `position: sticky` and nothing else. The plate
 * stays in normal flow, so its own height *is* the scroll budget for the
 * cover — no negative margins, no spacer elements, and (unlike a pinning
 * library) not one pixel of extra scroll distance is invented. Sticky
 * releases on its own at the end of the shell.
 *
 * Two things are easy to get wrong here:
 *
 * 1. The scroll progress cannot be measured from the plate. Once it's
 *    stuck its rect stops moving, so a `useScroll` keyed to it freezes
 *    mid-chapter. The body is the thing still travelling at scroll speed,
 *    so the body is what we measure — and the plate's recede is driven
 *    from that.
 *
 * 2. The scale goes on a wrapper *inside* the sticky box, never on the
 *    sticky box itself, which makes Safari render sticky text blurry.
 *
 * Scaling the plate is only safe because it is exactly one viewport tall
 * and pinned. The same move on a multi-screen body would drag its visible
 * bottom edge up by hundreds of pixels — see ChapterLayer for why that one
 * only ever dims.
 */

/** Lets the plate's own content scrub off the cover progress (see HeroDiptych). */
const PlateProgressContext = createContext<MotionValue<number> | null>(null);

export function usePlateProgress() {
  return useContext(PlateProgressContext);
}

export function PlateChapter({
  plate,
  children,
  index,
  label,
}: {
  /** The full-screen opening plane. Pins, then recedes as the body covers it. */
  plate: ReactNode;
  children: ReactNode;
  index?: string;
  label?: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 = body's top edge entering from the bottom (the cover begins)
  // 1 = body's top edge at the top of the viewport (plate fully covered)
  // Mapped across the full range on purpose: a transform that finishes
  // early clamps flat, and scroll wobbling back across that boundary
  // un-clamps it — the flicker we already had to fix once in the hero.
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start end", "start start"] });
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const plateDim = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

  return (
    // No `isolate` and no transform on the shell: either would make it a
    // stacking context that could out-rank the sticky header's z-40. The
    // plate/body z-indices below stay local to this shell.
    <section className="relative">
      <div
        className="sticky z-0 overflow-hidden"
        style={{ top: "var(--header-h)", height: "calc(100svh - var(--header-h))" }}
      >
        <motion.div className="h-full" style={reduce ? undefined : { scale: plateScale }}>
          <PlateProgressContext.Provider value={scrollYProgress}>{plate}</PlateProgressContext.Provider>
        </motion.div>
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-graphite-1000"
            style={{ opacity: plateDim }}
          />
        )}
      </div>

      {/* Later sibling, positioned, opaque — so it paints over the plate.
          The background belongs on this wrapper and not only on the
          Sections inside, or the seams between them would let the plate
          show through. */}
      <div
        ref={bodyRef}
        className="relative z-10 bg-surface-page"
        style={{ boxShadow: "0 -24px 56px rgba(14, 17, 19, 0.14)" }}
      >
        {label && <ChapterTab index={index} label={label} />}
        {children}
      </div>
    </section>
  );
}
