"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./eyebrow";
import type { ProcessStep } from "@/lib/data";

/**
 * The five process steps, read as one scroll.
 *
 * A tall track holds a pinned panel: the heading and the steps on the left,
 * the photo of the step you're on beside them, and each step's rail filling
 * with signal cyan as its share of the scroll goes by. The accent line doubles
 * as the progress indicator — the same signal rule that marks every chapter
 * opening elsewhere, so the page keeps one vocabulary for "you are here".
 *
 * Two different kinds of state on purpose:
 *
 * - The rail fill is **continuous**, straight off a MotionValue. It's the
 *   progress read-out, so it has to track the scrollbar exactly, and driving
 *   it through useTransform writes to the DOM outside React — no re-render
 *   per frame.
 * - Which step is **active** is discrete, and only that drives the photo and
 *   the highlight. Cross-fading the photos on scroll position meant stopping
 *   mid-fade left two photos half-visible, which looks broken rather than
 *   deliberate. Keyed to an index instead, the fade is a fixed half-second
 *   triggered when the index changes, so wherever the reader stops they land
 *   on exactly one photo and exactly one lit step. It re-renders five times
 *   across the whole section, not once a frame.
 *
 * Below lg the panel doesn't pin at all: the heading plus five steps won't sit
 * on a phone screen at once, so it flows normally with every step lit and the
 * photos dropped. Same under prefers-reduced-motion.
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
  const { scrollYProgress } = useScroll({ target: ref });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    // React bails out when the value is unchanged, so this is a no-op on all
    // but the four frames where the step actually turns over.
    setActive(next);
  });

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
                  active={!!reduce || i === active}
                  reduce={!!reduce}
                />
              ))}
            </ol>
          </div>

          <div className="relative hidden lg:block lg:h-full">
            {steps.map((step, i) =>
              step.src ? (
                <motion.div
                  key={step.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: (reduce ? i === 0 : i === active) ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
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
  active,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  reduce: boolean;
}) {
  // The step's own slice of the track. useTransform clamps outside its input
  // range, so steps already passed hold a full rail and later ones stay empty.
  const fill = useTransform(progress, [index / total, (index + 1) / total], ["0%", "100%"]);

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
      <div className="flex flex-col items-center gap-3">
        <span
          className={`font-mono text-eyebrow tracking-eyebrow tabular-nums transition-colors duration-500 ${
            active ? "text-signal-500" : "text-graphite-500"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Below lg the track itself is the accent, so the rail reads as
            complete without the scroll-linked fill, which is hidden there. */}
        <div className="relative w-0.5 flex-1 bg-signal-500 lg:bg-border-inverse">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 hidden bg-signal-500 lg:block"
            style={{
              height: reduce ? "100%" : fill,
              boxShadow: active ? "0 0 14px rgba(0, 168, 224, 0.65)" : "none",
            }}
          />
        </div>
      </div>

      <div
        className={`grid gap-1.5 pb-1 transition-opacity duration-500 ${active ? "opacity-100" : "lg:opacity-40"}`}
      >
        <h3 className="font-display text-h4 font-medium tracking-heading text-inverse">{step.title}</h3>
        <p className="max-w-[44ch] text-body-sm leading-body text-inverse-muted">{step.body}</p>
        {step.meta && <span className="font-mono text-caption text-graphite-300">{step.meta}</span>}
      </div>
    </li>
  );
}
