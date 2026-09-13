import type { Metadata } from "next";
import Link from "next/link";
import { NavProvider } from "@/components/nav-context";
import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/ui/footer";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { NAV, PHONE, EMAIL, ADDRESS, ICO, FOOTER_COLUMNS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
  // A 404 that gets indexed is a 404 that shows up in results. Next sends the
  // right status code; this makes sure a crawler that renders anyway drops it.
  robots: { index: false, follow: true },
};

/**
 * The way back, rather than a dead end: the site is one page, so every wrong
 * URL has exactly one sensible destination and the phone number is right
 * there for anyone who would rather just ask.
 */
export default function NotFound() {
  return (
    <NavProvider>
      <InquiryModalProvider>
        <div className="min-h-screen bg-surface-page">
          <Header items={NAV} phone={PHONE} hrefPrefix="/" />

          <main>
            <Section density="lg">
              <div className="grid max-w-[52ch] gap-6 py-(--section-y-sm)">
                <Eyebrow index="404">Stránka nenalezena</Eyebrow>
                <h1 className="text-h1 font-display font-medium tracking-display leading-tight text-strong">
                  Tahle adresa u nás nic nestaví.
                </h1>
                <p className="text-lead leading-snug text-body">
                  Odkaz je nejspíš starý nebo překlepnutý. Všechno, co děláme — střechy, dřevostavby i kontakt — najdete
                  na jedné stránce.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button variant="primary" size="lg" arrow href="/">
                    Zpět na web
                  </Button>
                  <Button variant="outline" size="lg" href={`tel:${PHONE.replace(/\s/g, "")}`}>
                    {PHONE}
                  </Button>
                </div>
                <p className="pt-2 text-body-md text-body">
                  Nebo rovnou na{" "}
                  <Link href="/#kontakt" className="text-strong underline underline-offset-4 hover:text-signal-600">
                    poptávkový formulář
                  </Link>
                  .
                </p>
              </div>
            </Section>
          </main>

          <div aria-hidden className="signal-rule h-px w-full" />

          <Footer
            phone={PHONE}
            email={EMAIL}
            address={ADDRESS}
            ico={ICO}
            claim={[
            "Střechy a dřevěné konstrukce po celé ČR. Ploché i šikmé střechy, sloupkové stavby, CLT panely a ručně tesané roubenky — konstrukci i střechu nad ní stavíte u jedné firmy, na jednu smlouvu a s jednou zárukou.",
            "Vlastní party, vlastní dílna a jeden stavbyvedoucí na zakázku. Poradíme se skladbou i detaily, skryté vrstvy nafotíme dřív, než je zakryjeme, a po předání zvedáme telefon dál. Od roku 2016.",
          ]}
            columns={FOOTER_COLUMNS}
            hrefPrefix="/"
          />
        </div>
      </InquiryModalProvider>
    </NavProvider>
  );
}
