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
}: {
  index: string;
  name: string;
  lead?: string;
  stats: StatItem[];
}) {
  return (
    <section className="flex min-h-[80svh] items-center bg-surface-inverse py-(--section-y-lg)">
      <div className="container-tatai grid w-full gap-(--section-y-sm)">
        {/* The chapter names itself at the largest size on the plate. This one
            has no photograph and no line to compete with, so the name can take
            the space a headline takes elsewhere — the same mono-and-signal
            device the photo chapters use, just given the whole stage. */}
        <div className="grid gap-6">
          <h2 className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-display-2 font-medium uppercase tracking-wide leading-display">
            <span className="text-signal-500">{index}</span>
            <span className="text-inverse">{name}</span>
          </h2>
          {lead && <p className="max-w-[52ch] text-lead leading-snug text-inverse-muted">{lead}</p>}
        </div>

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
      </div>
    </section>
  );
}
