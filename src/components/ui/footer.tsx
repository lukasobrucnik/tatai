import type { FOOTER_COLUMNS } from "@/lib/data";

export function Footer({
  columns,
  phone,
  email,
  address,
  ico,
  claim,
}: {
  columns: typeof FOOTER_COLUMNS;
  phone: string;
  email: string;
  address: string;
  ico: string;
  claim: string;
}) {
  return (
    <footer className="bg-surface-inverse text-inverse-muted pt-(--section-y-md) pb-10">
      <div className="container-tatai">
        <div className="grid gap-12 pb-(--section-y-sm) border-b border-border-inverse grid-cols-[minmax(0,1.4fr)_repeat(auto-fit,minmax(150px,1fr))]">
          <div className="grid gap-6 content-start">
            <span className="font-display font-semibold text-[28px] tracking-heading text-inverse">
              TATA<span className="text-signal-500">I</span>
            </span>
            {claim && <p className="text-body-md max-w-[34ch] leading-body">{claim}</p>}
          </div>
          {columns.map((col) => (
            <nav key={col.title} className="grid gap-4 content-start">
              <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{col.title}</span>
              {col.links.map((l) => (
                <a key={l.label} href={l.href} className="text-graphite-300 text-body-md no-underline transition-colors duration-150 hover:text-signal-500">
                  {l.label}
                </a>
              ))}
            </nav>
          ))}
          <div className="grid gap-4 content-start">
            <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">Kontakt</span>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-inverse font-mono text-body-md no-underline">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="text-graphite-300 text-body-md no-underline">
              {email}
            </a>
            <span className="text-graphite-400 text-body-sm leading-snug">{address}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 justify-between pt-8 font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">
          <span>© {new Date().getFullYear()} TATAI s.r.o.{ico ? ` — IČO ${ico}` : ""}</span>
          <span>Střechy &amp; dřevostavby</span>
        </div>
      </div>
    </footer>
  );
}
