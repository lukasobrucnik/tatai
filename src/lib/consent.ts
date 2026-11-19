"use client";

import { useSyncExternalStore } from "react";

/**
 * Souhlas s měřením návštěvnosti. Jediné místo, které ho čte a zapisuje:
 * lišta (cookie-consent.tsx), analytika (analytics.tsx) i odkaz „Nastavení
 * cookies“ v patičce se na něj jen dívají.
 *
 * Klíč má „v2“: původní lišta ukládala „accepted“ za pouhé „Rozumím“ u textu
 * o nezbytných cookies. To není souhlas s měřením, takže se ptáme znovu.
 */
const STORAGE_KEY = "tatai-consent-v2";
const CHANGE_EVENT = "tatai-consent-change";
const OPEN_EVENT = "tatai-consent-open";

export type Consent = "accepted" | "declined" | null;

function read(): Consent {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    // Soukromé okno nebo blokované úložiště: bez záznamu se nic neměří.
    return null;
  }
}

export function setConsent(value: "accepted" | "declined") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Volba pak platí jen do zavření stránky — horší varianta, ale ne chyba.
  }
  memory = value;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Když localStorage nejde zapsat, volba aspoň vydrží do konce návštěvy.
let memory: Consent = null;

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** `undefined` na serveru a při hydrataci — ještě nevíme, lišta se neukáže. */
export function useConsent(): Consent | undefined {
  return useSyncExternalStore(
    subscribe,
    () => read() ?? memory,
    () => undefined,
  );
}

/** Aktuální volba mimo React (filtr událostí v analytics.tsx). */
export function currentConsent(): Consent {
  return read() ?? memory;
}

/** Znovu otevře lištu, ať jde volbu kdykoli změnit (čl. 7 odst. 3 GDPR). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
