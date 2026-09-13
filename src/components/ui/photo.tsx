import Image from "next/image";
import type { ReactNode } from "react";

const ratios: Record<string, string> = {
  hero: "16/9",
  project: "4/3",
  portrait: "3/4",
  detail: "1/1",
  band: "21/9",
  auto: "auto",
};

export function Photo({
  src,
  alt = "",
  ratio = "project",
  caption,
  index,
  tone = "light",
  hoverZoom = false,
  label,
  // Half the viewport is right for a two-across grid and wasteful for a
  // three-across one — at 1440 that is a 720px file fetched for a 440px box.
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  ratio?: keyof typeof ratios;
  caption?: string;
  index?: string;
  tone?: "light" | "dark";
  hoverZoom?: boolean;
  label?: string;
  /** Media query → rendered width, for the srcset the browser picks from. */
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  const inverse = tone === "dark";
  // Every caller already passes a label that describes the picture in words
  // ("Plochá střecha — detail atiky"); it is just never rendered when there is
  // a photo to show. Falling back to it means no image on the site ships with
  // an empty alt by accident. Pass alt="" explicitly for a decorative one.
  const description = alt || label || "";
  return (
    <figure className={`m-0 grid gap-3 ${className}`}>
      <div
        className={`group relative overflow-hidden ${inverse ? "dot-grid-dark" : "dot-grid-light"}`}
        style={{ aspectRatio: ratios[ratio] }}
      >
        {src && (
          <Image
            src={src}
            alt={description}
            fill
            sizes={sizes}
            className={`object-cover transition-transform duration-500 ease-out ${hoverZoom ? "group-hover:scale-[1.035]" : ""}`}
          />
        )}
        {!src && (
          <span className={`absolute left-3 bottom-2.5 font-mono text-eyebrow tracking-eyebrow uppercase ${inverse ? "text-graphite-300" : "text-muted"}`}>
            {label || "Foto"}
          </span>
        )}
        {index && (
          <span className="absolute top-0 left-0 px-2.5 py-1.5 bg-bone-100 font-mono text-eyebrow tracking-eyebrow text-graphite-1000">
            {index}
          </span>
        )}
        {children}
      </div>
      {caption && (
        <figcaption className={`font-mono text-caption tracking-mono ${inverse ? "text-graphite-400" : "text-muted"}`}>{caption}</figcaption>
      )}
    </figure>
  );
}
