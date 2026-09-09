"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Card entrance. Swap this one object to change the whole modal's feel —
 * everything else (focus trap, scroll lock, Escape/backdrop close) is
 * animation-agnostic. See the three variants discussed with the client:
 *
 *  A) "pop" (current)  — scale 0.96→1 + fade + 8px rise. Transform+opacity
 *     only, cheapest possible animation, zero layout risk on any device.
 *  B) "sheet"           — y: "6%"→0, larger card, feels like a native
 *     bottom-sheet on mobile. Swap the block below for:
 *       hidden: { opacity: 0, y: "6%" }, visible: { opacity: 1, y: 0 }
 *  C) "container transform" — expands from the button's click point using
 *     clip-path/transform-origin. Needs the trigger's bounding rect passed
 *     through (not implemented here — meaningfully more moving parts).
 */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function InquiryModal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const cardRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Lock page scroll + trap Escape while open. Runs only for the open→close
  // transition itself, not on every render.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    // Two locks, because they cover different things. Lenis intercepts wheel
    // and touch and drives window.scrollTo itself, so it sails straight past
    // an overflow lock — it has to be stopped by hand. The overflow lock
    // still earns its place for the path Lenis isn't on (reduced motion,
    // keyboard scrolling, JS not yet hydrated).
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // First focusable field, not the card wrapper — a sighted mouse user
    // gets no visible change, but keyboard/screen-reader users land
    // straight in the form instead of at the top of a dialog shell.
    const firstField = cardRef.current?.querySelector<HTMLElement>("input, textarea, select, button");
    firstField?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
        >
          <div aria-hidden onClick={onClose} className="absolute inset-0 bg-graphite-1000/60" />

          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label="Nezávazná poptávka"
            className="relative grid max-h-[85vh] w-full max-w-[560px] auto-rows-min overflow-y-auto bg-surface-raised p-8 shadow-overlay sm:p-10"
            initial={reduce ? { opacity: 0 } : cardVariants.hidden}
            animate={reduce ? { opacity: 1 } : cardVariants.visible}
            exit={reduce ? { opacity: 0 } : cardVariants.hidden}
            transition={{ duration: reduce ? 0.15 : 0.32, ease: EASE }}
          >
            {/* Its own row, right-aligned, in normal flow — not absolute
                over the card padding — so a title that wraps on a narrow
                phone can never run under the tap target. */}
            <div className="-mt-2 -mr-2 mb-2 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                aria-label="Zavřít"
                className="grid h-9 w-9 place-items-center border-0 bg-transparent p-0 text-strong cursor-pointer hover:text-signal-600"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                  <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
