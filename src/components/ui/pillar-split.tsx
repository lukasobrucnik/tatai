import Image from "next/image";
import { Eyebrow } from "./eyebrow";

export type PillarData = {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  label: string;
  src?: string;
  href: string;
};

function Pillar({ eyebrow, title, body, items, label, src, href }: PillarData) {
  return (
    <a href={href} className="group grid grid-rows-[auto_1fr] no-underline text-inherit">
      <div className="relative overflow-hidden aspect-4/3 dot-grid-light">
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <span className="absolute left-3 bottom-2.5 font-mono text-eyebrow tracking-eyebrow uppercase text-muted">{label}</span>
        )}
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-signal-500 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </div>
      <div className="grid gap-5 content-start pt-8">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="font-display text-h2 font-medium tracking-display leading-heading text-strong">{title}</h3>
        {body && <p className="text-body-lg leading-body max-w-[38ch] text-body">{body}</p>}
        {items.length > 0 && (
          <ul className="list-none m-0 p-0 grid border-t border-border-hairline">
            {items.map((it) => (
              <li
                key={it}
                className="flex items-center gap-4 py-4 border-b border-border-hairline font-mono text-caption tracking-mono uppercase text-body"
              >
                <span aria-hidden className="w-1.5 h-1.5 bg-signal-500 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        )}
        <span className="inline-flex items-baseline gap-2 text-body-lg font-medium text-strong transition-colors duration-150 group-hover:text-signal-600">
          Zobrazit
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}

export function PillarSplit({ left, right }: { left: PillarData; right: PillarData }) {
  return (
    <div className="grid grid-cols-2 gap-(--grid-gap) relative max-md:grid-cols-1! max-md:gap-16!">
      <Pillar {...left} />
      <Pillar {...right} />
    </div>
  );
}
