import type { ReactNode } from "react";
import { SignalRule } from "./signal-rule";

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
  // Absolute rather than a border: the rule has to sit on the section's very
  // top edge, and the section's own vertical padding would otherwise push a
  // flow child a hundred-odd pixels down from it.
  return (
    <section className={`relative ${tones[tone]} ${densities[density]} ${className}`}>
      {topRule && <SignalRule className="absolute inset-x-0 top-0" />}
      <div className="container-tatai">{children}</div>
    </section>
  );
}
