import type { DetailPoint } from "@/lib/data";
import { Photo } from "./ui/photo";

export function DetailCallout({
  label,
  ratio = "band",
  points,
  caption,
}: {
  label?: string;
  ratio?: "hero" | "band" | "detail" | "project";
  points: DetailPoint[];
  caption?: string;
}) {
  return (
    <figure className="m-0 grid gap-8">
      <Photo ratio={ratio} tone="dark" label={label} />
      <div className="grid grid-cols-3 gap-(--grid-gap) max-sm:grid-cols-1!">
        {points.map((p, i) => (
          <div key={i} className="grid gap-4">
            <Photo ratio="detail" tone="dark" hoverZoom label={p.title} />
            <div className="grid gap-1.5">
              <span className="font-mono text-eyebrow tracking-eyebrow text-signal-500">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-h4 font-medium tracking-heading text-strong">{p.title}</span>
              <span className="text-body-sm text-muted leading-snug">{p.note}</span>
            </div>
          </div>
        ))}
      </div>
      {caption && <figcaption className="font-mono text-caption tracking-mono text-muted">{caption}</figcaption>}
    </figure>
  );
}
