"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Smooth scrolling, page-wide.
 *
 * Lenis wraps the browser's *native* scroll rather than transforming a
 * content wrapper, which is the whole reason it's the one used here: the
 * sticky header, the pinned chapter plates (PlateChapter), the fixed cursor
 * and modal, and Motion's scroll-linked animations all keep working
 * untouched. A transform-based smooth scroller (GSAP's ScrollSmoother among
 * them) would break every one of those, because a transformed ancestor
 * changes what `position: fixed` is fixed to and stops `position: sticky`
 * from sticking.
 *
 * `root` means no wrapper markup is rendered at all — children come through
 * as-is. Lenis disables its own smoothing under prefers-reduced-motion, and
 * `anchors` hands in-page links (the header nav) to Lenis so they ease
 * instead of jumping. The header offset is NOT given to Lenis: it already
 * honours each target's `scroll-margin-top` (SectionAnchor sets it to
 * --header-h), and passing the offset here as well subtracted the header
 * twice — every section landed 76px below the header.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ anchors: true }}>
      {children}
    </ReactLenis>
  );
}
