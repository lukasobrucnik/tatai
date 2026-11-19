import type { Metadata } from "next";
import { OG_BASE } from "@/lib/site";
import { LegalPage } from "@/components/legal-page";
import { ADDRESS, COMPANY_NAME, EMAIL, ICO, REGISTRY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Zásady zpracování osobních údajů a měření návštěvnosti na webu TATAI.",
  alternates: { canonical: "/ochrana-soukromi" },
  openGraph: { ...OG_BASE, url: "/ochrana-soukromi", title: "Ochrana soukromí — TATAI" },
  twitter: { card: "summary_large_image", title: "Ochrana soukromí — TATAI", images: ["/twitter-image.jpg"] },
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
          Správcem osobních údajů je společnost {COMPANY_NAME}, se sídlem {ADDRESS}, IČO {ICO}, zapsaná
          v obchodním rejstříku pod spisovou značkou {REGISTRY}. Ve věcech
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
          cenovou nabídku a případně realizovat zakázku. Právním základem je jednání o smlouvě a její plnění
          (čl. 6 odst. 1 písm. b) GDPR). Nepoužíváme je k ničemu jinému, neposíláme vám reklamu a neprodáváme je.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Kdo s údaji pracuje kromě nás</H>
        <P>
          Web běží na hostingu společnosti Vercel Inc., zprávy z poptávkového formuláře nám doručuje e-mailová
          služba Resend a e-mailovou poštu nám provozuje Microsoft (Microsoft 365). Tyto
          služby údaje zpracovávají jen proto, aby web fungoval a poptávka k nám dorazila, a jen podle našich
          pokynů. Jinak údaje třetím stranám nepředáváme, s výjimkou situací, kdy nám to ukládá zákon.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Předání údajů mimo EU</H>
        <P>
          Vercel, Resend i Microsoft jsou společnosti se sídlem v USA, takže k vašim údajům může docházet i ze
          Spojených států. Předání je chráněno rámcem EU–USA pro ochranu osobních údajů (EU-U.S. Data Privacy
          Framework), u kterého Evropská komise rozhodla, že zajišťuje odpovídající ochranu, a doplňkově
          standardními smluvními doložkami schválenými Evropskou komisí.
        </P>
      </div>

      <div className="grid gap-4">
        <H>Jak dlouho údaje uchováváme</H>
        <P>
          Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a případné navazující spolupráci, případně po dobu
          vyžadovanou právními předpisy (např. účetní a daňové doklady u uzavřených zakázek).
        </P>
      </div>

      <div id="mereni" className="grid gap-4 scroll-mt-32">
        <H>Cookies a měření návštěvnosti</H>
        <P>
          Web neukládá žádné reklamní ani sledovací cookies. Do úložiště vašeho prohlížeče si zapamatuje jen to,
          zda jste měření návštěvnosti povolili, nebo odmítli, abychom se nemuseli ptát při každé návštěvě.
        </P>
        <P>
          Pokud měření povolíte, používáme službu Vercel Web Analytics. Ta nepoužívá cookies a nevytváří profil
          návštěvníka: zaznamená zobrazené stránky, zdroj návštěvy, typ zařízení a prohlížeče, zemi a odeslání
          poptávky, a výsledky nám ukazuje jen souhrnně. Právním základem je váš souhlas (čl. 6 odst. 1 písm. a)
          GDPR). Bez souhlasu se měřicí skript vůbec nenačte.
        </P>
        <P>
          Souhlas můžete kdykoli odvolat nebo změnit odkazem „Nastavení měření“ v patičce webu. Odvolání nemá vliv
          na zpracování, které proběhlo před ním.
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
