"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhotoLightbox } from "@/components/photo-lightbox";
import type { Hall } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fotky nad tímhle indexem leží v kontaktním listu za tlačítkem. Vedoucí
 *  záběr plus tři do filmstripu je tolik, kolik jde ukázat, aniž by sekce
 *  přebila kapitolu, ve které sedí. */
const VISIBLE = 4;

/**
 * Fotogalerie výroby — dvě haly pod sebou, jeden lightbox pro obě.
 *
 * Vědomě bez popisků. K fotkám jsme od majitele nedostali žádný technický
 * kontext a vymýšlet, co je na které fotce za vrstvu, by šlo proti tomu, čím
 * se web na každé druhé stránce zaštiťuje. Takže jen název haly a číslo
 * snímku — metadata, ne tvrzení.
 */
export function HallGalleries({ halls }: { halls: Hall[] }) {
  // Lightbox drží obě souřadnice: kterou halu prohlížíme a kolikátou fotku.
  // Šipky pak cyklí uvnitř jedné haly, ne napříč oběma.
  const [viewing, setViewing] = useState<{ hall: number; photo: number } | null>(null);
  const activeHall = viewing ? halls[viewing.hall] : null;

  return (
    <>
      <div className="grid gap-(--section-y-md)">
        {halls.map((hall, i) => (
          <HallGallery
            key={hall.id}
            hall={hall}
            index={String(i + 1).padStart(2, "0")}
            /** Druhá hala se od první odděluje linkou a odsazením, ne rámem —
             *  hloubka je v tomhle systému vlásová linka, ne stín. */
            separated={i > 0}
            onOpen={(photo) => setViewing({ hall: i, photo })}
          />
        ))}
      </div>

      <PhotoLightbox
        photos={activeHall?.photos ?? []}
        index={viewing?.photo ?? null}
        label={activeHall?.name ?? ""}
        onClose={() => setViewing(null)}
        onIndexChange={(photo) => setViewing((v) => (v ? { ...v, photo } : v))}
      />
    </>
  );
}

function HallGallery({
  hall,
  index,
  separated,
  onOpen,
}: {
  hall: Hall;
  index: string;
  separated: boolean;
  onOpen: (photo: number) => void;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const [lead, ...rest] = hall.photos;
  const strip = rest.slice(0, VISIBLE - 1);
  const sheet = rest.slice(VISIBLE - 1);
  const sheetId = `hala-${hall.id}-vice`;

  return (
    <div className={`grid gap-(--grid-gap) ${separated ? "border-t border-border-hairline pt-(--section-y-sm)" : ""}`}>
      {/* Hlavička haly. Jméno haly je podnadpis, ne metadata — proto Archivo
          v titulkové velikosti, a ne mono jako popisky kolem. Číslo a počet
          snímků kolem něj metadata zůstávají, takže mono nesou dál ony.
          Signal tick značí, kde měřená věc začíná — stejné gesto jako
          u statistik na plátně O nás. */}
      <div className="relative flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border-strong pt-5">
        <span aria-hidden className="absolute -top-px left-0 h-px w-[22px] bg-signal-500" />
        <h3 className="flex items-baseline gap-4 font-display text-h4 font-medium tracking-heading text-strong">
          <span className="font-mono text-caption tabular-nums tracking-eyebrow text-signal-600">{index}</span>
          {hall.name}
        </h3>
        <span className="font-mono text-eyebrow tabular-nums tracking-eyebrow uppercase text-muted">
          {hall.photos.length} fotek
        </span>
      </div>

      <Tile
        src={lead.src}
        n={1}
        hall={hall.name}
        aspect="16/9"
        sizes="(min-width: 1024px) 66vw, 100vw"
        onClick={() => onOpen(0)}
      />

      <div className="grid grid-cols-3 gap-(--grid-gap) max-sm:grid-cols-2!">
        {strip.map((photo, i) => (
          <Tile
            key={photo.src}
            src={photo.src}
            n={i + 2}
            hall={hall.name}
            aspect="1/1"
            sizes="(min-width: 640px) 22vw, 45vw"
            onClick={() => onOpen(i + 1)}
          />
        ))}
      </div>

      {sheet.length > 0 && (
        <>
          {/* Wrapper drží id trvale, i když je list složený — aria-controls
              musí na něco ukazovat v obou stavech, ne jen v rozbaleném. */}
          <div id={sheetId}>
            {/* Kontaktní list: hustá mřížka bez gutterů, dělená jen prosvítající
                vlásovou linkou. Z kurátorované trojice se po kliknutí stane
                archiv — a ta hustota je celý ten efekt. */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  className="overflow-hidden"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: reduce ? 0.12 : 0.45, ease: EASE }}
                >
                  <div className="grid grid-cols-4 gap-px bg-border-hairline max-sm:grid-cols-3!">
                    {sheet.map((photo, i) => (
                      <Tile
                        key={photo.src}
                        src={photo.src}
                        n={i + VISIBLE + 1}
                        hall={hall.name}
                        aspect="1/1"
                        sizes="(min-width: 640px) 22vw, 30vw"
                        onClick={() => onOpen(i + VISIBLE)}
                        reveal={reduce ? undefined : i * 0.04}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={sheetId}
            >
              {expanded ? "− Skrýt" : `+ Všech ${hall.photos.length} fotek`}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Jedna klikatelná fotka. Obrázek je uvnitř tlačítka přímo, ne přes `Photo` —
 * `Photo` je `<figure>`, a to je flow content, který se do `<button>` podle
 * specifikace nesmí vložit. Hover zoom, index v rohu i signal podtržení jsou
 * ale schválně přesně ty, které používá `Photo` a `ProjectCard`.
 */
function Tile({
  src,
  n,
  hall,
  aspect,
  sizes,
  onClick,
  reveal,
}: {
  src: string;
  /** Číslo snímku v hale, od 1. Nese ho index v rohu i alt text. */
  n: number;
  hall: string;
  aspect: string;
  sizes: string;
  onClick: () => void;
  /** Zpoždění nástupu v kontaktním listu. `undefined` = bez animace. */
  reveal?: number;
}) {
  const label = `${hall} — fotografie ${n}`;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${label}, otevřít`}
      className="group relative w-full cursor-pointer overflow-hidden border-0 bg-surface-page p-0 dot-grid-light"
      style={{ aspectRatio: aspect }}
      initial={reveal === undefined ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: reveal ?? 0 }}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
      />
      <span className="absolute top-0 left-0 bg-bone-100 px-2.5 py-1.5 font-mono text-eyebrow tabular-nums tracking-eyebrow text-graphite-1000">
        {String(n).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </motion.button>
  );
}
