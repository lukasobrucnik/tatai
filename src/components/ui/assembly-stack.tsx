import type { AssemblyLayer } from "@/lib/data";

const cs = (n: number) => n.toLocaleString("cs-CZ");

export function AssemblyStack({
  layers,
  title,
  tone = "default",
  unit = "mm",
}: {
  layers: AssemblyLayer[];
  title?: string;
  tone?: "default" | "inverse";
  unit?: string;
}) {
  const inv = tone === "inverse";
  const total = layers.reduce((s, l) => s + (l.thickness || 0), 0);
  return (
    <div className="grid gap-6">
      {title && (
        <div className={`flex justify-between items-baseline pb-3 border-b ${inv ? "border-border-inverse" : "border-border-hairline"}`}>
          <span className={`font-mono text-body-sm font-medium tracking-eyebrow uppercase ${inv ? "text-inverse" : "text-strong"}`}>{title}</span>
          <span className={`font-mono text-caption tabular-nums ${inv ? "text-graphite-300" : "text-muted"}`}>
            Celkem {cs(total)} {unit}
          </span>
        </div>
      )}
      <div className="grid">
        {layers.map((l, i) => (
          <div
            key={i}
            className={`group grid grid-cols-[34px_1fr_auto_72px] items-center gap-4 px-3 py-4 border-b transition-colors duration-150 ${inv ? "border-border-inverse hover:bg-graphite-800" : "border-border-hairline hover:bg-surface-raised"} ${i === 0 ? `border-t ${inv ? "border-border-inverse" : "border-border-hairline"}` : ""}`}
          >
            <span className={`font-mono text-eyebrow ${inv ? "text-graphite-400 group-hover:text-signal-500" : "text-muted group-hover:text-signal-500"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={`text-body-md font-medium ${inv ? "text-inverse" : "text-strong"}`}>{l.name}</span>
            <span className={`text-caption text-right ${inv ? "text-graphite-400" : "text-muted"}`}>{l.material}</span>
            <span className={`font-mono text-caption text-right tabular-nums ${inv ? "text-graphite-300" : "text-body"}`}>
              {l.thickness ? `${cs(l.thickness)} ${unit}` : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
