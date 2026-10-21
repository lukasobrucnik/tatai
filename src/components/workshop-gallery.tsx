"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PhotoLightbox } from "@/components/photo-lightbox";
import type { BuildStep, HallPhoto } from "@/lib/data";

/**
 * Výroba v hale, ukázaná jako postup: jeden široký záběr haly a pod ním
 * čtyři snímky od rámu po hotový dílec. Nahrazuje dvě galerie „Hala sever /
 * Hala jih“ — rozdělení podle hal zákazníkovi nic neříkalo, pořadí od rámu
 * po stěnu s okny mu řekne, co se v hale děje, bez jediného odstavce.
 *
 * Zbytek fotek je za tlačítkem v jednom lightboxu, ne v rozbalovacím listu:
 * stránka má být krátká a archiv tam čte jen ten, kdo o něj stojí.
 */
export function WorkshopGallery({
  lead,
  steps,
  photos,
}: {
  lead: HallPhoto;
  steps: BuildStep[];
  /** Všechny fotky pro lightbox. `lead` a `steps` v něm musí být na začátku
   *  ve stejném pořadí — podle toho se dopočítává index po kliknutí. */
  photos: HallPhoto[];
}) {
  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-(--grid-gap)">
        <Tile
          src={lead.src}
          alt="Výrobní hala TATAI s rozpracovanými dílci domů"
          aspect="21/9"
          sizes="100vw"
          onClick={() => setViewing(0)}
          className="max-sm:aspect-4/3!"
        >
          <span className="absolute bottom-0 left-0 bg-graphite-1000/80 px-3 py-2 font-mono text-eyebrow tracking-eyebrow uppercase text-bone-100">
            Naše hala — tady vznikají vaše domy
          </span>
        </Tile>

        <ol className="m-0 grid list-none grid-cols-4 gap-(--grid-gap) p-0 max-lg:grid-cols-2!">
          {steps.map((s, i) => (
            <li key={s.src} className="grid content-start gap-4">
              <Tile
                src={s.src}
                alt={`${s.title} — ${s.note}`}
                aspect="4/3"
                sizes="(min-width: 1024px) 25vw, 50vw"
                onClick={() => setViewing(i + 1)}
              >
                <span className="absolute top-0 left-0 bg-bone-100 px-2.5 py-1.5 font-mono text-eyebrow tabular-nums tracking-eyebrow text-graphite-1000">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Tile>
              <div className="grid gap-1 border-t border-border-hairline pt-4">
                <span className="font-display text-h4 font-medium tracking-heading text-strong">{s.title}</span>
                <span className="text-body-md leading-snug text-body">{s.note}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="pt-2">
          <Button variant="outline" onClick={() => setViewing(0)}>
            + Všech {photos.length} fotek z haly
          </Button>
        </div>
      </div>

      <PhotoLightbox
        photos={photos}
        index={viewing}
        label="Výroba v hale"
        onClose={() => setViewing(null)}
        onIndexChange={setViewing}
      />
    </>
  );
}

/**
 * Klikatelná fotka. Obrázek je uvnitř tlačítka přímo, ne přes `Photo` —
 * `Photo` je `<figure>`, a to se podle specifikace do `<button>` vložit nesmí.
 * Hover zoom a signal podtržení jsou ale stejné jako u `Photo`.
 */
function Tile({
  src,
  alt,
  aspect,
  sizes,
  onClick,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${alt}, otevřít`}
      className={`group relative w-full cursor-pointer overflow-hidden border-0 bg-surface-page p-0 dot-grid-light ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
      />
      {children}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </button>
  );
}
