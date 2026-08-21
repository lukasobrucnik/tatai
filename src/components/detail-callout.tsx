"use client";

import { useState } from "react";
import type { DetailPoint } from "@/lib/data";

const ratios: Record<string, string> = { hero: "16/9", band: "21/9", detail: "1/1", project: "4/3" };

export function DetailCallout({
  label,
  ratio = "hero",
  points,
  caption,
}: {
  label?: string;
  ratio?: keyof typeof ratios;
  points: DetailPoint[];
  caption?: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <figure className="m-0 grid gap-5">
      <div className="relative overflow-hidden dot-grid-dark" style={{ aspectRatio: ratios[ratio] }}>
        <span className="absolute left-3.5 bottom-3 font-mono text-eyebrow tracking-eyebrow uppercase text-faint">
          {label || "Technický detail"}
        </span>
        {points.map((p, i) => {
          const on = active === i;
          return (
            <button
              key={i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={p.title}
              className="absolute w-7 h-7 p-0 rounded-full grid place-items-center -translate-x-1/2 -translate-y-1/2 font-mono text-eyebrow backdrop-blur-[6px] transition-colors duration-150 cursor-pointer"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: on ? "var(--color-signal-500)" : "var(--marker-bg-rest)",
                border: `1px solid ${on ? "var(--color-signal-500)" : "var(--marker-border-rest)"}`,
                color: on ? "var(--color-graphite-1000)" : "var(--color-bone-100)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          );
        })}
      </div>
      {points.length > 0 && (
        <div className="grid border-t border-border-hairline">
          {points.map((p, i) => {
            const on = active === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                className="grid grid-cols-[34px_minmax(0,220px)_1fr] gap-4 items-baseline py-4 border-b border-border-hairline transition-opacity duration-150"
                style={{ opacity: on ? 1 : 0.55 }}
              >
                <span className={`font-mono text-eyebrow ${on ? "text-signal-500" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body-md font-medium text-strong">{p.title}</span>
                <span className="text-body-sm text-muted leading-snug">{p.note}</span>
              </div>
            );
          })}
        </div>
      )}
      {caption && <figcaption className="font-mono text-caption tracking-mono text-muted">{caption}</figcaption>}
    </figure>
  );
}
