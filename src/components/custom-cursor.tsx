"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Clickable — becomes a small filled dot.
const CLICK_SELECTOR = 'a, button, [role="button"], input[type="submit"], label[for], summary, [data-cursor-interactive]';
// Reacts to hover (image zoom, row tint, accent line…) but isn't itself
// clickable — a hollow ring, no fill. Opt in per component via
// `data-cursor-hover` (material-strip.tsx, pillar-split.tsx).
const HOVER_SELECTOR = "[data-cursor-hover]";
// Elements with their own native cursor (text caret, OS select popup) — the
// mark hides here entirely rather than sitting on top of it. Two cursors
// drawn at once is what reads as "broken", not the native one alone.
const NATIVE_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

// Same token as the rest of the site's motion (see hero-diptych.tsx): things
// settle, they never bounce. The cursor previously used underdamped springs
// for its shape changes, which overshot and read as playful/showy — this
// keeps position tracking on a spring (that one's fine, it's critically
// damped, just following the pointer) but every shape/opacity change now
// runs on this plain ease instead.
const EASE = [0.16, 1, 0.3, 1] as const;

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

/**
 * Walks up from the element under the cursor to the nearest opaque background.
 *
 * `data-cursor-ground="light" | "dark"` short-circuits the walk for the rare
 * element whose painted ground is not its own background colour. The glyph
 * portal is the case that forced it: its section is painted near-black, but
 * once the camera is inside the letter the whole screen is the light field,
 * drawn by a pointer-events-none layer the walk never reaches — so the mark
 * stayed bone-white on bone-white paper. The portal sets the attribute as it
 * crosses that point and clears it on the way back out.
 */
function backgroundLuminanceAt(x: number, y: number): number {
  let node = document.elementFromPoint(x, y) as Element | null;
  while (node) {
    const declared = (node as HTMLElement).dataset?.cursorGround;
    if (declared === "light") return 1;
    if (declared === "dark") return 0;
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
 * Replaces the system arrow with a small dot, three states:
 *  - idle: a quiet 5px dot
 *  - hover (reacts, can't be clicked): the dot opens into a hollow ring
 *  - click (can be clicked): a slightly larger, filled dot
 *
 * No shape morphing, no loop, no spring-bounce — the mark just eases
 * between three sizes of the same circle, deliberately understated.
 *
 * The mark's color continuously reads the background under the pointer
 * (sampled via elementFromPoint) and eases between near-black and
 * near-bone so it stays visible over both the dark sections and the light
 * ones — a smooth crossfade, never an instant swap.
 *
 * Hides itself (rather than drawing on top) over anything with a real
 * native cursor of its own — text fields and <select> — and pre-emptively
 * fades out before the pointer reaches the browser's own scrollbar, which
 * lives outside the document and can never be told to hide its cursor.
 *
 * Desktop-with-a-mouse only: bails out entirely under touch/coarse pointers
 * and prefers-reduced-motion, leaving the native cursor (and its own
 * pointer/default icon) untouched in both cases.
 */
export function CustomCursor() {
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const [state, setState] = useState<CursorState>("idle");
  const [markColor, setMarkColor] = useState(NEAR_BLACK);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Tight, low-mass spring: reads as a precise instrument tracking the
  // pointer, not a floaty/playful trailing effect. Overdamped on purpose
  // (damping > critical) so this is the one motion in the component that's
  // still a spring — it can't overshoot.
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

      // The native scrollbar lives outside the document — the pointer just
      // stops generating events over it, so a mark left mid-transition (or
      // in "hover"/"click" state) would sit there as a frozen ghost. Fade
      // out a little before the actual edge instead of waiting to find out.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0 && e.clientX >= document.documentElement.clientWidth - 16) {
        setVisible(false);
      }

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

      if (target.closest?.(NATIVE_SELECTOR)) {
        setSuppressed(true);
        setState("idle");
        return;
      }
      setSuppressed(false);

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

  const colorTransition = { duration: 0.35, ease: "easeInOut" as const };
  const shapeTransition = { duration: 0.2, ease: EASE };

  // radius + fill/stroke read straight off state — one circle, three sizes,
  // never more than one property group changing shape at once.
  const radius = state === "hover" ? 10 : state === "click" ? 6 : 2.5;
  const filled = state !== "hover";

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[999] pointer-events-none"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible && !suppressed ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <motion.circle
          cx="14"
          cy="14"
          initial={false}
          animate={{
            r: radius,
            fill: filled ? markColor : "transparent",
            stroke: markColor,
          }}
          strokeWidth="1.25"
          transition={{ r: shapeTransition, fill: colorTransition, stroke: colorTransition }}
        />
      </svg>
    </motion.div>
  );
}
