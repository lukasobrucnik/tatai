import Image from "next/image";
import Link from "next/link";
import type { FOOTER_COLUMNS } from "@/lib/data";

export function Footer({
  columns,
  phone,
  email,
  address,
  ico,
  claim,
  hrefPrefix = "",
}: {
  columns: typeof FOOTER_COLUMNS;
  phone: string;
  email: string;
  address: string;
  ico: string;
  claim: string[];
  /** "/" on a page that is not the homepage: the column links are fragments of
   *  the homepage, and a bare "#strechy" on /ochrana-soukromi points at an
   *  element that page does not have — the link just does nothing. The header
   *  already took this prefix; the footer was left behind. */
  hrefPrefix?: string;
}) {
  return (
    <footer className="bg-surface-inverse text-inverse-muted pt-(--section-y-md) pb-14">
      <div className="container-tatai">
        <div className="grid gap-12 pb-(--section-y-sm) border-b border-border-inverse grid-cols-[minmax(0,1.9fr)_repeat(auto-fit,minmax(140px,1fr))] max-lg:grid-cols-1!">
          <div className="grid gap-6 content-start">
            <Image src="/logo/tatai-mark.webp" alt="TATAI" width={192} height={119} className="h-10 w-auto" />
            {claim.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-[46ch] text-body-md leading-body">
                {paragraph}
              </p>
            ))}
          </div>
          {columns.map((col) => (
            <nav key={col.title} className="grid gap-4 content-start">
              <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">{col.title}</span>
              {col.links.map((l) => (
                <a key={l.label} href={`${hrefPrefix}${l.href}`} className="inline-flex min-h-8 items-center text-graphite-300 text-body-md no-underline transition-colors duration-150 hover:text-signal-500">
                  {l.label}
                </a>
              ))}
            </nav>
          ))}
          <div className="grid gap-4 content-start">
            <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400">Kontakt</span>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex min-h-8 items-center text-inverse font-mono text-body-md no-underline">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="inline-flex min-h-8 items-center text-graphite-300 text-body-md no-underline">
              {email}
            </a>
            <span className="text-graphite-400 text-body-sm leading-snug">{address}</span>
          </div>
        </div>
        <div className="grid items-center gap-x-8 gap-y-5 pt-10 font-mono text-eyebrow tracking-eyebrow uppercase text-graphite-400 grid-cols-[auto_1fr_auto] max-xl:grid-cols-1! max-xl:justify-items-center! max-xl:text-center!">
          <span>© {new Date().getFullYear()} TATAI s.r.o.{ico ? ` — IČO ${ico}` : ""}</span>
          {/* Autorský podpis. Vědomě nejtišší text na stránce — o dva stupně
              tmavší než řádek, ve kterém sedí, takže ho najde, kdo ho hledá,
              a nikoho z klientů TATAI netahá za oko. */}
          <span className="justify-self-center text-graphite-600">Created by Lukáš Obručník</span>
          <div className="flex flex-wrap justify-end gap-x-8 gap-y-4 max-xl:justify-center!">
            <Link href="/ochrana-soukromi" className="inline-flex min-h-8 items-center text-graphite-400 no-underline hover:text-signal-500 transition-colors duration-150">
              Ochrana soukromí
            </Link>
            <Link href="/obchodni-podminky" className="inline-flex min-h-8 items-center text-graphite-400 no-underline hover:text-signal-500 transition-colors duration-150">
              Obchodní podmínky
            </Link>
            <span>Střechy &amp; dřevostavby</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
