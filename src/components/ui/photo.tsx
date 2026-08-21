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
  className?: string;
  children?: ReactNode;
}) {
  const inverse = tone === "dark";
  return (
    <figure className={`m-0 grid gap-3 ${className}`}>
      <div
        className={`group relative overflow-hidden ${inverse ? "dot-grid-dark" : "dot-grid-light"}`}
        style={{ aspectRatio: ratios[ratio] }}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
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
