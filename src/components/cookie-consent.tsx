"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { onConsentSettingsOpen, openConsentSettings, setConsent, useConsent } from "@/lib/consent";

/**
 * Lišta se ptá jen na jednu věc: smíme měřit návštěvnost? Nic jiného web
 * nesbírá. Dokud návštěvník neklikne „Povolit“, měřicí skript se vůbec
 * nenačte (viz analytics.tsx) — „Odmítnout“ tedy opravdu nic nezapne.
 */
export function CookieConsent() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onConsentSettingsOpen(() => setReopened(true)), []);

  // undefined = ještě nevíme (server, hydratace): nic neukazovat, ať lišta
  // neproblikne lidem, kteří už rozhodli.
  const visible = reopened || consent === null;
  if (!visible) return null;

  function decide(value: "accepted" | "declined") {
    setConsent(value);
    setReopened(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Souhlas s měřením návštěvnosti"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-hairline bg-surface-raised"
    >
      <div className="container-tatai py-5 flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="flex-1 min-w-[240px] text-body-sm leading-body text-body">
          Se souhlasem anonymně měříme návštěvnost webu, abychom věděli, co lidi zajímá. Bez souhlasu nic neměříme.
          Víc v{" "}
          <Link href="/ochrana-soukromi#mereni" className="text-strong underline decoration-border-strong underline-offset-2 hover:text-signal-600">
            ochraně soukromí
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 flex-none">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="inline-flex min-h-11 items-center px-1 font-mono text-eyebrow tracking-eyebrow uppercase text-muted bg-transparent border-0 cursor-pointer hover:text-strong transition-colors duration-150"
          >
            Odmítnout
          </button>
          <Button variant="primary" size="sm" onClick={() => decide("accepted")}>
            Povolit měření
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Odkaz do patičky: znovu otevře lištu, ať jde souhlas kdykoli odvolat. */
export function ConsentSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Nastavení měření
    </button>
  );
}
