"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useTransform, easeIn } from "framer-motion";
import { Eyebrow } from "./eyebrow";
import { usePlateProgress } from "./plate-chapter";

export type HeroLink = {
  index: string;
  label: string;
  caption: string;
  href: string;
};

/**
 * Hlavní deska webu — jedna fotka přes celou šířku.
 *
 * Nahradila diptych (dvě poloviny, Střechy | Domy). Majitel chtěl hero
 * „jednotné, ne na dvě poloviny“: firma je jedna, a krov na dřevostavbě
 * ukáže oba obory v jednom záběru. Dva obory pořád zůstávají vidět — jako
 * dva odkazy nahoře, kde dřív visely popisky polovin.
 *
 * Pohyb je převzatý z diptychu: vstup běží v CSS (.hero-curtain/.hero-rise
 * v globals.css, aby nadpis nečekal na JavaScript), odchod jede ze scrollu
 * přes celý rozsah [0, 1] — useTransform s kratším oknem se při zpětném
 * zakolísání scrollu „odklapne“ a blikne (viz historie hero-diptych.tsx).
 */
export function HeroMain({
  eyebrow,
  title,
  lead,
  actions,
  meta = [],
  src,
  alt,
  links = [],
}: {
  /** Volitelný: nad nadpisem „Střechy a dřevostavby na Moravě“ by stejná
   *  slova jen opakoval, proto ho homepage nepředává. */
  eyebrow?: string;
  title: ReactNode;
  lead: string;
  actions?: ReactNode;
  meta?: { label: string; value: string }[];
  src: string;
  alt: string;
  links?: HeroLink[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Jako deska PlateChapteru je hero přišpendlené a jeho vlastní useScroll by
  // zamrzl — progres pak dodá list, který ho přejíždí.
  const plateProgress = usePlateProgress();
  const { scrollYProgress: ownProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = plateProgress ?? ownProgress;

  // Fotka je nejvzdálenější vrstva: pomalý drift a ztmavení. Text je blíž,
  // odjíždí rychleji a na křivce ease-in, takže chvíli zůstane a pak zmizí.
  const photoY = useTransform(progress, [0, 1], [0, 90]);
  const photoDim = useTransform(progress, [0, 1], [1, 0.55]);
  const textY = useTransform(progress, [0, 1], [0, -180]);
  const textOpacity = useTransform(progress, [0, 1], [1, 0], { ease: easeIn });

  const rise = (d: number) => ({ className: "hero-rise", style: { "--d": `${d}s` } as CSSProperties });

  return (
    <section ref={ref} className="hero-viewport relative isolate flex items-end overflow-hidden bg-graphite-900">
      <div aria-hidden className="hero-curtain absolute inset-0" style={{ "--d": reduce ? "0s" : "0.05s" } as CSSProperties}>
        <m.div className="absolute inset-0" style={reduce ? undefined : { y: photoY, opacity: photoDim }}>
          {/* -inset-y: rezerva, aby drift fotky nikdy neodkryl holý okraj */}
          <div className="absolute -inset-y-[110px] inset-x-0">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="100vw"
              // Těžiště krovu je vpravo od středu; na úzkém displeji ho
              // posunutý střed ořezu udrží v záběru.
              className="object-cover object-[62%_center]"
            />
          </div>
        </m.div>
      </div>

      <span aria-hidden className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "var(--overlay-photo)" }} />
      {/* Horní clona: obloha je světlá a odkazy na obory stojí na ní. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40"
        style={{ background: "linear-gradient(180deg, rgba(10,12,13,.6) 0%, rgba(10,12,13,0) 100%)" }}
      />

      {links.length > 0 && (
        <nav
          aria-label="Obory"
          {...rise(0.4)}
          className="hero-rise container-tatai absolute inset-x-0 top-0 z-[2] flex gap-10 pt-8 sm:pt-10 max-sm:gap-6!"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative grid content-start gap-1.5 no-underline">
              <span className="flex items-center gap-2 font-mono text-eyebrow tracking-eyebrow uppercase text-inverse">
                <span className="text-signal-500">{l.index}</span>
                <span className="text-graphite-400">—</span>
                {l.label}
              </span>
              <span className="hidden font-mono text-eyebrow tracking-mono text-graphite-300 sm:block">{l.caption}</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-2 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          ))}
        </nav>
      )}

      <m.div
        className="container-tatai relative z-[2] grid w-full gap-6 pb-[clamp(4rem,7vh,5.5rem)] pt-[clamp(7rem,18vh,14rem)] sm:gap-8 max-sm:gap-5! max-sm:pt-16! max-sm:pb-8!"
        style={reduce ? undefined : { y: textY, opacity: textOpacity }}
      >
        {eyebrow && (
          <div {...rise(0.45)} className="hero-rise max-sm:hidden">
            <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
          </div>
        )}

        <h1
          className="hero-rise max-w-[16ch] font-display font-medium tracking-display text-inverse"
          style={{ ...rise(0.5).style, fontSize: "clamp(2.25rem, 5.6vw, 5.25rem)", lineHeight: 1.02 }}
        >
          {title}
        </h1>

        <p {...rise(0.58)} className="hero-rise max-w-[46ch] text-lead leading-snug text-inverse-muted">
          {lead}
        </p>

        {actions && (
          <div {...rise(0.66)} className="hero-rise flex flex-wrap gap-3 sm:gap-4">
            {actions}
          </div>
        )}

        {meta.length > 0 && (
          <dl
            {...rise(0.74)}
            className="hero-rise m-0 flex flex-wrap gap-x-8 gap-y-4 border-t border-border-inverse pt-6 sm:gap-x-12 sm:pt-8 max-sm:grid! max-sm:grid-cols-3! max-sm:gap-x-4! max-sm:pt-5!"
          >
            {meta.map((item) => (
              <div key={item.label} className="grid gap-1.5">
                <dt className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{item.label}</dt>
                <dd className="m-0 font-display text-h3 font-medium tabular-nums text-inverse max-sm:text-h4!">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </m.div>
    </section>
  );
}
