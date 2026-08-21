import type { ProcessStep } from "@/lib/data";

export function ProcessTrack({ steps, tone = "default" }: { steps: ProcessStep[]; tone?: "default" | "inverse" }) {
  const inv = tone === "inverse";
  return (
    <ol
      className="list-none m-0 p-0 grid gap-(--grid-gap) max-md:grid-cols-1! max-md:gap-0!"
      style={{ gridTemplateColumns: `repeat(${steps.length},minmax(0,1fr))` }}
    >
      {steps.map((s, i) => (
        <li
          key={i}
          className={`relative grid gap-4 content-start pt-6 border-t ${inv ? "border-border-inverse" : "border-border-strong"} max-md:border-t-0 max-md:pb-6 max-md:pt-6 max-md:border-b ${inv ? "max-md:border-border-inverse" : "max-md:border-border-hairline"}`}
        >
          <span aria-hidden className="absolute -top-px left-0 w-[22px] h-px bg-signal-500 max-md:hidden" />
          <span className="font-mono text-eyebrow tracking-eyebrow text-signal-500">{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`font-display text-h4 font-medium tracking-heading ${inv ? "text-inverse" : "text-strong"}`}>{s.title}</h3>
          {s.body && <p className={`text-body-md leading-body ${inv ? "text-inverse-muted" : "text-body"}`}>{s.body}</p>}
          {s.meta && <span className={`font-mono text-caption ${inv ? "text-graphite-300" : "text-muted"}`}>{s.meta}</span>}
        </li>
      ))}
    </ol>
  );
}
