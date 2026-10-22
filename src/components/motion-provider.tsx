"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Every animated element on the site is an `m.*` component, which is only
 * the rendering core; the animation, gesture, drag and layout features load
 * after first paint instead of riding in the first bundle with the full
 * `motion.*`. `strict` makes a stray `motion.*` fail loudly instead of
 * quietly pulling the whole library back in.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
