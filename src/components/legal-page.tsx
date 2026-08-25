import type { ReactNode } from "react";
import Link from "next/link";
import { NavProvider } from "@/components/nav-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/ui/footer";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { NAV, PHONE, EMAIL, ADDRESS, ICO, FOOTER_COLUMNS } from "@/lib/data";

export function LegalPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <NavProvider>
      <div className="min-h-screen bg-surface-page">
        <Header items={NAV} phone={PHONE} hrefPrefix="/" />

        <main>
          <Section density="lg">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 mb-12 font-mono text-body-sm tracking-eyebrow uppercase text-strong border border-border-strong px-[22px] py-3.5 min-h-[48px] no-underline transition-colors duration-150 hover:bg-graphite-1000 hover:border-graphite-1000 hover:text-bone-100"
            >
              <span aria-hidden className="inline-block text-[1.1em] leading-none transition-transform duration-150 group-hover:-translate-x-[3px]">
                ←
              </span>
              Zpět na web
            </Link>
            <div className="grid gap-6 max-w-[68ch] pb-14 border-b border-border-hairline">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1 className="text-h1 font-display font-medium tracking-display leading-tight text-strong">{title}</h1>
              {lead && <p className="text-lead leading-snug max-w-[52ch] text-body">{lead}</p>}
            </div>
            <div className="grid gap-10 max-w-[68ch] pt-14">{children}</div>
          </Section>
        </main>

        <Footer
          phone={PHONE}
          email={EMAIL}
          address={ADDRESS}
          ico={ICO}
          claim="Střechy a dřevěné konstrukce se stejnou péčí o detail. Od roku 2016."
          columns={FOOTER_COLUMNS}
        />
      </div>
    </NavProvider>
  );
}
