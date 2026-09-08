"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNav } from "./nav-context";
import { InquiryTriggerButton } from "./inquiry-trigger-button";
import type { NAV } from "@/lib/data";

// Same "things settle, they never bounce" token as the rest of the site's
// motion (hero-diptych.tsx) — the active-nav indicator used to run on an
// underdamped spring (stiffness 420, damping 34, below its ~41 critical
// damping) and visibly overshot when it slid between items.
const EASE = [0.16, 1, 0.3, 1] as const;

export function Header({ items, phone, hrefPrefix = "" }: { items: typeof NAV; phone: string; hrefPrefix?: string }) {
  const { active } = useNav();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-page border-b border-border-hairline">
      <div className="container-tatai h-(--header-h) flex items-center gap-10">
        <a href={`${hrefPrefix}#home`} className="flex items-center no-underline flex-none" onClick={() => setOpen(false)}>
          <Image src="/logo/tatai-mark.webp" alt="TATAI" width={192} height={119} priority className="h-9 w-auto" />
        </a>

        <nav className="hidden lg:flex gap-8 ml-auto">
          {items.map((it) => {
            const on = hrefPrefix === "" && active === it.id;
            return (
              <a
                key={it.id}
                href={`${hrefPrefix}#${it.id}`}
                // Active section reuses the site's own hover motif (project
                // card / material strip / pillar split all reveal a signal
                // underline on hover) instead of a standalone pill — it's a
                // shape the visitor has already been trained on elsewhere,
                // just held permanently open here rather than on :hover.
                // Font weight stays fixed (no medium→semibold jump) so the
                // label never changes width as the indicator moves.
                className={`relative font-mono text-eyebrow tracking-eyebrow uppercase no-underline transition-colors duration-200 ${
                  on ? "text-strong" : "text-muted"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute -inset-x-1 -bottom-2 h-0.5 bg-signal-500"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                {it.label}
              </a>
            );
          })}
        </nav>

        <span className="flex items-center gap-8 flex-none lg:ml-0 ml-auto">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden lg:inline font-mono text-caption text-body no-underline pl-8 border-l border-border-hairline">
            {phone}
          </a>
          <InquiryTriggerButton size="sm" arrow className="flex-none">
            Poptávka
          </InquiryTriggerButton>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden -mr-2.5 flex flex-col items-center justify-center gap-[5px] w-11 h-11 p-0 bg-transparent border-0 cursor-pointer"
          >
            <span className="w-[22px] h-px bg-graphite-1000" />
            <span className="w-[22px] h-px bg-graphite-1000" />
          </button>
        </span>
      </div>

      {open && (
        <nav className="border-t border-border-hairline px-(--container-gutter) py-6 pb-8 grid gap-5 lg:hidden">
          {items.map((it) => (
            <a
              key={it.id}
              href={`${hrefPrefix}#${it.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-h3 font-medium text-strong no-underline min-h-11 flex items-center"
            >
              {it.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
