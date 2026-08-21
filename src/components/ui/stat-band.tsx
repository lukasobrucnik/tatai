import type { StatItem } from "@/lib/data";

export function StatBand({ items, tone = "default" }: { items: StatItem[]; tone?: "default" | "inverse" }) {
  const inv = tone === "inverse";
  return (
    <dl
      className={`m-0 grid gap-0 border-t ${inv ? "border-border-inverse" : "border-border-hairline"}`}
      style={{ gridTemplateColumns: `repeat(${items.length},minmax(0,1fr))` }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className={`grid gap-3 py-8 pr-6 ${i === 0 ? "pl-0" : `pl-6 border-l ${inv ? "border-border-inverse" : "border-border-hairline"}`}`}
        >
          <dt className={`font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-400" : "text-muted"}`}>{it.label}</dt>
          <dd className={`m-0 font-display text-h2 font-medium tracking-display leading-none tabular-nums ${inv ? "text-inverse" : "text-strong"}`}>
            {it.value}
            {it.unit && <span className="text-[.42em] ml-[.3em] text-signal-500 tracking-normal">{it.unit}</span>}
          </dd>
          {it.note && <span className={`text-body-sm ${inv ? "text-graphite-400" : "text-muted"}`}>{it.note}</span>}
        </div>
      ))}
    </dl>
  );
}
