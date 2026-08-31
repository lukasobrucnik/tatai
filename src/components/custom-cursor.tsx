"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Clickable — the square frame gets the looping spin inside it.
const CLICK_SELECTOR = 'a, button, [role="button"], input[type="submit"], label[for], summary, [data-cursor-interactive]';
// Reacts to hover (image zoom, row tint, accent line…) but isn't itself
// clickable — same square frame, held still, no spin. Opt in per component
// via `data-cursor-hover` (project-card.tsx, assembly-stack.tsx, material-strip.tsx).
const HOVER_SELECTOR = "[data-cursor-hover]";

const NEAR_BLACK = "#0e1113"; // --color-graphite-1000
const NEAR_WHITE = "#faf8f4"; // --color-bone-100

type CursorState = "idle" | "hover" | "click";

/** WCAG relative luminance from an "rgb(...)"/"rgba(...)" computed-style string. */
function luminance(rgb: string): number {
  const nums = rgb.match(/[\d.]+/g);
  if (!nums) return 1;
  const [r, g, b] = nums.slice(0, 3).map(Number).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Walks up from the element under the cursor to the nearest opaque background. */
function backgroundLuminanceAt(x: number, y: number): number {
  let node = document.elementFromPoint(x, y) as Element | null;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const nums = bg.match(/[\d.]+/g);
    if (nums) {
      const alpha = nums.length === 4 ? Number(nums[3]) : 1;
      if (alpha > 0.5) return luminance(bg);
    }
    node = node.parentElement;
  }
  return 1; // no opaque ancestor found — assume the page's light background
}

/**
 * Replaces the system arrow with a small precision mark, three states:
 *  - idle: a thin crosshair
 *  - hover (reacts, can't be clicked): an open corner-bracket frame, static
 *  - click (can be clicked): the same frame with a small cross spinning
 *    inside it on a loop — the one clearly "this does something" signal
 *
 * The mark's color itself continuously reads the background under the
 * pointer (sampled via elementFromPoint) and eases between near-black and
 * near-bone so it stays visible over both the dark sections and the light
 * ones — a smooth crossfade, never an instant swap, so a mid-transition
 * frame never reads as a rendering glitch.
 *
 * Desktop-with-a-mouse only: bails out entirely under touch/coarse pointers
 * and prefers-reduced-motion, leaving the native cursor (and its own
 * pointer/default icon) untouched in both cases.
 */
export function CustomCursor() {
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("idle");
  const [markColor, setMarkColor] = useState(NEAR_BLACK);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Tight, low-mass spring: reads as a precise instrument tracking the
  // pointer, not a floaty/playful trailing effect.
  const springX = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });
  const framePending = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEligible(mq.matches && !reduceMotion.matches);
    update();
    mq.addEventListener("change", update);
    reduceMotion.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduceMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!eligible) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      // elementFromPoint + a computed-style walk isn't free — cap it at
      // once per animation frame rather than once per raw mousemove.
      if (framePending.current) return;
      framePending.current = true;
      requestAnimationFrame(() => {
        framePending.current = false;
        const bgL = backgroundLuminanceAt(e.clientX, e.clientY);
        setMarkColor(bgL > 0.5 ? NEAR_BLACK : NEAR_WHITE);
      });
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const clickable = target.closest?.(CLICK_SELECTOR);
      if (clickable && !(clickable as HTMLButtonElement).disabled) {
        setState("click");
      } else if (target.closest?.(HOVER_SELECTOR)) {
        setState("hover");
      } else {
        setState("idle");
      }
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [eligible, x, y]);

  if (!eligible) return null;

  const framed = state !== "idle";
  const colorTransition = { duration: 0.35, ease: "easeInOut" as const };

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[999] pointer-events-none"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0, translateX: "-50%", translateY: "-50%" }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <motion.g
          strokeWidth="1.25"
          style={{ transformOrigin: "16px 16px" }}
          animate={{
            opacity: framed ? 0 : 0.85,
            scale: framed ? 0.8 : 1,
            stroke: markColor,
          }}
          transition={{ opacity: { type: "spring", stiffness: 500, damping: 30 }, scale: { type: "spring", stiffness: 500, damping: 30 }, stroke: colorTransition }}
        >
          <line x1="16" y1="3" x2="16" y2="11" />
          <line x1="16" y1="21" x2="16" y2="29" />
          <line x1="3" y1="16" x2="11" y2="16" />
          <line x1="21" y1="16" x2="29" y2="16" />
        </motion.g>

        <motion.g
          strokeWidth="1.5"
          strokeLinecap="square"
          style={{ transformOrigin: "16px 16px" }}
          initial={false}
          animate={{
            opacity: framed ? 1 : 0,
            scale: framed ? 1 : 0.7,
            rotate: framed ? 0 : -8,
            stroke: markColor,
          }}
          transition={{
            opacity: { type: "spring", stiffness: 480, damping: 26 },
            scale: { type: "spring", stiffness: 480, damping: 26 },
            rotate: { type: "spring", stiffness: 480, damping: 26 },
            stroke: colorTransition,
          }}
        >
          <path d="M6 12 V6 H12" />
          <path d="M20 6 H26 V12" />
          <path d="M26 20 V26 H20" />
          <path d="M12 26 H6 V20" />
        </motion.g>

        {/* Loop only runs in the "click" state — the frame alone (hover
            state) stays still, so the spin reads as "you can act on this"
            rather than as generic decoration. */}
        {state === "click" && (
          <motion.g
            strokeWidth="1.25"
            style={{ transformOrigin: "16px 16px" }}
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360, stroke: markColor }}
            transition={{
              opacity: { duration: 0.15 },
              rotate: { repeat: Infinity, ease: "linear", duration: 1.8 },
              stroke: colorTransition,
            }}
          >
            <line x1="16" y1="10" x2="16" y2="14" />
            <line x1="16" y1="18" x2="16" y2="22" />
            <line x1="10" y1="16" x2="14" y2="16" />
            <line x1="18" y1="16" x2="22" y2="16" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
