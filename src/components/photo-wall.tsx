"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import type { HallPhoto } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Zeď fotek: všechny snímky z haly naskládané vedle sebe přes celou obrazovku.
 * Konkrétní fotka se rozklikne v PhotoLightboxu, který leží nad zdí — zeď
 * zůstává vidět v pozadí a po zavření fotky na ní čtenář pokračuje.
 *
 * Zavírá se křížkem vpravo nahoře nebo klávesou Escape. Když je nad zdí
 * otevřená fotka (`suspended`), Escape patří jí, ne zdi — jinak by jedno
 * zmáčknutí zavřelo obojí.
 */
export function PhotoWall({
  photos,
  open,
  suspended,
  label,
  onClose,
  onSelect,
}: {
  photos: HallPhoto[];
  open: boolean;
  /** Nad zdí je otevřená fotka — zeď nereaguje na Escape. */
  suspended: boolean;
  label: string;
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const suspendedRef = useRef(suspended);

  useEffect(() => {
    suspendedRef.current = suspended;
  }, [suspended]);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !suspendedRef.current) onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose, lenis]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — všechny fotografie`}
          className="fixed inset-0 z-[65] flex flex-col bg-graphite-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-inverse px-(--container-gutter) py-4">
            <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-bone-100">
              {label}
              <span className="ml-3 text-graphite-400">{photos.length} fotek</span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Zavřít zeď fotek"
              className="grid h-12 w-12 shrink-0 cursor-pointer place-items-center border border-bone-100 bg-transparent p-0 text-bone-100 transition-colors duration-150 hover:border-signal-500 hover:bg-signal-500 hover:text-graphite-1000"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden>
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.75" />
              </svg>
            </button>
          </div>

          {/* data-lenis-prevent: zeď se posouvá nativně, Lenis ji nesmí přebít. */}
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-(--container-gutter) py-6">
            <ul className="m-0 mx-auto grid max-w-[1600px] list-none grid-cols-2 gap-2 p-0 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
              {photos.map((p, i) => {
                return (
                  <li key={p.src}>
                    <button
                      type="button"
                      onClick={() => onSelect(i)}
                      aria-label={`Fotografie ${i + 1} z ${photos.length}, zvětšit`}
                      className="group relative block w-full cursor-pointer overflow-hidden border-0 bg-graphite-900 p-0"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <Image
                        src={p.src}
                        alt=""
                        loading="eager"
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-signal-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
