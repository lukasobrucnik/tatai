"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/data";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t border-border-hairline">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-border-hairline">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-baseline gap-6 py-6 bg-transparent border-0 cursor-pointer text-left font-inherit text-strong"
            >
              <span className={`font-mono text-caption transition-colors duration-150 ${isOpen ? "text-signal-500" : "text-faint"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-h4 font-medium tracking-heading">{it.title}</span>
              <span aria-hidden className={`relative w-3 h-3 mt-1.5 flex-none ${isOpen ? "text-signal-500" : "text-current"}`}>
                <span className="absolute top-1/2 left-0 w-3 h-px bg-current" />
                <span
                  className="absolute left-1/2 top-0 w-px h-3 bg-current transition-transform duration-150"
                  style={{ transform: isOpen ? "scaleY(0)" : "none" }}
                />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pb-8 pl-12 max-w-[62ch] text-body-md leading-body text-body">{it.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
