"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
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
  onSettled,
}: {
  panel: DiptychPanel;
  delay: number;
  y?: MotionValue<number>;
  priority?: boolean;
  onSettled?: () => void;
}) {
  return (
    <div className="group relative overflow-hidden">
      <motion.a
        href={panel.href}
        aria-label={`${panel.label} — ${panel.caption}`}
        className="absolute inset-0 block no-underline"
        initial={{ y: "101%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        onAnimationComplete={onSettled}
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
      </motion.a>

      {/* Tint lives OUTSIDE the sliding curtain entirely — a static layer over
          the panel's own (real, final) box, present from the first frame,
          never transformed. It can't lag or bleed-mismatch the photo because
          it isn't part of that animation at all: the curtain simply slides a
          photo in underneath an already-dark pane of glass. pointer-events-
          none so it doesn't block the link/hover beneath it; group-hover
          still fires off the wrapper (now the `group`), not the link. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-graphite-1000/25 transition-opacity duration-500 group-hover:opacity-0"
      />
    </div>
  );
}

/** Rendered as its own top-level layer (see HeroDiptych) — not nested inside a
 * panel's motion.a. Framer Motion puts a `transform` on every motion element,
 * which creates a new stacking context; a label nested in there could never
 * out-rank the section's global photo scrim no matter what z-index it got.
 * Sitting outside fixes that; `pointer-events-none` lets hover/click still
 * reach the real link underneath. */
function PanelLabel({ panel }: { panel: DiptychPanel }) {
  return (
    <div className="grid content-start gap-1.5 pt-8 pl-(--container-gutter) sm:pt-10">
      {/* caption is desktop-only: at 320px each half is ~160px wide and a long
          caption ("Sloupkové, CLT, roubenky") would overflow the panel */}
      <span className="flex items-center gap-2 font-mono text-eyebrow tracking-eyebrow uppercase text-inverse">
        <span className="text-signal-500">{panel.index}</span>
        <span className="text-graphite-400">—</span>
        {panel.label}
      </span>
      <span className="hidden font-mono text-eyebrow tracking-mono text-graphite-300 sm:block">{panel.caption}</span>
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

  // Text block waits until BOTH panels report their curtain slide actually
  // finished — a real completion event, not a guessed wall-clock delay — so
  // it never starts rising while a photo is still visibly sliding in. The
  // tint itself no longer depends on this: it's baked into each panel (see
  // Panel below), so it can't fall out of sync with anything.
  const [settledCount, setSettledCount] = useState(0);
  const settled = !!reduce || settledCount >= 2;
  const onPanelSettled = () => setSettledCount((n) => n + 1);

  const rise = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: settled ? 1 : 0, y: settled ? 0 : 16 },
      };

  return (
    <section ref={ref} className="hero-viewport relative isolate flex items-end overflow-hidden bg-graphite-900">
      {/* not aria-hidden: these panels contain the two real navigation links */}
      <div className="absolute inset-0 grid grid-cols-2">
        <Panel panel={left} delay={reduce ? 0 : 0.05} y={reduce ? undefined : yLeft} priority onSettled={onPanelSettled} />
        <Panel panel={right} delay={reduce ? 0 : 0.17} y={reduce ? undefined : yRight} priority onSettled={onPanelSettled} />
      </div>

      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-1/2 z-[1] w-px origin-top bg-border-inverse"
        initial={reduce ? undefined : { scaleY: 0 }}
        animate={reduce ? undefined : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
      />

      <span aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "var(--overlay-photo)" }} />

      {/* Střechy / Domy labels — above the panels AND above the scrim (see PanelLabel).
          Full-bleed grid matching the (unconstrained) panels grid below, not
          container-tatai — the panels run edge-to-edge, so a centered
          max-width wrapper here would drift out of alignment with them on
          wide screens. Each label insets itself by the gutter instead. */}
      <div className="pointer-events-none absolute inset-0 z-[2] grid grid-cols-2">
        <PanelLabel panel={left} />
        <PanelLabel panel={right} />
      </div>

      <div className="container-tatai relative z-[2] grid w-full gap-6 pb-[clamp(2.5rem,6vh,5rem)] pt-[clamp(5rem,16vh,13rem)] sm:gap-8">
        <motion.div {...rise} transition={{ duration: 0.7, ease: EASE, delay: 0 }}>
          <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          {...rise}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          className="max-w-[18ch] font-display font-medium tracking-display text-inverse"
          style={{ fontSize: "clamp(2.25rem, 5.6vw, 5.25rem)", lineHeight: 1.02 }}
        >
          {title}
        </motion.h1>

        <motion.p
          {...rise}
          transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          className="max-w-[46ch] text-lead leading-snug text-inverse-muted"
        >
          {lead}
        </motion.p>

        {actions && (
          <motion.div
            {...rise}
            transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {actions}
          </motion.div>
        )}

        {meta.length > 0 && (
          <motion.dl
            {...rise}
            transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
            className="m-0 flex flex-wrap gap-x-8 gap-y-4 border-t border-border-inverse pt-6 sm:gap-x-12 sm:pt-8"
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
