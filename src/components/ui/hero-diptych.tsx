"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./eyebrow";

/** DS motion: "things reveal, they never bounce" — --ease-out from the token set. */
const EASE = [0.16, 1, 0.3, 1] as const;

export type DiptychPanel = {
  src: string;
  alt: string;
  index: string;
  label: string;
  caption: string;
  href: string;
};

function Panel({
  panel,
  delay,
  y,
  priority,
}: {
  panel: DiptychPanel;
  delay: number;
  y?: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      <motion.a
        href={panel.href}
        aria-label={`${panel.label} — ${panel.caption}`}
        className="group absolute inset-0 block no-underline"
        initial={{ y: "101%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        <motion.div className="absolute inset-0" style={y ? { y } : undefined}>
          {/* -inset-y stretches the frame so parallax never exposes a bare edge */}
          <div className="absolute -inset-y-8 inset-x-0">
            <Image
              src={panel.src}
              alt={panel.alt}
              fill
              priority={priority}
              sizes="50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
          </div>
        </motion.div>

        {/* resting tint, lifts on hover so the hovered half reads as "focused" */}
        <span
          aria-hidden
          className="absolute inset-0 bg-graphite-1000/25 transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* top scrim: the sky in these photos is bright, the label sits on it */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(180deg, rgba(10,12,13,.6) 0%, rgba(10,12,13,0) 100%)" }}
        />
        {/* DS accent line — same gesture as PillarSplit / MaterialStrip */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        {/* caption is desktop-only: at 320px each half is ~160px wide and a long
            caption ("Sloupkové, CLT, roubenky") would overflow the panel */}
        <span className="absolute left-(--container-gutter) top-8 grid max-w-[calc(100%-var(--container-gutter))] gap-1.5 sm:top-10">
          <span className="flex items-center gap-2 font-mono text-eyebrow tracking-eyebrow uppercase text-inverse">
            <span className="text-signal-500">{panel.index}</span>
            <span className="text-graphite-400">—</span>
            {panel.label}
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 sm:hidden"
            >
              →
            </span>
          </span>
          <span className="hidden items-center gap-2 font-mono text-eyebrow tracking-mono text-graphite-300 sm:flex">
            {panel.caption}
            <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </span>
      </motion.a>
    </div>
  );
}

export function HeroDiptych({
  eyebrow,
  title,
  lead,
  actions,
  meta = [],
  left,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
  meta?: { label: string; value: string }[];
  left: DiptychPanel;
  right: DiptychPanel;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // counter-drifting halves: transform-only, cheap enough to keep on mobile
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section ref={ref} className="hero-viewport relative isolate flex items-end overflow-hidden bg-graphite-900">
      {/* not aria-hidden: these panels contain the two real navigation links */}
      <div className="absolute inset-0 grid grid-cols-2">
        <Panel panel={left} delay={reduce ? 0 : 0.05} y={reduce ? undefined : yLeft} priority />
        <Panel panel={right} delay={reduce ? 0 : 0.17} y={reduce ? undefined : yRight} priority />
      </div>

      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-1/2 z-[1] w-px origin-top bg-border-inverse"
        initial={reduce ? undefined : { scaleY: 0 }}
        animate={reduce ? undefined : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
      />

      <span aria-hidden className="absolute inset-0 z-[1]" style={{ background: "var(--overlay-photo)" }} />

      <div className="container-tatai relative z-[2] grid w-full gap-6 pb-[clamp(2.5rem,6vh,5rem)] pt-[clamp(5rem,16vh,13rem)] sm:gap-8">
        <motion.div {...rise} transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}>
          <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          {...rise}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="max-w-[18ch] font-display font-medium tracking-display text-inverse"
          style={{ fontSize: "clamp(2.25rem, 5.6vw, 5.25rem)", lineHeight: 1.02 }}
        >
          {title}
        </motion.h1>

        <motion.p
          {...rise}
          transition={{ duration: 0.8, ease: EASE, delay: 0.63 }}
          className="max-w-[46ch] text-lead leading-snug text-inverse-muted"
        >
          {lead}
        </motion.p>

        {actions && (
          <motion.div
            {...rise}
            transition={{ duration: 0.8, ease: EASE, delay: 0.71 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {actions}
          </motion.div>
        )}

        {meta.length > 0 && (
          <motion.dl
            {...rise}
            transition={{ duration: 0.8, ease: EASE, delay: 0.79 }}
            className="m-0 hidden flex-wrap gap-8 border-t border-border-inverse pt-6 sm:flex sm:gap-12 sm:pt-8"
          >
            {meta.map((m) => (
              <div key={m.label} className="grid gap-1.5">
                <dt className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{m.label}</dt>
                <dd className="m-0 font-display text-h3 font-medium tabular-nums text-inverse">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
