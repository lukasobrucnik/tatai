"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useNav } from "./nav-context";

/**
 * Wraps a top-level page section, registering it as a scroll-spy target:
 * whichever anchor crosses the mid-viewport band becomes the header's active nav item.
 */
export function SectionAnchor({
  id,
  children,
  target = true,
}: {
  id: string;
  children: ReactNode;
  /** false = only scroll-spy, the jump target lives elsewhere (see
   *  AnchorTarget). Needed for a section inside a pinned (sticky) block:
   *  while pinned its on-screen position isn't its place in the page, and
   *  a jump measured off it lands somewhere else entirely. */
  target?: boolean;
}) {
  const { setActive } = useNav();
  return (
    <motion.div
      id={target ? id : undefined}
      className="scroll-mt-[var(--header-h)]"
      onViewportEnter={() => setActive(id)}
      viewport={{ margin: "-45% 0px -50% 0px", amount: 0 }}
    >
      {children}
    </motion.div>
  );
}

/** A bare jump target for a section whose own SectionAnchor can't be one. */
export function AnchorTarget({ id }: { id: string }) {
  return <div id={id} aria-hidden className="scroll-mt-[var(--header-h)]" />;
}
