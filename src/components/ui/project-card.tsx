import Image from "next/image";
import type { Project } from "@/lib/data";
import { Tag } from "./tag";

export function ProjectCard({
  project,
  index,
  src,
  ratio,
}: {
  project: Project;
  index: string;
  src?: string;
  /** Override project.ratio — use when the card sits in a fixed equal-height
   * row (e.g. the homepage's 3-up teaser) where a mixed portrait/landscape
   * ratio would misalign captions across the row. Leave unset in free-flowing
   * grids (RealizaceExplorer) where each project's own ratio is intentional. */
  ratio?: Project["ratio"];
}) {
  const ratioCls = (ratio ?? project.ratio) === "portrait" ? "aspect-3/4" : "aspect-4/3";
  return (
    <div className="grid gap-5">
      <div className={`relative overflow-hidden dot-grid-light ${ratioCls} ${src ? "" : "border border-border-hairline"}`}>
        {src ? (
          <Image
            src={src}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          // Same "no photo" caption convention as Photo (ui/photo.tsx) — the
          // hairline frame is the only addition, marking this as a deliberate
          // plate awaiting content rather than an unstyled empty box.
          <span className="absolute left-3 bottom-2.5 font-mono text-eyebrow tracking-eyebrow uppercase text-muted">Foto realizace</span>
        )}
        <span className="absolute top-0 left-0 px-2.5 py-1.5 bg-bone-100 font-mono text-eyebrow tracking-eyebrow text-graphite-1000">{index}</span>
        <span className="absolute bottom-0 right-0 px-2.5 py-1.5 bg-graphite-1000 text-bone-100 font-mono text-eyebrow tracking-eyebrow uppercase">
          {project.category}
        </span>
      </div>
      <div className="grid gap-3">
        <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-border-hairline">
          <h3 className="font-display text-h4 font-medium tracking-heading text-strong">{project.title}</h3>
          <span className="font-mono text-caption text-muted tabular-nums">{project.year}</span>
        </div>
        <span className="text-body-sm text-muted">{project.location}</span>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((t) => (
              <Tag key={t} size="sm">{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
