import type { StatItem } from "@/lib/data";

/**
 * The evidence row: four measured facts about the firm, set at heading scale
 * because on this page the numbers carry as much weight as a photograph.
 *
 * Each figure sits under its own rule with a signal tick at the start —
 * the same accent the chapter tabs use to mark where a measured thing
 * begins. Four across on desktop, two on anything narrower: at four columns
 * a phone breaks "11 000" onto two lines and the row stops reading as one
 * band of facts.
 */
export function StatGrid({ items, tone = "default" }: { items: StatItem[]; tone?: "default" | "inverse" }) {
  const inv = tone === "inverse";
  return (
    <dl className="m-0 grid grid-cols-4 gap-(--grid-gap) max-lg:grid-cols-2! max-lg:gap-y-10!">
      {items.map((stat) => (
        <div
          key={stat.label}
          className={`relative grid content-start gap-3 border-t pt-6 ${inv ? "border-border-inverse" : "border-border-hairline"}`}
        >
          <span aria-hidden className="absolute -top-px left-0 h-px w-[22px] bg-signal-500" />
          <dt className={`font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-400" : "text-muted"}`}>
            {stat.label}
          </dt>
          <dd className="m-0 flex items-baseline gap-2">
            <span
              className={`font-display text-h1 font-medium tabular-nums tracking-display ${inv ? "text-inverse" : "text-strong"}`}
            >
              {stat.value}
            </span>
            {stat.unit && (
              <span className={`font-display text-h3 font-medium ${inv ? "text-graphite-300" : "text-muted"}`}>
                {stat.unit}
              </span>
            )}
          </dd>
          {stat.note && (
            <span className={`font-mono text-caption tracking-mono ${inv ? "text-graphite-400" : "text-muted"}`}>
              {stat.note}
            </span>
          )}
        </div>
      ))}
    </dl>
  );
}
