import type { MaterialItem } from "@/lib/data";

export function MaterialStrip({ items, tone = "default" }: { items: MaterialItem[]; tone?: "default" | "inverse" }) {
  const inv = tone === "inverse";
  return (
    <div
      className={`grid border-t border-b ${inv ? "border-border-inverse" : "border-border-hairline"} max-md:grid-cols-1!`}
      style={{ gridTemplateColumns: `repeat(${items.length},minmax(0,1fr))` }}
    >
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          className={`group relative grid gap-4 content-start text-left px-6 py-8 border-0 font-inherit cursor-default transition-colors duration-150 ${inv ? "hover:bg-graphite-800" : "hover:bg-surface-raised"} ${i === 0 ? "border-l-0" : `border-l max-md:border-l-0 ${inv ? "border-border-inverse" : "border-border-hairline"}`}`}
        >
          <span
            aria-hidden
            className="absolute top-0 left-0 right-0 h-0.5 bg-signal-500 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          />
          <span className={`w-full aspect-3/2 relative overflow-hidden ${inv ? "bg-graphite-700" : "bg-graphite-100"}`} />
          <span className={`font-mono text-eyebrow tracking-eyebrow uppercase ${inv ? "text-graphite-400 group-hover:text-signal-500" : "text-muted group-hover:text-signal-600"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={`font-display text-h4 font-medium tracking-heading ${inv ? "text-inverse" : "text-strong"}`}>{it.name}</span>
          {it.note && <span className={`text-body-sm leading-snug ${inv ? "text-graphite-400" : "text-muted"}`}>{it.note}</span>}
        </button>
      ))}
    </div>
  );
}
