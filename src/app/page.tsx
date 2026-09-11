import { NavProvider } from "@/components/nav-context";
import { SectionAnchor } from "@/components/section-anchor";
import { Reveal } from "@/components/reveal";
import { Header } from "@/components/header";
import { Accordion } from "@/components/accordion";
import { DetailCallout } from "@/components/detail-callout";
import { InquiryForm } from "@/components/inquiry-form";
import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { InquiryTriggerButton } from "@/components/inquiry-trigger-button";
import { ChapterPortal } from "@/components/chapter-portal";
import { HallGalleries } from "@/components/hall-galleries";
import { Hero } from "@/components/ui/hero";
import { HeroDiptych } from "@/components/ui/hero-diptych";
import { Section } from "@/components/ui/section";
import { ChapterLayer } from "@/components/ui/chapter-layer";
import { PlateChapter } from "@/components/ui/plate-chapter";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { PillarSplit } from "@/components/ui/pillar-split";
import { SpecTable } from "@/components/ui/spec-table";
import { StatGrid } from "@/components/ui/stat-grid";
import { ProcessScroll } from "@/components/ui/process-scroll";
import { MaterialStrip } from "@/components/ui/material-strip";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  NAV,
  PHONE,
  EMAIL,
  ADDRESS,
  ICO,
  HERO_META,
  STATS,
  ROOF_META,
  HOUSE_META,
  CLT_POINTS,
  FLAT_SPEC,
  PITCHED_SPEC,
  PROCESS,
  HOUSE_MATERIALS,
  HALLS,
  FAQ,
  CONTACT_ROWS,
  FOOTER_COLUMNS,
} from "@/lib/data";

export default function Home() {

  return (
    <NavProvider>
    <InquiryModalProvider>
      <div className="min-h-screen bg-surface-page">
        <Header items={NAV} phone={PHONE} />

        <main>
        {/* Chapters are two planes: a full-screen plate that pins itself, and
            the chapter body that slides up and covers it (see PlateChapter).
            Piloted here and on Střechy; the rest of the page still runs on
            ChapterLayer's shallower strip-overlap until this is signed off. */}
        <SectionAnchor id="home">
        <PlateChapter
          plate={
          <HeroDiptych
            eyebrow="Střechy a dřevěné konstrukce"
            title="Dva obory, jedna firma."
            lead="Ploché i šikmé střechy, sloupkové konstrukce, CLT panely, roubenky — od skladby a detailu po předání."
            meta={HERO_META}
            left={{
              src: "/photos/pillar-strechy.webp",
              alt: "Krov novostavby proti obloze",
              index: "01",
              label: "Střechy",
              caption: "Ploché i šikmé",
              href: "#strechy",
            }}
            right={{
              src: "/photos/pillar-domy.webp",
              alt: "Dřevostavba s laťovou fasádou",
              index: "02",
              label: "Domy",
              caption: "Sloupkové, CLT, roubenky",
              href: "#domy",
            }}
            actions={
              <>
                <InquiryTriggerButton variant="inverse" size="lg" arrow>
                  Poptávka
                </InquiryTriggerButton>
                {/* Druhé tlačítko mířilo na Realizace, které na stránce už
                    nejsou. Telefon je jediná další věc, kterou po člověku v
                    hero chceme — a obě cesty do obsahu už drží ty dva panely
                    nad tlačítky. */}
                <Button variant="inverse-outline" size="lg" href={`tel:${PHONE.replace(/\s/g, "")}`}>
                  {PHONE}
                </Button>
              </>
            }
          />
          }
        >
        {/* Front matter — co děláme → proces. The one chapter with no tab:
            the numbered tabs mark the sections in the menu. */}
        <Section density="lg">
          <Reveal>
            <SectionHeader
              eyebrow="Co děláme"
              title="Dvě věci. Obě naplno."
              lead="Střecha a dřevěná konstrukce jsou u nás jeden obor. Proto umíme obojí do detailu a nepřehazujeme odpovědnost na někoho dalšího."
            />
          </Reveal>
          <PillarSplit
            left={{
              eyebrow: "Střechy",
              title: "Střechy",
              body: "Ploché i šikmé. Skladba, izolace, oplechování, detail.",
              items: ["Ploché střechy", "Šikmé střechy"],
              label: "Plochá střecha — svařování fólie",
              src: "/photos/pillar-svarovani-folie.webp",
              href: "#strechy",
            }}
            right={{
              eyebrow: "Domy",
              title: "Domy",
              body: "Dřevěné konstrukce od sloupku po ručně tesanou roubenku.",
              items: ["Sloupkové konstrukce", "CLT panely", "Roubenky"],
              label: "CLT panel na jeřábu",
              src: "/photos/clt-panel-na-jerabu.webp",
              href: "#domy",
            }}
          />
        </Section>

        {/* The heading lives inside ProcessScroll rather than above it: it has
            to stay on screen with the steps while you scroll through them,
            which it can't do from outside the pinned panel. */}
        <Section tone="inverse" density="md">
          <ProcessScroll
            steps={PROCESS}
            eyebrow="Proces"
            title="Jak to u nás probíhá."
            lead="Pět kroků, jeden odpovědný člověk. Žádné „to se uvidí na stavbě“."
          />
        </Section>
        </PlateChapter>
        </SectionAnchor>

        {/* No label on the layer: the chapter names itself on its plate below,
            at heading scale. The rule stays as the sheet's leading edge. */}
        <ChapterLayer>
        <SectionAnchor id="strechy">
          <Hero
            height="66svh"
            marker={{ index: "01", name: "Střechy" }}
            title="Střecha je skladba, ne krytina."
            lead="Ploché a šikmé střechy pro rodinné domy, bytové domy i průmyslové objekty. Od návrhu skladby po fotodokumentaci skrytých vrstev."
            src="/photos/hero-strechy.webp"
            label="Plochá střecha — detail atiky"
            meta={ROOF_META}
          />
        </SectionAnchor>

        {/* Kapitola je teď jedna sekce: dva typy střech a konec. Skladby
            vrstev, detaily atiky a přehled krytin šly pryč — na marketingové
            onepage je to katalog, ne argument. Co z nich zbylo, drží ty dvě
            krátké tabulky pod fotkami. */}
        <Section density="lg">
          <Reveal>
            <SectionHeader
              eyebrow="Konstrukce"
              title="Dva typy střech, jedna parta."
              lead="Nemáme jednu skladbu, kterou tlačíme na všechno. Vybíráme podle sklonu, rozpočtu a toho, co daná stavba unese."
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-(--grid-gap) max-sm:grid-cols-1!">
            {[
              { i: "01", eyebrow: "Ploché střechy", title: "Ploché střechy", label: "Plochá střecha — hydroizolace PVC-P", src: "/photos/strecha-plocha-pvc.webp", body: "Hydroizolace z PVC-P nebo modifikovaného asfaltu, spádové vrstvy z EPS, atiky a vpusti. Skryté vrstvy fotíme, než je zakryjeme.", spec: FLAT_SPEC },
              { i: "02", eyebrow: "Šikmé střechy", title: "Šikmé střechy", label: "Šikmá střecha — pokládka krytiny", src: "/photos/strecha-sikma-pokladka.webp", body: "Krovy, rekonstrukce krovů, falcovaný plech, tašky, štípaný šindel. Tesařinu děláme sami — krov a krytina si u nás nikdy neodporují.", spec: PITCHED_SPEC },
            ].map((c) => (
              <Reveal key={c.i}>
                <div className="grid gap-5 content-start">
                  <Photo src={c.src} ratio="project" label={c.label} hoverZoom />
                  <Eyebrow index={c.i}>{c.eyebrow}</Eyebrow>
                  <h3 className="text-h4 font-display font-medium tracking-heading text-strong">{c.title}</h3>
                  <p className="text-body-md leading-body text-body">{c.body}</p>
                  <SpecTable rows={c.spec} />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
        </ChapterLayer>

        <ChapterLayer>
        <SectionAnchor id="domy">
          <Hero
            height="66svh"
            marker={{ index: "02", name: "Domy" }}
            title="Dřevo unese víc, než si myslíte."
            lead="Sloupkové konstrukce, CLT panely a ručně tesané roubenky. Tři technologie, jedna parta a jeden odpovědný stavbyvedoucí."
            src="/photos/hero-domy.webp"
            label="CLT panel — montáž na jeřábu"
            meta={HOUSE_META}
          />
        </SectionAnchor>

        <Section density="lg">
          <Reveal>
            <SectionHeader
              eyebrow="Konstrukce"
              title="Tři cesty k dřevěnému domu."
              lead="Jedna technologie nesedí na všechno. Vybíráme podle rozponů, rozpočtu a toho, jak chcete dům vidět zvenku i zevnitř."
            />
          </Reveal>
          <div className="grid grid-cols-3 gap-(--grid-gap) max-lg:grid-cols-2! max-sm:grid-cols-1!">
            {[
              { i: "01", eyebrow: "Sloupkové konstrukce", title: "Sloupkové konstrukce", label: "Sloupková konstrukce — hrubá stavba", src: "/photos/domy-sloupkova-konstrukce.webp", body: "Variabilní a cenově nejpříznivější. Difuzně otevřené skladby, dřevovláknitá izolace, volná dispozice." },
              { i: "02", eyebrow: "CLT panely", title: "CLT panely", label: "CLT panel — hrubá stavba", src: "/photos/clt-panel-hruba-stavba.webp", body: "Tuhost, akustika, rychlost. Hrubá stavba stojí za dny a panel je nosná stěna i pohledový povrch." },
              { i: "03", eyebrow: "Roubenky", title: "Roubenky", label: "Roubenka — tesaný rybinový spoj", src: "/photos/domy-roubenka-spoj.webp", body: "Ručně tesané spoje z masivního smrku. Nejpomalejší a nejpoctivější způsob, jak postavit dům." },
            ].map((c) => (
              <Reveal key={c.i}>
                <div className="grid gap-5 content-start">
                  <Photo src={c.src} ratio="project" label={c.label} hoverZoom />
                  <Eyebrow index={c.i}>{c.eyebrow}</Eyebrow>
                  <h3 className="text-h4 font-display font-medium tracking-heading text-strong">{c.title}</h3>
                  <p className="text-body-md leading-body text-body">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader
              eyebrow="Detail"
              title="Spoj, který drží dům."
              lead="U dřeva rozhoduje spoj. Tesařský, šroubovaný nebo lepený — ale vždy s vědomím, co se s dřevem stane za dvacet let."
            />
          </Reveal>
          <DetailCallout points={CLT_POINTS} />
        </Section>

        <Section density="lg">
          <Reveal>
            <SectionHeader eyebrow="Materiál" title="Dřevo, se kterým pracujeme." align="stack" />
          </Reveal>
          <MaterialStrip items={HOUSE_MATERIALS} />
        </Section>

        {/* Kapitola končí tím, kde ty domy vznikají. Bez čísla a bez položky
            v menu: není to třetí obor, je to zázemí toho druhého — a fotky
            jsou tu bez popisků schválně, protože k nim žádný technický
            kontext od firmy nemáme. Po zrušení Realizací je to zároveň jediné
            místo, kde je vidět opravdová práce, takže nese víc než dřív. */}
        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader
              eyebrow="Dílna"
              title="Výroba rodinných domů v dílně TATAI."
              lead="Ukázka fotek z našich dvou hal, kde to všechno vzniká."
            />
          </Reveal>
          <Reveal delay={0.07}>
            <HallGalleries halls={HALLS} />
          </Reveal>
        </Section>
        </ChapterLayer>

        {/* Portál — prolet slovem — dřív otevíral Realizace. Ty jsou pryč,
            ale ta animace je nejsilnější věc na stránce, tak ji dostala
            kapitola, která po nich zůstala jako pointa: O nás. Proto tahle
            kapitola nemá ChapterLayer ani tab, otevírá se sama sebou.
            Slovo je TATAI, ne „O NÁS“ — do jména firmy se lítá líp než do
            předložky a kamera potřebuje písmeno s dírou uprostřed. */}
        <SectionAnchor id="o-nas">
          <ChapterPortal
            word="TATAI"
            index="03"
            label="O nás"
            caption="Čtyři vlastní party. Jeden stavbyvedoucí na zakázku. Jedno číslo, na které voláte."
            enterLabel="Přejít na O nás"
          >
            <div className="container-tatai grid gap-(--section-y-sm)">
              <h2 className="max-w-[56ch] text-h1 font-display font-medium tracking-display leading-tight text-strong">
                Parta, která zvedá krovy a svařuje fólie. Od roku 2016, po celé ČR.
              </h2>

              {/* Čísla nesou to, co dřív nesla mřížka realizací: důkaz. Sedí
                  hned pod nadpisem, aby první obrazovka po proletu nebyla jen
                  věta. */}
              <Reveal>
                <StatGrid items={STATS} />
              </Reveal>

              <div className="grid gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-12!" style={{ gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)" }}>
                <Reveal>
                  <div className="grid gap-6 max-w-[62ch] content-start">
                    <Eyebrow>Firma</Eyebrow>
                    <h3 className="text-h2 font-display font-medium tracking-heading leading-heading text-strong">
                      Začali jsme střechami. U dřeva jsme zůstali.
                    </h3>
                    <p className="text-body-lg leading-body text-body">
                      Prvních deset let jsme dělali skoro výhradně střechy — ploché i šikmé, hodně rekonstrukcí. Tesařina, kterou to
                      vyžadovalo, nás dovedla k celým konstrukcím: sloupkovým stavbám, CLT a nakonec i roubenkám.
                    </p>
                    <p className="text-body-lg leading-body text-body">
                      Klíčové práce neděláme přes subdodavatele. Máme čtyři vlastní party a jednoho stavbyvedoucího na zakázku. Když
                      se něco pokazí, víte, komu volat.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.07}>
                  <Photo src="/photos/team-stavbyvedouci.webp" ratio="portrait" label="Stavbyvedoucí na střeše" caption="Olomouc, 2025" />
                </Reveal>
              </div>
            </div>
          </ChapterPortal>
        </SectionAnchor>

        {/* Last sheet — the footer deliberately shares its dark surface with
            only the signal hairline between, so nothing slides over it.
            Kontakt už neotevírá vlastní celoobrazovková deska: byla to třetí
            tmavá plocha v řadě a všechno, co na ní stálo, říká formulář hned
            pod ní líp. Zůstal jen malý popisek vlevo — stejné mono značení,
            jakým se hlásí kapitola O nás, jen bez čísla: tohle není další
            kapitola, je to cesta ven. */}
        <ChapterLayer veiled={false} label="Kontakt">
        <SectionAnchor id="kontakt">
          <Section tone="raised" density="lg">
            <div className="grid gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-12!" style={{ gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)" }}>
              <InquiryForm eyebrow="Poptávka" />
              <div className="grid gap-10 content-start">
                <SpecTable rows={CONTACT_ROWS} />
                <Photo ratio="detail" label="Mapa — sídlo a působnost" />
              </div>
            </div>
          </Section>
        </SectionAnchor>

        <Section density="lg">
          <Reveal>
            <SectionHeader eyebrow="Časté otázky" title="Na co se ptáte nejčastěji." align="stack" />
          </Reveal>
          <Accordion items={FAQ} />

          {/* The phone belongs here rather than on the plate: by this point
              the reader has had the form and read the answers, so the only
              people still going are the ones who'd rather just ask someone. */}
          <Reveal>
            <div className="mt-(--section-y-sm) flex flex-wrap items-center justify-between gap-8 border-t border-border-hairline pt-(--section-y-sm)">
              <div className="grid max-w-[46ch] gap-2">
                <h3 className="font-display text-h3 font-medium tracking-heading text-strong">
                  Nenašli jste odpověď? Zavolejte nám.
                </h3>
                <p className="text-body-md leading-body text-body">
                  Na poptávku se ozveme do dvou pracovních dnů. Když to spěchá, zavolejte rovnou — poradíme i po telefonu.
                </p>
              </div>
              <Button variant="outline" size="lg" href={`tel:${PHONE.replace(/\s/g, "")}`}>
                {PHONE}
              </Button>
            </div>
          </Reveal>
        </Section>
        </ChapterLayer>
        </main>

        {/* The chapter closes on the questions rather than on a dark block, so
            this hairline is carrying the whole light-to-footer seam on its
            own. */}
        <div aria-hidden className="h-px w-full bg-signal-500" />

        <Footer
          phone={PHONE}
          email={EMAIL}
          address={ADDRESS}
          ico={ICO}
          claim="Střechy a dřevěné konstrukce se stejnou péčí o detail. Od roku 2016."
          columns={FOOTER_COLUMNS}
        />
      </div>
    </InquiryModalProvider>
    </NavProvider>
  );
}
