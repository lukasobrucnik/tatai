import { NavProvider } from "@/components/nav-context";
import { SectionAnchor } from "@/components/section-anchor";
import { Reveal } from "@/components/reveal";
import { Header } from "@/components/header";
import { Accordion } from "@/components/accordion";
import { DetailCallout } from "@/components/detail-callout";
import { InquiryForm } from "@/components/inquiry-form";
import { InquiryModalProvider } from "@/components/inquiry-modal-context";
import { InquiryTriggerButton } from "@/components/inquiry-trigger-button";
import { RealizaceExplorer } from "@/components/realizace-explorer";
import { Hero } from "@/components/ui/hero";
import { HeroDiptych } from "@/components/ui/hero-diptych";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { PhotoGrid } from "@/components/ui/photo-grid";
import { ProjectCard } from "@/components/ui/project-card";
import { PillarSplit } from "@/components/ui/pillar-split";
import { AssemblyStack } from "@/components/ui/assembly-stack";
import { SpecTable } from "@/components/ui/spec-table";
import { ProcessTrack } from "@/components/ui/process-track";
import { MaterialStrip } from "@/components/ui/material-strip";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  NAV,
  PHONE,
  EMAIL,
  ADDRESS,
  ICO,
  PROJECTS,
  FLAT_ROOF,
  PITCHED_ROOF,
  CLT_WALL,
  HERO_META,
  ROOF_META,
  HOUSE_META,
  ROOF_POINTS,
  CLT_POINTS,
  FLAT_SPEC,
  PITCHED_SPEC,
  PROCESS,
  ROOF_MATERIALS,
  HOUSE_MATERIALS,
  FAQ,
  TEAM,
  CONTACT_ROWS,
  FOOTER_COLUMNS,
} from "@/lib/data";

export default function Home() {
  const homeProjects = PROJECTS.slice(1, 4);

  return (
    <NavProvider>
    <InquiryModalProvider>
      <div className="min-h-screen bg-surface-page">
        <Header items={NAV} phone={PHONE} />

        <main>
        <SectionAnchor id="home">
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
                <Button variant="inverse-outline" size="lg" href="#realizace">
                  Realizace
                </Button>
              </>
            }
          />
        </SectionAnchor>

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

        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader
              eyebrow="Realizace"
              title="Zakázky, které stojí za podpisem."
              action={
                <Button variant="outline" arrow href="#realizace">
                  Všechny realizace
                </Button>
              }
            />
          </Reveal>
          <Reveal>
            <a href="#realizace" className="block mb-12">
              <Photo src="/photos/feature-hala-olomouc.webp" ratio="band" label="Plochá střecha — 4 200 m², Olomouc" index="01 / 06" hoverZoom />
              <div className="flex flex-wrap items-baseline justify-between gap-6 pt-5 mt-5 border-t border-border-hairline">
                <span className="font-display text-h3 font-medium tracking-heading text-strong">Výrobní hala Olomouc</span>
                <span className="font-mono text-caption tracking-eyebrow uppercase text-signal-500">Plochá střecha — 2025 →</span>
              </div>
            </a>
          </Reveal>
          <div className="grid grid-cols-3 gap-(--grid-gap) max-lg:grid-cols-2! max-sm:grid-cols-1!">
            {homeProjects.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} index={String(PROJECTS.indexOf(p) + 1).padStart(2, "0")} ratio="project" />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="inverse" density="lg">
          <Reveal>
            <SectionHeader
              tone="inverse"
              eyebrow="Proces"
              title="Jak to u nás probíhá."
              lead="Pět kroků, jeden odpovědný člověk. Žádné „to se uvidí na stavbě“."
            />
          </Reveal>
          <ProcessTrack tone="inverse" steps={PROCESS} />
        </Section>

        <SectionAnchor id="strechy">
          <Hero
            height="66svh"
            eyebrow="Střechy"
            title="Střecha je skladba, ne krytina."
            lead="Ploché a šikmé střechy pro rodinné domy, bytové domy i průmyslové objekty. Od návrhu skladby po fotodokumentaci skrytých vrstev."
            src="/photos/hero-strechy.webp"
            label="Plochá střecha — detail atiky"
            meta={ROOF_META}
          />
        </SectionAnchor>

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

        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader
              eyebrow="Skladba"
              title="Dvě skladby vedle sebe."
              lead="Plochá i šikmá střecha mají úplně jinou stavbu vrstev. Obě dovedeme do posledního milimetru — tady je srovnání."
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-16!">
            <Reveal>
              <AssemblyStack title="Skladba — plochá střecha R1" layers={FLAT_ROOF} />
            </Reveal>
            <Reveal delay={0.07}>
              <AssemblyStack title="Skladba — šikmá střecha" layers={PITCHED_ROOF} />
            </Reveal>
          </div>
        </Section>

        <Section density="lg">
          <Reveal>
            <SectionHeader
              eyebrow="Detail"
              title="Atika, vpusť, prostup."
              lead="Tři místa, kde plochá střecha nejčastěji selže. A tři místa, kterým věnujeme nejvíc času."
            />
          </Reveal>
          <DetailCallout points={ROOF_POINTS} />
        </Section>

        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader eyebrow="Materiál" title="Krytina, na kterou se dá spolehnout." align="stack" />
          </Reveal>
          <MaterialStrip items={ROOF_MATERIALS} />
        </Section>

        <SectionAnchor id="domy">
          <Hero
            height="66svh"
            eyebrow="Domy"
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
          <div className="grid grid-cols-2 gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-12!">
            <Reveal>
              <div className="grid gap-8 content-start">
                <Eyebrow>Skladba</Eyebrow>
                <h2 className="text-h2 font-display font-medium tracking-heading leading-heading text-strong">
                  Stěna, kterou vidíte zevnitř.
                </h2>
                <p className="text-body-lg leading-body text-body">
                  U CLT je nosná konstrukce zároveň interiérovým povrchem. Skladba proto musí být dořešená do milimetru — od
                  difuzní fólie po brus panelu.
                </p>
                <p className="font-mono text-caption tracking-mono text-muted">U = 0,15 W/m²K · difuzně otevřená skladba</p>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <AssemblyStack title="Skladba — obvodová stěna CLT" layers={CLT_WALL} />
            </Reveal>
          </div>
        </Section>

        <Section density="lg">
          <Reveal>
            <SectionHeader
              eyebrow="Detail"
              title="Spoj, který drží dům."
              lead="U dřeva rozhoduje spoj. Tesařský, šroubovaný nebo lepený — ale vždy s vědomím, co se s dřevem stane za dvacet let."
            />
          </Reveal>
          <DetailCallout points={CLT_POINTS} />
        </Section>

        <Section tone="raised" density="lg" topRule>
          <Reveal>
            <SectionHeader eyebrow="Materiál" title="Dřevo, se kterým pracujeme." align="stack" />
          </Reveal>
          <MaterialStrip items={HOUSE_MATERIALS} />
        </Section>

        <Section density="lg" topRule>
          <Reveal>
            <SectionHeader eyebrow="Časté otázky" title="Na co se ptáte nejčastěji." align="stack" />
          </Reveal>
          <Accordion items={FAQ} />
        </Section>

        <SectionAnchor id="realizace">
          <Section density="md">
            <div className="grid gap-8 max-w-[56ch] pt-10">
              <Eyebrow>Realizace</Eyebrow>
              <h2 className="text-h1 font-display font-medium tracking-display leading-tight text-strong">
                Každá stavba má skladbu, fotky a jméno stavbyvedoucího.
              </h2>
            </div>
            <RealizaceExplorer projects={PROJECTS} />
          </Section>
        </SectionAnchor>

        <SectionAnchor id="o-nas">
          <Hero
            height="66svh"
            eyebrow="O nás"
            title="Parta, která zvedá krovy a svařuje fólie."
            lead="Od roku 2016. Působíme po celé ČR."
            label="Parta na stavbě — ráno"
          />
        </SectionAnchor>

        <Section density="lg">
          <div className="grid gap-(--grid-gap) max-lg:grid-cols-1! max-lg:gap-12!" style={{ gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)" }}>
            <Reveal>
              <div className="grid gap-6 max-w-[62ch] content-start">
                <Eyebrow>Firma</Eyebrow>
                <h2 className="text-h2 font-display font-medium tracking-heading leading-heading text-strong">
                  Začali jsme střechami. U dřeva jsme zůstali.
                </h2>
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

          <Reveal delay={0.12}>
            <div className="grid gap-6 mt-(--section-y-sm) pt-(--section-y-sm) border-t border-border-hairline">
              <Eyebrow>Lidé</Eyebrow>
              <h3 className="text-h3 font-display font-medium tracking-heading leading-heading text-strong max-w-[52ch]">
                Lidé, za kterými to stojí.
              </h3>
              <PhotoGrid pattern="quarters" items={TEAM} />
            </div>
          </Reveal>
        </Section>

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

        <Section tone="inverse" density="lg">
          <div className="grid gap-10 max-w-[62ch]">
            <Eyebrow tone="inverse">Kontakt</Eyebrow>
            <h2 className="text-h1 font-display font-medium tracking-display leading-tight text-inverse">
              Napište, co máte za stavbu. Zbytek vymyslíme.
            </h2>
            <p className="text-lead leading-snug max-w-[46ch] text-inverse-muted">
              Prohlídka a návrh skladby jsou nezávazné. Ozveme se do dvou pracovních dnů.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="inverse-outline" size="lg" href={`tel:${PHONE.replace(/\s/g, "")}`}>
                {PHONE}
              </Button>
            </div>
          </div>
        </Section>
        </main>

        {/* Kontakt and Footer share the same dark surface — a full-bleed
            signal-500 hairline is the only seam between them, rather than a
            light form section sandwiched in between. */}
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
