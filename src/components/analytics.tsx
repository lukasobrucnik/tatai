"use client";

import { useState } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { track } from "@vercel/analytics";
import { currentConsent, useConsent } from "@/lib/consent";

/** Každá událost (zobrazení stránky i „poptávka odeslána“) projde tudy.
 *  Bez platného souhlasu ji zahodíme — i když skript už ve stránce je. */
function onlyWithConsent(event: BeforeSendEvent) {
  return currentConsent() === "accepted" ? event : null;
}

/**
 * Vercel Web Analytics, ale jen po souhlasu. Dokud návštěvník nepovolí
 * měření, komponenta se nevykreslí, skript se nenačte a `window.va`
 * neexistuje — trackInquirySent() pak nic neodešle.
 *
 * Načtený skript už ze stránky odstranit nejde. Když návštěvník souhlas
 * během návštěvy odvolá, komponenta proto zůstane, ale filtr výše zahodí
 * všechno, co by poslala. Při příštím načtení se skript nenačte vůbec.
 */
export function ConsentedAnalytics() {
  const consent = useConsent();
  const [loaded, setLoaded] = useState(false);
  if (consent === "accepted" && !loaded) setLoaded(true);
  if (!loaded) return null;
  return <Analytics beforeSend={onlyWithConsent} />;
}

/** Událost „poptávka odeslána“. Bez souhlasu je to no-op. */
export function trackInquirySent(type: string) {
  track("Poptávka odeslána", { typ: type });
}
