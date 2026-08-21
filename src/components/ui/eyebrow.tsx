import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "default",
  rule = true,
  index,
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "inverse" | "accent";
  rule?: boolean;
  index?: string;
  className?: string;
}) {
  const color =
    tone === "inverse" ? "text-graphite-400" : tone === "accent" ? "text-signal-600" : "text-muted";
  const ruleColor = tone === "inverse" ? "bg-border-inverse" : "bg-border-strong";
  return (
    <span className={`inline-flex items-center gap-3 font-mono text-eyebrow tracking-eyebrow uppercase leading-none ${color} ${className}`}>
      {rule && <span aria-hidden className={`h-px w-[22px] shrink-0 ${ruleColor}`} />}
      {index && <span className="text-signal-500">{index}</span>}
      {children}
    </span>
  );
}
