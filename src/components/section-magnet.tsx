"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";

/**
 * Jemné „zadrhnutí“ kolečka myši, když je kapitola přesně přes celou
 * obrazovku.
 *
 * Střechy to mají samy od sebe: zůstanou přišpendlené a Dřevostavby se přes
 * ně vysunou, takže scroll na okamžik „drží“. Dřevostavby žádný takový
 * mechanismus nemají — kdo jede kolečkem, proletí je bez zastavení. Tady
 * proto kolem polohy, ve které horní okraj kapitoly sedí pod hlavičkou,
 * zpomalíme kolečko (čím blíž, tím víc) a když se scroll zastaví skoro
 * v ní, dosedne přesně. Nikoho nezamyká: kolečko pořád jede, jen na chvíli
 * těžce.
 *
 * Funguje na kolečko/touchpad (Lenis). Dotykový posun je nativní a
 * zůstává, jak byl; pod „omezit pohyb“ Lenis neběží, takže ani tohle.
 */
const IDS = ["domy"];

/** Kolečko čte Lenis z vlastní kopie voleb uvnitř virtualScroll, ne z
 *  `lenis.options` — násobič se proto musí nastavit tam. */
function setWheel(l: Lenis, value: number) {
  l.options.wheelMultiplier = value;
  const vs = (l as unknown as { virtualScroll?: { options: { wheelMultiplier: number } } }).virtualScroll;
  if (vs) vs.options.wheelMultiplier = value;
}
/** Šířka zóny jako podíl výšky okna. */
const ZONE = 0.2;
/** Nejnižší násobič kolečka přesně v cíli. */
const MIN_SPEED = 0.28;
/** Do jaké vzdálenosti (px) se po zastavení scroll přisaje na cíl. */
const SETTLE_PX = 70;

function target(id: string, headerH: number): number | null {
  const el = document.getElementById(id);
  if (!el) return null;
  return el.getBoundingClientRect().top + window.scrollY - headerH;
}

export function SectionMagnet() {
  const settle = useRef<number | undefined>(undefined);

  const lenis = useLenis((l) => {
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;
    const zone = window.innerHeight * ZONE;
    let nearest: { d: number; y: number } | null = null;
    for (const id of IDS) {
      const y = target(id, headerH);
      if (y === null) continue;
      const d = Math.abs(l.scroll - y);
      if (d < zone && (!nearest || d < nearest.d)) nearest = { d, y };
    }

    if (nearest) {
      const t = nearest.d / zone; // 0 v cíli, 1 na kraji zóny
      const ease = t * t * (3 - 2 * t);
      setWheel(l, MIN_SPEED + (1 - MIN_SPEED) * ease);
    } else {
      setWheel(l, 1);
    }

    window.clearTimeout(settle.current);
    if (nearest && nearest.d > 1 && nearest.d < SETTLE_PX) {
      const y = nearest.y;
      settle.current = window.setTimeout(() => {
        if (Math.abs(l.velocity) < 0.05) l.scrollTo(y, { duration: 0.5 });
      }, 160);
    }
  });

  useEffect(() => () => window.clearTimeout(settle.current), []);
  useEffect(() => () => {
    if (lenis) setWheel(lenis, 1);
  }, [lenis]);

  return null;
}
