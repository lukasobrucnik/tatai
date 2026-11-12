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
 * dva odkazy s typy vpravo dole, na stejné lince jako čísla.
 *
 * Pohyb je převzatý z diptychu: vstup běží v CSS (.hero-curtain/.hero-rise
 * v globals.css, aby nadpis nečekal na JavaScript), odchod jede ze scrollu
 * přes celý rozsah [0, 1] — useTransform s kratším oknem se při zpětném
 * zakolísání scrollu „odklapne“ a blikne (viz historie hero-diptych.tsx).
 */
export function HeroMain({
  eyebrow,
  tag,
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
  /** Štítek v pravém horním rohu fotky (jen široké displeje). */
  tag?: string;
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
  // Pod „omezit pohyb“ se rozsahy zploští na nulový pohyb, styl ale zůstává:
  // server preferenci nezná a podmíněný `style={undefined}` rozbil hydrataci.
  const photoY = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const photoDim = useTransform(progress, [0, 1], reduce ? [1, 1] : [1, 0.55]);
  const textY = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -180]);
  const textOpacity = useTransform(progress, [0, 1], reduce ? [1, 1] : [1, 0], { ease: easeIn });

  const rise = (d: number) => ({ className: "hero-rise", style: { "--d": `${d}s` } as CSSProperties });

  return (
    <section ref={ref} className="hero-viewport relative isolate flex flex-col overflow-hidden bg-graphite-900">
      <div aria-hidden className="hero-curtain absolute inset-0" style={{ "--d": "0.05s" } as CSSProperties}>
        <m.div className="absolute inset-0" style={{ y: photoY, opacity: photoDim }}>
          {/* -inset-y: rezerva, aby drift fotky nikdy neodkryl holý okraj.
              Na telefonu fotka kryje jen horní část hera: přes celou výšku
              by se z ní na úzkém displeji vešel jen rozmazaný výřez trámů.
              Takhle je vidět krov i tesař a text stojí na čistém grafitu. */}
          <div className="absolute -inset-y-[110px] inset-x-0 max-sm:bottom-[40%]!">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="100vw"
              // Těžiště krovu je vpravo od středu; na úzkém displeji ho
              // posunutý střed ořezu udrží v záběru.
              className="object-cover object-[62%_center] max-sm:object-[68%_center]!"
            />
          </div>
        </m.div>
      </div>

      {/* Clona jen tam, kde stojí text (.hero-scrim v globals.css): na šířku
          zleva, na telefonu zdola. Pravá část fotky — krov a tesař — zůstává
          čistá. Dřívější clona přes celou plochu dělala z fotky šedou kaši. */}
      <span aria-hidden className="hero-scrim pointer-events-none absolute inset-0 z-[1]" />

      {tag && (
        <div className="container-tatai pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-end pt-8 max-lg:hidden">
          <span
            {...rise(0.9)}
            className="hero-rise flex items-center gap-3 bg-graphite-1000/80 px-3.5 py-2 font-mono text-eyebrow uppercase tracking-eyebrow text-inverse"
          >
            <span aria-hidden className="size-1.5 bg-signal-500" />
            {tag}
          </span>
        </div>
      )}

      <m.div
        className="container-tatai relative z-[2] mt-auto grid w-full gap-6 pb-[clamp(2rem,5vh,3.5rem)] pt-[clamp(6rem,14vh,11rem)] sm:gap-8 max-sm:gap-5! max-sm:pt-16! max-sm:pb-7!"
        style={{ y: textY, opacity: textOpacity }}
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
      </m.div>

      {(meta.length > 0 || links.length > 0) && (
        // Spodní řádek: jedna vlasová linka přes šířku a pod ní čísla (vlevo)
        // a oba obory s typy (vpravo). Bez pozadí, bez buněk a dělítek —
        // plná lišta s krabičkami působila jako cizí panel přilepený na
        // fotku. Všech pět položek má stejnou typografii, takže řádek čte
        // jako jeden celek. Stojí mimo text, který při scrollu odjíždí.
        // Obory na telefonu vynecháváme: má je menu.
        <div {...rise(0.74)} className="hero-rise container-tatai relative z-[2] w-full">
          <div className="flex items-start justify-between gap-x-12 border-t border-border-inverse pb-8 pt-6 max-sm:pb-6! max-sm:pt-5!">
            {meta.length > 0 && (
              <dl className="m-0 flex gap-x-12 max-sm:grid! max-sm:w-full! max-sm:grid-cols-3! max-sm:gap-x-4!">
                {meta.map((item) => (
                  <div key={item.label} className="grid content-start gap-1.5">
                    <dt className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{item.label}</dt>
                    <dd className="m-0 font-display text-h4 font-medium tabular-nums text-inverse">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {links.length > 0 && (
              <nav aria-label="Obory" className="flex gap-x-12 max-lg:hidden">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="group grid content-start gap-1.5 no-underline">
                    <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{l.label}</span>
                    <span className="relative flex items-center gap-2.5 font-display text-h4 font-medium text-inverse">
                      {l.caption}
                      <span aria-hidden className="text-signal-500 transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1.5 h-px origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

