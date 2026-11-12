"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/data";

/**
 * Časté otázky jako linka: témata jsou body na jedné svislé čáře a otevřené
 * téma se rozsvítí signální barvou. Témat je záměrně málo a každé má krátkou
 * odpověď, která je vidět i zavřená — kdo chce víc, rozbalí si delší text
 * rozdělený do částí a k tomu čísla (fakty, nebo časovou osu, když jde o
 * postup v čase).
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <ol className="relative m-0 list-none p-0">
      {/* Svislá linka, na které témata visí. Středem prochází uzly (15 px). */}
      <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-border-hairline" />

      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;
        return (
          <li key={it.title} className="relative pl-12 max-sm:pl-9!">
            <span
              aria-hidden
              className={`absolute left-0 top-[1.85rem] grid size-[15px] place-items-center border bg-surface-page transition-colors duration-200 ${
                isOpen ? "border-signal-500" : "border-border-strong"
              }`}
            >
              <span
                className={`size-[7px] bg-signal-500 transition-transform duration-200 ${isOpen ? "scale-100" : "scale-0"}`}
              />
            </span>

            <div className="border-b border-border-hairline">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="grid w-full cursor-pointer gap-3 border-0 bg-transparent py-6 text-left font-inherit text-strong"
              >
                <span className="flex items-baseline gap-5">
                  <span
                    className={`font-mono text-caption tabular-nums transition-colors duration-150 ${isOpen ? "text-signal-500" : "text-faint"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-h3 font-medium tracking-heading">{it.title}</span>
                  <span aria-hidden className={`relative mt-1.5 size-3 flex-none ${isOpen ? "text-signal-500" : "text-current"}`}>
                    <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                    <span
                      className="absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-150"
                      style={{ transform: isOpen ? "scaleY(0)" : "none" }}
                    />
                  </span>
                </span>
                <span className="max-w-[58ch] text-body-md leading-body text-muted">{it.body}</span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-10">
                    {it.parts && it.parts.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-10 gap-y-7 max-md:grid-cols-1!">
                        {it.parts.map((p) => (
                          <div key={p.title} className="grid content-start gap-2.5 border-t border-border-hairline pt-4">
                            <h4 className="flex items-center gap-2.5 font-mono text-eyebrow uppercase tracking-eyebrow text-strong">
                              <span aria-hidden className="h-px w-4 bg-signal-500" />
                              {p.title}
                            </h4>
                            <p className="max-w-[46ch] text-body-md leading-body text-body">{p.body}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {it.facts && it.facts.length > 0 && (
                      <dl className="m-0 grid grid-cols-3 gap-x-8 gap-y-5 border-t border-border-strong pt-5 max-md:grid-cols-1!">
                        {it.facts.map((f) => (
                          <div key={f.label} className="grid content-start gap-1.5">
                            <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">{f.label}</dt>
                            <dd className="m-0 font-display text-h4 font-medium text-strong">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {it.timeline && it.timeline.length > 0 && <Timeline steps={it.timeline} />}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Postup v čase jako vodorovná linka s body (na telefonu svislá). Poslední
 * bod — cíl — je plný, ostatní jen obrysem.
 */
function Timeline({ steps }: { steps: { label: string; value: string }[] }) {
  return (
    <ol
      className="relative m-0 grid list-none gap-x-6 p-0 max-sm:grid-cols-1! max-sm:gap-y-5!"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      <span aria-hidden className="absolute left-0 right-0 top-[5px] h-px bg-border-strong max-sm:hidden" />
      <span aria-hidden className="absolute bottom-1 left-[5px] top-1 w-px bg-border-strong sm:hidden" />
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className="relative grid content-start gap-1.5 pt-7 max-sm:pl-8! max-sm:pt-0!">
            <span
              aria-hidden
              className={`absolute left-0 top-0 size-[11px] border border-signal-500 ${last ? "bg-signal-500" : "bg-surface-page"} max-sm:top-1!`}
            />
            <span className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
              <span className="text-signal-600">{String(i + 1).padStart(2, "0")}</span> {s.label}
            </span>
            <span className="font-display text-h4 font-medium text-strong">{s.value}</span>
          </li>
        );
      })}
    </ol>
  );
}
