"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Fade-and-rise reveal on scroll — as an enhancement of content that is
 * already visible, never as a gate on it.
 *
 * The Motion version rendered `opacity: 0` into the server HTML, so every
 * wrapped block was invisible until the bundle hydrated (and for good
 * without JavaScript). Here the server HTML is plain and visible. After
 * hydration, only a block that is still below the fold is put into the
 * pending state (globals.css, [data-reveal]) — off screen, so nobody sees it
 * hide — and an IntersectionObserver brings it in as it approaches.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // On screen (or already scrolled past) at hydration: it has been visible
    // since first paint, so animating it now would only make it blink.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.dataset.reveal = "in";
      },
      // Grows the trigger zone below the fold, so the fade has mostly run by
      // the time a fast flick or an anchor jump lands on the block.
      { rootMargin: "0px 0px 300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? ({ "--d": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}
