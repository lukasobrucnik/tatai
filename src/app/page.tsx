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
import { HeroMain } from "@/components/ui/hero-main";
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
  HERO,
  HERO_META,
  ROOFS_HERO,
  ROOF_TYPES,
  ROOF_FACTS,
  HOUSES_HERO,
  HOUSE_TYPES,
  HOUSE_FACTS,
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
/** Řádek krátkých faktů pod kapitolou — mono štítek, hodnota v display. */
/**
 * Úvod kapitoly (Střechy, Dřevostavby) na světlém podkladu: vlevo značka
 * kapitoly a nadpis, vpravo věta a fakta jako řádky.
 *
 * Dřív obě kapitoly otevíral tmavý pruh s fotkou. Spolu s hlavním hero
 * a portálem HALA to byly čtyři stejné tmavé desky za sebou a fotka ploché
 * střechy navíc nic neukazovala. Fotky teď nesou jen karty typů hned pod
 * úvodem a fakta, která dřív stála osamoceně pod kartami, jsou součástí úvodu.
 */
function ChapterIntro({
  index,
  name,
  title,
  lead,
  facts,
}: {
  index: string;
  name: string;
  title: string;
  lead: string;
  facts: { label: string; value: string }[];
}) {
  return (
    <div className="mb-(--section-y-sm) grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-end gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-10!">
      <div className="grid content-start gap-7">
        <ChapterMarker index={index} name={name} />
        <h2 className="max-w-[15ch] font-display text-display-2 font-medium leading-display tracking-display text-strong">{title}</h2>
      </div>
      <div className="grid content-end gap-8">
        <p className="max-w-[44ch] text-lead leading-snug text-body">{lead}</p>
        <dl className="m-0 grid border-t border-border-strong">
          {facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-6 border-b border-border-hairline py-3.5">
              <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">{f.label}</dt>
              <dd className="m-0 text-right font-display text-body-lg font-medium text-strong">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

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
          <HeroMain
            eyebrow={HERO.eyebrow}
            tag={HERO.tag}
            title={HERO.title}
            lead={HERO.lead}
            meta={HERO_META}
            src={HERO.src}
            alt={HERO.alt}
            links={HERO.links}
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
                <Section density="md" topRule>
                  <ChapterIntro index="01" name="Střechy" title={ROOFS_HERO.title} lead={ROOFS_HERO.lead} facts={ROOF_FACTS} />

                  <div className="grid grid-cols-3 gap-(--grid-gap) max-lg:grid-cols-2! max-sm:grid-cols-1! max-sm:gap-14!">
                    {ROOF_TYPES.map((c) => (
                      <Reveal key={c.i}>
                        <div className="grid content-start gap-5">
                          <Photo src={c.src} ratio="project" label={c.label} hoverZoom sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                          <Eyebrow index={c.i}>Střechy</Eyebrow>
                          <h3 className="text-h3 font-display font-medium tracking-heading text-strong">{c.title}</h3>
                          <p className="max-w-[40ch] text-body-md leading-body text-body">{c.body}</p>
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

                  {/* Specializace, novostavby a modernizace střech jsou
                      rozepsané v Častých otázkách (téma Střechy). */}
                </Section>
                </SectionAnchor>
            </>
          }
          cover={
            <>
                <SectionAnchor id="domy">
                {/* O stupeň světlejší podklad než Střechy: obě kapitoly jsou
                    teď světlé a list, který se přes Střechy vysouvá, od nich
                    musí být poznat. */}
                <Section tone="raised" density="md" topRule>
                  <ChapterIntro index="02" name="Dřevostavby" title={HOUSES_HERO.title} lead={HOUSES_HERO.lead} facts={HOUSE_FACTS} />

                  <div className="grid grid-cols-3 gap-(--grid-gap) max-lg:grid-cols-2! max-sm:grid-cols-1! max-sm:gap-14!">
                    {HOUSE_TYPES.map((c) => (
                      <Reveal key={c.i}>
                        <div className="grid content-start gap-5">
                          <Photo src={c.src} ratio="project" label={c.label} hoverZoom sizes="(min-width: 1024px) 33vw, 100vw" />
                          <Eyebrow index={c.i}>Dřevostavby</Eyebrow>
                          <h3 className="text-h3 font-display font-medium tracking-heading text-strong">{c.title}</h3>
                          <p className="text-body-md leading-body text-body">{c.body}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </Section>
                </SectionAnchor>
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

        <Section density="md">
          <div className="grid items-start gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-10!" style={{ gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)" }}>
            {/* Levý sloupec drží při čtení odpovědí na místě a nese cestu
                dál pro toho, kdo odpověď nenašel — dřív pod nadpisem zůstával
                prázdný sloupec přes celou výšku otázek. */}
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <Reveal>
              <div className="grid content-start gap-5">
                <Eyebrow>Časté otázky</Eyebrow>
                <h2 className="text-h1 font-display font-medium tracking-heading leading-heading text-strong">Na co se ptáte.</h2>
                <p className="max-w-[36ch] text-body-lg leading-body text-body">
                  Nenašli jste odpověď? Zavolejte nám, nebo pošlete nezávaznou poptávku.
                </p>
                <div className="mt-2 grid max-w-[22rem] border-t border-border-strong">
                  <a
                    href={tel}
                    className="group flex items-baseline justify-between gap-6 border-b border-border-hairline py-4 no-underline"
                  >
                    <span className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">Telefon</span>
                    <span className="font-mono text-body-lg text-strong transition-colors duration-150 group-hover:text-signal-600">{PHONE}</span>
                  </a>
                  <div className="pt-6">
                    <InquiryTriggerButton variant="primary" size="md" arrow>
                      Nezávazná poptávka
                    </InquiryTriggerButton>
                  </div>
                </div>
              </div>
            </Reveal>
            </div>
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
                  src="/photos/mapa-sidlo-v2.webp"
                  alt="Mapa Olomouce s vyznačeným sídlem firmy TATAI"
                  label="Sídlo"
                  address={ADDRESS}
                  note="Po celé Moravě — přijedeme za vámi"
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
