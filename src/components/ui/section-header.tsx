import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  action,
  tone = "default",
  align = "split",
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: "default" | "inverse";
  align?: "split" | "stack";
}) {
  const inv = tone === "inverse";
  const stacked = align === "stack";
  return (
    <header
      className={`grid gap-8 items-end pb-12 border-b mb-16 ${inv ? "border-border-inverse" : "border-border-hairline"} ${stacked ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_auto]"}`}
    >
      <div className={`grid gap-5 ${stacked ? "max-w-none" : "max-w-[52ch]"}`}>
        {eyebrow && (
          <Eyebrow index={index} tone={inv ? "inverse" : "default"}>
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={`text-h1 tracking-heading leading-heading font-medium ${inv ? "text-inverse" : "text-strong"}`}>{title}</h2>
        {lead && <p className={`text-lead leading-snug max-w-[46ch] ${inv ? "text-inverse-muted" : "text-body"}`}>{lead}</p>}
      </div>
      {action && <div className="flex-none pb-1">{action}</div>}
    </header>
  );
}
