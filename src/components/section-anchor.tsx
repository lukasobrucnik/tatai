"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useNav } from "./nav-context";

/**
 * Wraps a top-level page section, registering it as a scroll-spy target:
 * whichever anchor crosses the mid-viewport band becomes the header's active nav item.
 */
export function SectionAnchor({ id, children }: { id: string; children: ReactNode }) {
  const { setActive } = useNav();
  return (
    <motion.div
      id={id}
      className="scroll-mt-[var(--header-h)]"
      onViewportEnter={() => setActive(id)}
      viewport={{ margin: "-45% 0px -50% 0px", amount: 0 }}
    >
      {children}
    </motion.div>
  );
}
