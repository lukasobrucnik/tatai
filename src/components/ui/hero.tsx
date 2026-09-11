import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";
import { ChapterMarker } from "./chapter-marker";

export function Hero({
  marker,
  eyebrow,
  title,
  lead,
  actions,
  meta = [],
  src,
  label,
  tone = "dark",
  height = "90vh",
  priority = false,
}: {
  /** Names the chapter this hero opens, at heading scale rather than as a
   *  caption — the visitor's answer to "where am I" shouldn't be the
   *  smallest type on the screen. The title below stays the chapter's line. */
  marker?: { index: string; name: string };
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  meta?: { label: string; value: string }[];
  src?: string;
  label?: string;
  tone?: "dark" | "light";
  height?: string;
  priority?: boolean;
}) {
  const inv = tone === "dark";
  return (
    <section
      className={`relative grid items-end overflow-hidden ${inv ? "bg-graphite-900" : "bg-surface-page"}`}
      style={{ minHeight: height }}
    >
      {src ? (
        <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
      ) : (
        <div aria-hidden className={`absolute inset-0 ${inv ? "dot-grid-dark" : "dot-grid-light"}`} style={{ backgroundSize: "32px 32px" }} />
      )}
      {inv && <span aria-hidden className="absolute inset-0" style={{ background: "var(--overlay-photo)" }} />}
      {/* overlay-photo's dark ramp only reaches full strength near the
          bottom, so on short viewports where the content block grows taller
          than `height` (min-height, not fixed) and items-end no longer has
          room to push it down, the eyebrow/heading can land on a still-bright
          top of the photo. Same top scrim HeroDiptych already uses for its
          top-anchored labels — cheap insurance, not visible where the top of
          the photo is already dark. */}
      {inv && src && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-40"
          style={{ background: "linear-gradient(180deg, rgba(10,12,13,.6) 0%, rgba(10,12,13,0) 100%)" }}
        />
      )}
      {!src && (
        <span className={`absolute right-(--container-gutter) top-10 font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-300" : "text-muted"}`}>
          {label || "Hero foto"}
        </span>
      )}
      <div className="relative w-full container-tatai py-(--section-y-md) grid gap-8">
        {marker && <ChapterMarker index={marker.index} name={marker.name} tone={inv ? "inverse" : "default"} />}
        {eyebrow && <Eyebrow tone={inv ? "inverse" : "default"}>{eyebrow}</Eyebrow>}
        <h1
          className={`font-display text-display-2 font-medium tracking-display leading-display max-w-[20ch] ${inv ? "text-inverse" : "text-strong"}`}
        >
          {title}
        </h1>
        {lead && <p className={`text-lead leading-snug max-w-[46ch] ${inv ? "text-inverse-muted" : "text-body"}`}>{lead}</p>}
        {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        {meta.length > 0 && (
          <dl className={`flex flex-wrap gap-12 m-0 pt-8 border-t ${inv ? "border-border-inverse" : "border-border-hairline"}`}>
            {meta.map((m, i) => (
              <div key={i} className="grid gap-2">
                <dt className={`font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-400" : "text-muted"}`}>{m.label}</dt>
                <dd className={`m-0 font-display text-h3 font-medium tabular-nums ${inv ? "text-inverse" : "text-strong"}`}>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
