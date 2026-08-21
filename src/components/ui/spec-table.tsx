import type { SpecRow } from "@/lib/data";

export function SpecTable({
  rows,
  tone = "default",
  columns = 1,
}: {
  rows: SpecRow[];
  tone?: "default" | "inverse";
  columns?: 1 | 2;
}) {
  const inv = tone === "inverse";
  return (
    <dl
      className="m-0 grid gap-x-16 gap-y-0"
      style={{ gridTemplateColumns: `repeat(${columns},minmax(0,1fr))` }}
    >
      {rows.map((r, i) => (
        <div
          key={i}
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-4 border-b ${inv ? "border-border-inverse" : "border-border-hairline"}`}
        >
          <dt className={`font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-500" : "text-muted"}`}>{r.label}</dt>
          <dd className={`m-0 text-body-md font-medium text-right tabular-nums ${inv ? "text-inverse" : "text-strong"}`}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
