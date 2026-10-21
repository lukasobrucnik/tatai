"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Two chapters where the second one slides over the end of the first —
 * the same "a sheet covers the one underneath" feeling as PlateChapter,
 * but for a chapter that is taller than the screen.
 *
 * PlateChapter pins a plate that is exactly one viewport tall, so it can
 * stick at the top. A long chapter can't: pinned at the top, its whole
 * bottom half would be hidden before anyone read it. So this one sticks by
 * its *bottom* edge instead — `top` is set to (viewport − own height), a
 * negative offset, which lets the chapter scroll normally until its last
 * screen is in view and then holds it there while the next one comes up
 * over it.
 *
 * Deliberately nothing moves on the covered chapter — no scale, no parallax,
 * only a light veil as it goes under. The movement is the cover itself.
 */
export function CoverStack({ pinned, cover }: { pinned: ReactNode; cover: ReactNode }) {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [height, setHeight] = useState<number | null>(null);

  // Own height has to be measured: CSS has no way to say "top = viewport
  // minus my height" (a percentage `top` resolves against the parent).
  // ResizeObserver keeps it right when images load or the layout reflows.
  useLayoutEffect(() => {
    const el = pinnedRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setHeight(entry.borderBoxSize[0]?.blockSize ?? el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 0 = cover's top edge entering at the bottom, 1 = it reaches the top.
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "start start"] });
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.3]);

  return (
    <div className="relative">
      <div
        ref={pinnedRef}
        // Until measured it is a plain block — no sticky with a wrong offset.
        className={height === null ? "relative" : "sticky z-0"}
        style={height === null ? undefined : { top: `calc(100svh - ${height}px)` }}
      >
        {pinned}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5] bg-graphite-1000"
            style={{ opacity: veil }}
          />
        )}
      </div>

      {/* Later sibling, positioned, opaque, so it paints over the pinned
          chapter. Same leading-edge shadow as PlateChapter's body. */}
      <div
        ref={coverRef}
        className="relative z-10 bg-surface-page"
        style={{ boxShadow: "0 -24px 56px rgba(14, 17, 19, 0.14)" }}
      >
        {cover}
      </div>
    </div>
  );
}
