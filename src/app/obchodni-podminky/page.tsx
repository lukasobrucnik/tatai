import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { EMAIL, ICO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Obchodní podmínky — TATAI",
  description: "Obecné obchodní podmínky pro poptávky a zakázky realizované společností TATAI.",
};

function H({ children }: { children: string }) {
  return <h2 className="text-h4 font-display font-medium tracking-heading text-strong">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body-md leading-body text-body">{children}</p>;
}

export default function ObchodniPodminky() {
  return (
    <LegalPage
      eyebrow="Obchodní podmínky"
      title="Obecné obchodní podmínky"
      lead="Obecný rámec, podle kterého poptávky a zakázky vyřizujeme. Konkrétní rozsah, cena a termíny se vždy řídí individuální nabídkou nebo smlouvou k dané zakázce."
    >
      <div className="grid gap-4">
        <H>Úvodní ustanovení</H>
        <P>
          Tyto podmínky vydává TATAI s.r.o., IČO {ICO}, se sídlem Křižíkova 965/1, 779 00 Olomouc (dále jen „zhotovitel“), a
          upravují obecný postup při vyřizování poptávek a realizaci zakázek v oblasti střech a dřevěných
          konstrukcí. Konkrétní práva a povinnosti k jednotlivé zakázce upravuje vždy individuální nabídka nebo
          smlouva mezi zhotovitelem a zákazníkem.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Poptávka a nabídka</H>
        <P>
          Poptávka podaná přes web, telefonicky nebo e-mailem je nezávazná. Na jejím základě obvykle provedeme
          prohlídku a připravíme cenovou nabídku s návrhem skladby a rozsahu prací. Nabídka je platná po dobu v ní
          uvedenou.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Uzavření zakázky</H>
        <P>
          Zakázka vzniká na základě odsouhlasení nabídky, případně podpisem samostatné smlouvy o dílo, ve které jsou
          upřesněny rozsah prací, cena, termíny a další podmínky konkrétní realizace.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Realizace</H>
        <P>
          Práce provádíme v rozsahu a termínech dohodnutých v nabídce nebo smlouvě k dané zakázce. O případných
          změnách oproti původnímu zadání zákazníka informujeme před jejich provedením.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Cena a platba</H>
        <P>
          Cena zakázky se řídí individuální cenovou nabídkou. Způsob a splatnost plateb je uvedena v nabídce nebo
          smlouvě k dané zakázce.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Záruka a reklamace</H>
        <P>
          Na provedené dílo poskytujeme záruku v rozsahu uvedeném v nabídce nebo smlouvě k dané zakázce, v souladu s
          platnými právními předpisy. Reklamace vyřizujeme na kontaktech uvedených níže.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Ochrana osobních údajů</H>
        <P>
          Zpracování osobních údajů poskytnutých v souvislosti s poptávkou nebo zakázkou se řídí našimi{" "}
          <Link href="/ochrana-soukromi" className="text-strong underline decoration-border-strong underline-offset-2 hover:text-signal-600">
            zásadami ochrany osobních údajů
          </Link>
          .
        </P>
      </div>

      <div className="grid gap-4">
        <H>Závěrečná ustanovení</H>
        <P>
          Tyto obecné obchodní podmínky se vztahují na vztahy neupravené individuální smlouvou nebo nabídkou. Vztahy
          mezi zhotovitelem a zákazníkem se řídí právním řádem České republiky. Podmínky můžeme čas od času
          aktualizovat, aktuální znění je vždy dostupné na této stránce. S dotazy nás kontaktujte na e-mailu {EMAIL}.
        </P>
      </div>
    </LegalPage>
  );
}
