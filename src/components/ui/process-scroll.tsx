"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ProcessStep } from "@/lib/data";

/**
 * The five process steps, read as one scroll.
 *
 * A tall track holds a pinned panel: the steps sit on the left, the photo of
 * whichever step you're on sits on the right, and each step's rail fills with
 * signal cyan as its share of the scroll goes by. So the section doesn't just
 * list a sequence — you travel through it, and the accent line doubles as the
 * progress indicator, which is the same signal rule that marks every chapter
 * opening elsewhere on the page.
 *
 * Everything is driven straight off MotionValues rather than React state.
 * Pushing scroll progress through `useState` (as the pattern this is based on
 * does) re-renders the whole section on every scroll frame; `useTransform`
 * writes to the DOM outside React entirely, so a five-step panel with five
 * photos costs nothing per frame.
 *
 * Under prefers-reduced-motion the track collapses to its natural height, the
 * panel stops pinning, and every step renders complete and lit — the sequence
 * still reads, it just doesn't animate.
 */
export function ProcessScroll({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <div
      ref={ref}
      // Scroll budget for the whole sequence. The pinned panel is one screen,
      // so the travel is this minus one screen — roughly half a screen of
      // scroll per step. Shorter on phones, where the same distance drags.
      className={reduce ? "" : "h-[280vh] lg:h-[420vh]"}
    >
      <div
        className={
          reduce
            ? "grid gap-12"
            : "sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] items-center overflow-hidden"
        }
      >
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-(--grid-gap)">
          <ol className="m-0 grid list-none gap-8 p-0 lg:gap-10">
            {steps.map((step, i) => (
              <StepRow
                key={step.title}
                step={step}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
                reduce={!!reduce}
              />
            ))}
          </ol>

          {/* Photos only above lg: below it the panel is already tight with
              five steps, and a stacked image would push the sequence off the
              screen it's pinned to. */}
          <div className="relative hidden h-full lg:block">
            {steps.map((step, i) =>
              step.src ? (
                <StepPhoto
                  key={step.title}
                  step={step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                  reduce={!!reduce}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The slice of overall progress belonging to one step. */
function stepRange(index: number, total: number) {
  return { start: index / total, end: (index + 1) / total };
}

function StepRow({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const { start, end } = stepRange(index, total);
  // Rail fills across the step's own slice. useTransform clamps outside the
  // input range, so earlier steps stay full and later ones stay empty.
  const fill = useTransform(progress, [start, end], ["0%", "100%"]);
  // Lights up just before its slice begins, so the step you're arriving at is
  // already legible rather than brightening once you're past its start.
  const lit = useTransform(progress, [start - 0.04, start], [0.35, 1]);

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-eyebrow tracking-eyebrow tabular-nums text-signal-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative w-0.5 flex-1 bg-border-inverse">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 block bg-signal-500"
            style={reduce ? { height: "100%" } : { height: fill }}
          />
        </div>
      </div>

      <motion.div className="grid gap-2 pb-2" style={reduce ? undefined : { opacity: lit }}>
        <h3 className="font-display text-h4 font-medium tracking-heading text-inverse">{step.title}</h3>
        <p className="max-w-[46ch] text-body-md leading-body text-inverse-muted">{step.body}</p>
        {step.meta && <span className="font-mono text-caption text-graphite-300">{step.meta}</span>}
      </motion.div>
    </li>
  );
}

function StepPhoto({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const { start, end } = stepRange(index, total);
  // Cross-fade inside the step's own slice: up as it begins, down as the next
  // one takes over. The first photo starts already visible, and the last one
  // stays rather than fading to an empty frame at the end of the track.
  const fade = useTransform(
    progress,
    [start - 0.06, start, end - 0.06, end],
    [0, 1, 1, index === total - 1 ? 1 : 0],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={reduce ? { opacity: index === 0 ? 1 : 0 } : { opacity: fade }}
    >
      <Image
        src={step.src!}
        alt={step.alt ?? ""}
        fill
        sizes="(min-width: 1024px) 45vw, 0px"
        className="object-cover"
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-graphite-1000/20" />
    </motion.div>
  );
}
