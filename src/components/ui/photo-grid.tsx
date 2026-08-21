import { Photo } from "./photo";

type GridItem = { label?: string; caption?: string; index?: string; src?: string; alt?: string; ratio?: "hero" | "project" | "portrait" | "detail" | "band" | "auto" };

const patterns = {
  thirds: "repeat(3,minmax(0,1fr))",
  halves: "repeat(2,minmax(0,1fr))",
  quarters: "repeat(4,minmax(0,1fr))",
  lead: "minmax(0,1.6fr) minmax(0,1fr)",
} as const;

export function PhotoGrid({
  items,
  pattern = "thirds",
  tone = "light",
}: {
  items: GridItem[];
  pattern?: keyof typeof patterns;
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid gap-(--grid-gap)" style={{ gridTemplateColumns: patterns[pattern] }}>
      {items.map((it, i) => (
        <Photo
          key={i}
          tone={tone}
          hoverZoom
          ratio={it.ratio || (pattern === "lead" && i === 0 ? "portrait" : "project")}
          index={it.index}
          caption={it.caption}
          label={it.label}
          src={it.src}
          alt={it.alt}
          className={pattern === "lead" && i === 0 ? "row-span-2" : undefined}
        />
      ))}
    </div>
  );
}
