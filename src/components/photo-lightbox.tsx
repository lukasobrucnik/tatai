"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { HallPhoto } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Kolik px tažení sepne přechod na další fotku. Pod tím se snímek vrátí zpět. */
const SWIPE_PX = 60;

/**
 * Prohlížeč fotek přes celou obrazovku.
 *
 * Skelet je vědomě stejný jako u InquiryModal — zámek scrollu, Escape, návrat
 * fokusu, zavření kliknutím na pozadí — protože ty čtyři věci jsou na webu už
 * jednou vyřešené a druhá varianta by se od té první časem rozešla. Navíc má
 * jen to, co galerie potřebuje: šipky, klávesnici a počítadlo.
 *
 * Fotka jde `object-contain`, ne `cover`: všude jinde na webu se ořezává,
 * protože fotka je tam kompozice. Tady je fotka obsah, takže se z ní nesmí
 * nic ztratit — proto ta jediná odchylka od zbytku systému.
 */
export function PhotoLightbox({
  photos,
  index,
  label,
  onClose,
  onIndexChange,
}: {
  photos: HallPhoto[];
  /** null = zavřeno. Jinak index do `photos`. */
  index: number | null;
  /** Název haly — nese ho alt text i hlavička dialogu. */
  label: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = photos.length;

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // Dva zámky ze stejného důvodu jako u InquiryModal: Lenis si scroll řídí
    // sám a přes overflow lock by projel, overflow lock zase pokrývá cestu,
    // na které Lenis není (klávesnice, reduced motion, nezhydratovaný JS).
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose, step, lenis]);

  const photo = index === null ? null : photos[index];

  // Do body, ne na místo, kde galerie sedí: galerie je teď uvnitř portálu
  // HALA, který má vlastní stacking context — z-[70] tam platí jen uvnitř
  // něj, takže hlavička i další sekce se kreslily přes lightbox. Na serveru
  // se nic nevykresluje (otevírá se až kliknutím), hydrataci to nerozbije.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — fotografie ${index + 1} z ${count}`}
          className="fixed inset-0 z-[70] grid grid-rows-[auto_1fr_auto] bg-graphite-1000/65"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
        >
          {/* Pozadí zavírá klikem, ale leží pod obsahem, aby šipky a zavírátko
              zůstaly klikatelné. */}
          <div aria-hidden onClick={onClose} className="absolute inset-0" />

          <div className="relative flex items-center justify-between gap-4 px-(--container-gutter) py-5">
            <span aria-hidden />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Zavřít"
              className="grid h-12 w-12 shrink-0 place-items-center border border-bone-100 bg-graphite-1000/70 p-0 text-bone-100 cursor-pointer transition-colors duration-150 hover:border-signal-500 hover:bg-signal-500 hover:text-graphite-1000"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden>
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </button>
          </div>

          <div className="relative min-h-0 px-(--container-gutter) max-sm:px-3">
            {/* Fotka se překreslí přes key, takže při přepnutí prokřížíme starou
                s novou místo bliknutí na prázdno. */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={photo.src}
                className="relative h-full w-full"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: reduce ? 0.12 : 0.24, ease: EASE }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_PX) step(1);
                  else if (info.offset.x > SWIPE_PX) step(-1);
                }}
              >
                <Image
                  src={photo.src}
                  alt={`${label} — fotografie ${index + 1}`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain select-none"
                  draggable={false}
                />
              </m.div>
            </AnimatePresence>
            <NavArrow direction="prev" onClick={() => step(-1)} />
            <NavArrow direction="next" onClick={() => step(1)} />
          </div>

          <div className="relative flex items-center justify-between gap-4 px-(--container-gutter) py-5">
            <span className="font-mono text-caption tabular-nums tracking-mono text-graphite-400">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const next = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Další fotografie" : "Předchozí fotografie"}
      className={`absolute top-1/2 z-10 grid h-14 w-14 -translate-y-1/2 place-items-center border border-bone-100 bg-graphite-1000/70 p-0 font-mono text-h3 leading-none text-bone-100 cursor-pointer transition-colors duration-150 hover:border-signal-500 hover:bg-signal-500 hover:text-graphite-1000 max-sm:h-11 max-sm:w-11 ${next ? "right-(--container-gutter) max-sm:right-2" : "left-(--container-gutter) max-sm:left-2"}`}
    >
      <span aria-hidden>{next ? "›" : "‹"}</span>
    </button>
  );
}
