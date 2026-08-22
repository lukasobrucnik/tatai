"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const STORAGE_KEY = "tatai-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time read of an external store (localStorage) on mount to decide
    // whether consent was already given — not derived from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!window.localStorage.getItem(STORAGE_KEY));
  }, []);

  function decide(value: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Souhlas s používáním cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-hairline bg-surface-raised"
    >
      <div className="container-tatai py-5 flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="flex-1 min-w-[240px] text-body-sm leading-body text-body">
          Tento web používá cookies nezbytné pro jeho správné fungování. Víc najdete v{" "}
          <Link href="/ochrana-soukromi" className="text-strong underline decoration-border-strong underline-offset-2 hover:text-signal-600">
            ochraně soukromí
          </Link>
          .
        </p>
        <div className="flex items-center gap-4 flex-none">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted bg-transparent border-0 cursor-pointer p-0 hover:text-strong transition-colors duration-150"
          >
            Odmítnout
          </button>
          <Button variant="primary" size="sm" onClick={() => decide("accepted")}>
            Rozumím
          </Button>
        </div>
      </div>
    </div>
  );
}
