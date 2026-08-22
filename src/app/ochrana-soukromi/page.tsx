import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { EMAIL, ICO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ochrana soukromí — TATAI",
  description: "Zásady zpracování osobních údajů a používání cookies na webu TATAI.",
};

function H({ children }: { children: string }) {
  return <h2 className="text-h4 font-display font-medium tracking-heading text-strong">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-body-md leading-body text-body">{children}</p>;
}

export default function OchranaSoukromi() {
  return (
    <LegalPage
      eyebrow="Ochrana soukromí"
      title="Zásady ochrany osobních údajů"
      lead="Jak nakládáme s údaji, které nám poskytnete přes tento web — v poptávkovém formuláři nebo telefonicky."
    >
      <div className="grid gap-4">
        <H>Kdo je správcem údajů</H>
        <P>
          Správcem osobních údajů je společnost TATAI s.r.o., se sídlem Valašské Meziříčí, IČO {ICO}. Ve věcech
          ochrany osobních údajů nás můžete kontaktovat na e-mailu {EMAIL}.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Jaké údaje zpracováváme</H>
        <P>
          Zpracováváme pouze údaje, které nám sami poskytnete — typicky jméno, telefon, e-mail a popis zakázky
          vyplněný v poptávkovém formuláři, případně údaje sdělené telefonicky nebo e-mailem při domlouvání
          prohlídky, nabídky nebo realizace.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Proč údaje zpracováváme</H>
        <P>
          Údaje používáme výhradně k tomu, abychom mohli reagovat na vaši poptávku, domluvit prohlídku, připravit
          cenovou nabídku a případně realizovat zakázku. Nepoužíváme je k ničemu jinému a nepředáváme je třetím
          stranám, s výjimkou situací, kdy nám to ukládá zákon.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Jak dlouho údaje uchováváme</H>
        <P>
          Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a případné navazující spolupráci, případně po dobu
          vyžadovanou právními předpisy (např. účetní a daňové doklady u uzavřených zakázek).
        </P>
      </div>

      <div className="grid gap-4">
        <H>Cookies</H>
        <P>
          Tento web používá cookies nezbytné pro jeho správné fungování. Svou volbu k používání cookies můžete
          kdykoli změnit v nastavení svého prohlížeče.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Vaše práva</H>
        <P>
          Máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz, na omezení zpracování a na
          přenositelnost údajů. Pokud se domníváte, že zpracováváme vaše údaje v rozporu se zákonem, máte právo
          podat stížnost u Úřadu pro ochranu osobních údajů.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Uplatnění práv a kontakt</H>
        <P>
          Ve všech záležitostech týkajících se zpracování vašich osobních údajů nás kontaktujte na e-mailu {EMAIL}.
          Tyto zásady můžeme čas od času aktualizovat, aktuální znění je vždy dostupné na této stránce.
        </P>
      </div>
    </LegalPage>
  );
}
