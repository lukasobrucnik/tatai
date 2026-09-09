import type { ReactNode } from "react";
import type { StatItem } from "@/lib/data";

/**
 * A chapter opening made of words and numbers instead of a photograph.
 *
 * Every chapter before this one arrives on an image or a spectacle — two
 * photos in the hero, a photo plate for Střechy and Domy, a flight through
 * the word itself for Realizace. Following that with a fifth scroll mechanic
 * would turn the page into a showreel, so this one separates itself by
 * changing register rather than by moving: no photograph, nothing animating
 * on arrival, and the tone inverted against the bone the whole Realizace
 * chapter sits on. After the loudest moment on the site, the quietest screen.
 *
 * It also suits what the chapter actually is. This is a claim about people,
 * and the numbers are the evidence — which is why they carry the same weight
 * here as an image would elsewhere.
 */
export function StatementPlate({
  index,
  name,
  lead,
  stats,
  actions,
}: {
  /** Omitted by the closing chapter: the numbers belong to the four that
   *  present the work, and Kontakt is the way out rather than part of the
   *  tour. */
  index?: string;
  name: string;
  lead?: string;
  /** Evidence for the claim, where the chapter has any. */
  stats?: StatItem[];
  actions?: ReactNode;
}) {
  // A full screen of quiet is the point where there are numbers to hold it —
  // without them the plate is a heading and a line, and the same height is
  // just an empty screen.
  return (
    <section
      className={`flex items-center bg-surface-inverse py-(--section-y-lg) ${stats ? "min-h-[80svh]" : "min-h-[38svh]"}`}
    >
      <div className="container-tatai grid w-full gap-(--section-y-sm)">
        {/* The chapter names itself at the largest size on the plate. This one
            has no photograph and no line to compete with, so the name can take
            the space a headline takes elsewhere — the same mono-and-signal
            device the photo chapters use, just given the whole stage. */}
        <div className="grid gap-6">
          {/* The number sits above the name at label scale rather than beside
              it at heading scale. Set the same size, it competed with the word
              it was supposed to be annotating. */}
          <div className="grid gap-3">
            {index && (
              <span className="font-mono text-body-sm tabular-nums tracking-eyebrow text-signal-500">{index}</span>
            )}
            <h2 className="font-mono text-display-2 font-medium uppercase tracking-wide leading-display text-inverse">
              {name}
            </h2>
          </div>
          {lead && <p className="max-w-[52ch] text-lead leading-snug text-inverse-muted">{lead}</p>}
          {actions && <div className="flex flex-wrap gap-4 pt-2">{actions}</div>}
        </div>

        {stats && (
        <dl className="m-0 grid grid-cols-4 gap-(--grid-gap) max-lg:grid-cols-2! max-lg:gap-y-10!">
          {stats.map((stat) => (
            <div key={stat.label} className="relative grid content-start gap-3 border-t border-border-inverse pt-6">
              {/* Same signal tick the process steps used to carry — the accent
                  marking where a measured thing begins. */}
              <span aria-hidden className="absolute -top-px left-0 h-px w-[22px] bg-signal-500" />
              <dt className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{stat.label}</dt>
              <dd className="m-0 flex items-baseline gap-2">
                <span className="font-display text-h1 font-medium tabular-nums tracking-display text-inverse">
                  {stat.value}
                </span>
                {stat.unit && <span className="font-display text-h3 font-medium text-graphite-300">{stat.unit}</span>}
              </dd>
              {stat.note && <span className="font-mono text-caption tracking-mono text-graphite-400">{stat.note}</span>}
            </div>
          ))}
        </dl>
        )}
      </div>
    </section>
  );
}
