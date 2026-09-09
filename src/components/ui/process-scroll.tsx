"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Eyebrow } from "./eyebrow";
import type { ProcessStep } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;
/** Matches the `lg:` breakpoint the layout below is built on. */
const DESKTOP_QUERY = "(min-width: 1024px)";
const railFillClass = "absolute inset-x-0 top-0 block bg-signal-500";

/**
 * The five process steps, read as one scroll.
 *
 * Desktop pins a panel — heading and steps on the left, the photo of the step
 * you're on beside them — and scrubs through the steps as the track passes.
 * Phones get the same sequence without the pinning: the heading and five steps
 * will not sit on one small screen at once, and a pinned viewport-height panel
 * is exactly what breaks when iOS shows and hides its address bar mid-scroll.
 *
 * Both keep the rail and the highlight, but they cannot come from the same
 * source. Pinned, the steps hold still while the page scrolls, so progress has
 * to come from the track around them. Flowing, the steps move through the
 * viewport themselves, so each one reads its own position. Hence the
 * breakpoint check rather than a CSS-only split: this is behaviour, not layout.
 *
 * Which step is highlighted is deliberately discrete in both. Scrubbing it
 * continuously meant every step you had passed stayed lit, and cross-fading
 * the photos on scroll position left two of them half-visible if you stopped
 * mid-fade. Keyed to a single active step, wherever the reader stops they land
 * on exactly one lit step and one photo.
 */
export function ProcessScroll({
  steps,
  eyebrow,
  title,
  lead,
}: {
  steps: ProcessStep[];
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    // React bails out when the value is unchanged, so this is a no-op on every
    // frame except the four where the step actually turns over.
    setActive(next);
  });

  const pinned = isDesktop && !reduce;

  return (
    <div ref={ref} className={reduce ? "" : "lg:h-[320vh]"}>
      <div
        className={
          reduce
            ? ""
            : "lg:sticky lg:top-(--header-h) lg:flex lg:h-[calc(100svh-var(--header-h))] lg:items-stretch lg:py-14"
        }
      >
        <div className="grid w-full gap-12 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-(--grid-gap)">
          <div className="grid content-center gap-10">
            <header className="grid gap-4">
              <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
              <h2 className="text-h2 font-display font-medium tracking-heading leading-heading text-inverse">{title}</h2>
              {lead && <p className="max-w-[46ch] text-body-lg leading-snug text-inverse-muted">{lead}</p>}
            </header>

            <ol className="m-0 grid list-none gap-6 p-0">
              {steps.map((step, i) => (
                <StepRow
                  key={step.title}
                  step={step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                  pinned={pinned}
                  reduce={!!reduce}
                  activeWhenPinned={i === active}
                />
              ))}
            </ol>
          </div>

          {/* Photos are desktop-only. The container is display:none below lg
              and every image is lazy, so a phone never fetches one — they are
              a supplement to the sequence, not part of reading it. */}
          <div className="relative hidden lg:block lg:h-full">
            {steps.map((step, i) =>
              step.src ? (
                <motion.div
                  key={step.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: (reduce ? i === 0 : i === active) ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                >
                  <Image src={step.src} alt={step.alt ?? ""} fill sizes="(min-width: 1024px) 45vw, 0px" className="object-cover" />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-graphite-1000/20" />
                </motion.div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepRow({
  step,
  index,
  total,
  progress,
  pinned,
  reduce,
  activeWhenPinned,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  pinned: boolean;
  reduce: boolean;
  activeWhenPinned: boolean;
}) {
  const rowRef = useRef<HTMLLIElement>(null);
  // Flowing, a step is the one being read while it crosses the middle band of
  // the screen. Pinned, it can't be — the steps don't move — so the parent's
  // index decides instead.
  const inReadingBand = useInView(rowRef, { margin: "-45% 0px -45% 0px" });
  const active = reduce || (pinned ? activeWhenPinned : inReadingBand);

  // Pinned: the rail is scrubbed by the track, so it tracks the scrollbar
  // exactly and steps already passed hold a full rail (useTransform clamps
  // outside its input range).
  const scrubbedFill = useTransform(progress, [index / total, (index + 1) / total], ["0%", "100%"]);
  const glow = active ? "0 0 14px rgba(0, 168, 224, 0.65)" : "none";

  return (
    <li ref={rowRef} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
      <div className="flex flex-col items-center gap-3">
        <span
          className={`font-mono text-eyebrow tracking-eyebrow tabular-nums transition-colors duration-500 ${
            active ? "text-signal-500" : "text-graphite-500"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative w-0.5 flex-1 bg-border-inverse">
          {pinned || reduce ? (
            <motion.span
              aria-hidden
              className={railFillClass}
              style={{ height: reduce ? "100%" : scrubbedFill, boxShadow: glow }}
            />
          ) : (
            // Flowing, the rail fills once as the step arrives and then stays
            // full, so the finished part of the sequence reads as done.
            <motion.span
              aria-hidden
              className={railFillClass}
              style={{ boxShadow: glow }}
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          )}
        </div>
      </div>

      <div className={`grid gap-1.5 pb-1 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}>
        <h3 className="font-display text-h4 font-medium tracking-heading text-inverse">{step.title}</h3>
        <p className="max-w-[44ch] text-body-sm leading-body text-inverse-muted">{step.body}</p>
        {step.meta && <span className="font-mono text-caption text-graphite-300">{step.meta}</span>}
      </div>
    </li>
  );
}

/**
 * Whether the viewport is at the `lg` breakpoint, as a render-safe value.
 *
 * The server has no viewport, so it reports the phone layout and the client
 * corrects on hydration. Only the animation *source* depends on this — the
 * layout itself is plain `lg:` CSS — so a desktop visitor can't see a wrong
 * layout in the meantime.
 */
function useIsDesktop() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(DESKTOP_QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}
