import type { ReactNode } from "react";

const tones = {
  page: "bg-surface-page text-body",
  raised: "bg-surface-raised text-body",
  sunken: "bg-surface-sunken text-body",
  inverse: "bg-surface-inverse text-inverse-muted",
} as const;

const densities = {
  sm: "py-(--section-y-sm)",
  md: "py-(--section-y-md)",
  lg: "py-(--section-y-lg)",
} as const;

export function Section({
  children,
  tone = "page",
  density = "md",
  topRule = false,
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  density?: keyof typeof densities;
  topRule?: boolean;
  className?: string;
}) {
  const ruleCls = topRule ? `border-t ${tone === "inverse" ? "border-border-inverse" : "border-border-hairline"}` : "";
  return (
    <section className={`${tones[tone]} ${densities[density]} ${ruleCls} ${className}`}>
      <div className="container-tatai">{children}</div>
    </section>
  );
}
