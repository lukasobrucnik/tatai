import { NavProvider } from "@/components/nav-context";
import { AnchorTarget, SectionAnchor } from "@/components/section-anchor";
import { Reveal } from "@/components/reveal";
import { Header } from "@/components/header";
import { Accordion } from "@/components/accordion";
import { InquiryForm } from "@/components/inquiry-form";
import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { InquiryTriggerButton } from "@/components/inquiry-trigger-button";
import { ChapterPortal } from "@/components/chapter-portal";
import { WorkshopGallery } from "@/components/workshop-gallery";
import { Hero } from "@/components/ui/hero";
import { HeroDiptych } from "@/components/ui/hero-diptych";
import { Section } from "@/components/ui/section";
import { CoverStack } from "@/components/ui/cover-stack";
import { ChapterMarker } from "@/components/ui/chapter-marker";
import { FaqSchema } from "@/components/structured-data";
import { PlateChapter } from "@/components/ui/plate-chapter";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { SpecTable } from "@/components/ui/spec-table";
import { OfficeMap } from "@/components/ui/office-map";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  NAV,
  PHONE,
  EMAIL,
  ADDRESS,
  MAP_URL,
  ICO,
  HERO_META,
  ROOF_TYPES,
  HOUSE_TYPES,
  HALL_REASONS,
  HALL_LEAD,
  BUILD_STEPS,
  HALL_PHOTOS,
  PROCESS,
  FAQ,
  CONTACT_ROWS,
  FOOTER_CLAIM,
  FOOTER_COLUMNS,
} from "@/lib/data";

/* Krátká verze webu (říjen 2026). Majitel chce říct dvě věci: děláme střechy
   a domy, a domy stavíme v hale, takže do nich neprší. Všechno ostatní —
   počty part, statistiky, skladby vrstev, detaily spojů — šlo pryč. Dlouhá
   verze je v gitu pod tagem `pred-zkracenim-2026-10-21` a její texty
   v docs/archiv. */
export default function Home() {
  const tel = `tel:${PHONE.replace(/\s/g, "")}`;

  return (
    <NavProvider>
    <InquiryModalProvider>
      <div className="min-h-screen bg-surface-page">
        <Header items={NAV} phone={PHONE} />

        <main>
        {/* Hero je deska, přes kterou se rovnou vysune kapitola Střechy.
            Mezistupeň „Co děláme“ i pinovaný proces pod ní šly pryč: oba jen
            opakovaly to, co už říkají dva panely hera. */}
        <SectionAnchor id="home">
        <PlateChapter
          plate={
          <HeroDiptych
            eyebrow="Střechy a dřevostavby"
            title="Střechy a dřevěné domy."
            lead="Domy vyrábíme v naší hale a u vás je jen smontujeme. Do konstrukce vám nezaprší a stavba stojí za pár dní."
            meta={HERO_META}
            left={{
              src: "/photos/pillar-strechy.webp",
              alt: "Krov novostavby proti obloze",
              index: "01",
              label: "Střechy",
              caption: "Ploché i šikmé",
              href: "#strechy",
            }}
            right={{
              src: "/photos/pillar-domy.webp",
              alt: "Dřevostavba s laťovou fasádou",
              index: "02",
              label: "Domy",
              caption: "Vyrobené v hale",
              href: "#domy",
            }}
            actions={
              <>
                <InquiryTriggerButton variant="inverse" size="lg" arrow>
                  Nezávazná poptávka
                </InquiryTriggerButton>
                <Button variant="inverse-outline" size="lg" href={tel}>
                  {PHONE}
                </Button>
              </>
            }
          />
          }
        >
        {/* Domy přejíždějí přes konec Střech stejně, jako Střechy přejely přes
            hero — jen bez pohybu pod nimi: Střechy se zastaví spodním okrajem
            a Domy se přes ně vysunou (viz CoverStack). */}
        {/* Cíl skoku na Střechy stojí před blokem, ne v něm: Střechy jsou
            přišpendlené, a dokud jsou, jejich poloha na obrazovce neodpovídá
            místu ve stránce. */}
        <AnchorTarget id="strechy" />
        <CoverStack
          pinned={
            <>
                <SectionAnchor id="strechy" target={false}>
                  <Hero
                    height="66svh"
                    marker={{ index: "01", name: "Střechy" }}
                    title="Ploché i šikmé střechy."
                    lead="Novostavby, rekonstrukce i opravy — na rodinné domy, bytové domy i haly."
                    src="/photos/hero-strechy.webp"
                    label="Plochá střecha — detail atiky"
                  />
                </SectionAnchor>

                <Section density="lg" topRule>
                  <div className="grid grid-cols-2 gap-(--grid-gap) max-md:grid-cols-1! max-md:gap-16!">
                    {ROOF_TYPES.map((c) => (
                      <Reveal key={c.i}>
                        <div className="grid content-start gap-5">
                          <Photo src={c.src} ratio="project" label={c.label} hoverZoom />
                          <Eyebrow index={c.i}>Střechy</Eyebrow>
                          <h3 className="text-h2 font-display font-medium tracking-heading leading-heading text-strong">{c.title}</h3>
                          <p className="max-w-[40ch] text-body-lg leading-body text-body">{c.body}</p>
                          <ul className="m-0 grid list-none border-t border-border-hairline p-0">
                            {c.items.map((it) => (
                              <li
                                key={it}
                                className="flex items-center gap-4 border-b border-border-hairline py-3.5 font-mono text-caption uppercase tracking-mono text-body"
                              >
                                <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-signal-500" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  {/* Dvě věci, které se zákazník u střech ptá jako první — místo
                      tabulek se skladbami, které na marketingové stránce nikdo nečte. */}
                  <Reveal>
                    <dl className="m-0 mt-(--section-y-sm) grid grid-cols-2 gap-(--grid-gap) border-t border-border-strong pt-8 max-md:grid-cols-1!">
                      <div className="grid gap-2">
                        <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">Záruka na dílo</dt>
                        <dd className="m-0 font-display text-h3 font-medium text-strong">10 let</dd>
                      </div>
                      <div className="grid gap-2">
                        <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">Opravy a servis</dt>
                        <dd className="m-0 font-display text-h3 font-medium text-strong">I na střechách od jiných firem</dd>
                      </div>
                    </dl>
                  </Reveal>
                </Section>
            </>
          }
          cover={
            <>
                <SectionAnchor id="domy">
                  <Hero
                    height="66svh"
                    marker={{ index: "02", name: "Domy" }}
                    title="Dřevěné domy, které nezmoknou."
                    lead="Sloupkové konstrukce, CLT panely i roubenky. Vyrobíme je v hale, u vás je jen smontujeme."
                    src="/photos/hero-domy.webp"
                    label="CLT panel — montáž na jeřábu"
                  />
                </SectionAnchor>

                <Section density="lg" topRule>
                  <div className="grid grid-cols-3 gap-(--grid-gap) max-lg:grid-cols-2! max-sm:grid-cols-1! max-sm:gap-14!">
                    {HOUSE_TYPES.map((c) => (
                      <Reveal key={c.i}>
                        <div className="grid content-start gap-5">
                          <Photo src={c.src} ratio="project" label={c.label} hoverZoom sizes="(min-width: 1024px) 33vw, 100vw" />
                          <Eyebrow index={c.i}>Domy</Eyebrow>
                          <h3 className="text-h3 font-display font-medium tracking-heading text-strong">{c.title}</h3>
                          <p className="text-body-md leading-body text-body">{c.body}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </Section>
            </>
          }
        />
        </PlateChapter>
        </SectionAnchor>


        {/* Portál — prolet slovem — dřív otevíral O nás. O nás je pryč
            (počty lidí a historie firmy zákazníka nezajímají), a tak animace,
            která je nejsilnější věc na stránce, dostala hlavní sdělení celého
            webu: domy stavíme v hale. HALA je krátká, na telefonu stojí
            v plné velikosti, a A má díru, do které se dá vletět. */}
        <SectionAnchor id="vyroba">
          <ChapterPortal
            word="HALA"
            index="03"
            label="Výroba"
            destination="Domy stavíme v hale"
            enterLabel="Přejít na Výrobu v hale"
          >
            <div className="container-tatai grid gap-(--section-y-sm)">
              <h2 className="max-w-[20ch] text-display-2 font-display font-medium tracking-display leading-display text-strong">
                Dům postavíme v hale. U vás ho jen smontujeme.
              </h2>

              <Reveal>
                <ol className="m-0 grid list-none grid-cols-3 gap-(--grid-gap) p-0 max-md:grid-cols-1! max-md:gap-8!">
                  {HALL_REASONS.map((r, i) => (
                    <li key={r.title} className="relative grid content-start gap-3 border-t border-border-strong pt-6">
                      <span aria-hidden className="absolute -top-px left-0 h-px w-[22px] bg-signal-500" />
                      <span className="font-mono text-caption tabular-nums tracking-eyebrow text-signal-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-h3 font-medium tracking-heading text-strong">{r.title}</h3>
                      <p className="max-w-[34ch] text-body-lg leading-body text-body">{r.body}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.07}>
                <WorkshopGallery lead={HALL_LEAD} steps={BUILD_STEPS} photos={HALL_PHOTOS} />
              </Reveal>
            </div>
          </ChapterPortal>
        </SectionAnchor>

        {/* Postup na jeden řádek. Dřív to byl pinovaný scroll přes tři
            obrazovky s pěti kroky; čtyři věty to řeknou za jeden pohled. */}
        <Section tone="inverse" density="md" topRule>
          <Reveal>
            <SectionHeader eyebrow="Postup" title="Jak to probíhá." tone="inverse" align="stack" />
          </Reveal>
          <Reveal delay={0.05}>
            <ol className="m-0 grid list-none grid-cols-4 gap-(--grid-gap) p-0 max-lg:grid-cols-2! max-lg:gap-y-10!">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="grid content-start gap-3">
                  <span className="font-mono text-h2 font-medium tabular-nums text-signal-500">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-h3 font-medium tracking-heading text-inverse">{s.title}</h3>
                  <p className="max-w-[28ch] text-body-md leading-body text-inverse-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        <Section density="lg">
          <div className="grid gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-10!" style={{ gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)" }}>
            <Reveal>
              <div className="grid content-start gap-5">
                <Eyebrow>Časté otázky</Eyebrow>
                <h2 className="text-h1 font-display font-medium tracking-heading leading-heading text-strong">Na co se ptáte.</h2>
              </div>
            </Reveal>
            <Accordion items={FAQ} />
          </div>
          <FaqSchema />
        </Section>

        {/* Stránka končí formulářem: kdo došel až sem, ten chce poptat. */}
        <SectionAnchor id="kontakt">
          <Section tone="raised" density="lg" topRule>
            <div className="mb-(--section-y-sm)">
              <ChapterMarker index="04" name="Kontakt" />
            </div>
            <div className="grid gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-12!" style={{ gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)" }}>
              <InquiryForm eyebrow={null} />
              <div className="grid gap-10 content-start">
                <SpecTable rows={CONTACT_ROWS} />
                <OfficeMap
                  src="/photos/mapa-sidlo.webp"
                  alt="Mapa Olomouce s vyznačeným sídlem firmy TATAI"
                  label="Sídlo"
                  address={ADDRESS}
                  note="Po celé ČR — přijedeme za vámi"
                  href={MAP_URL}
                />
              </div>
            </div>
          </Section>
        </SectionAnchor>
        </main>

        <div aria-hidden className="signal-rule h-px w-full" />

        <Footer
          phone={PHONE}
          email={EMAIL}
          address={ADDRESS}
          ico={ICO}
          claim={FOOTER_CLAIM}
          columns={FOOTER_COLUMNS}
        />
      </div>
    </InquiryModalProvider>
    </NavProvider>
  );
}
