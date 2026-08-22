export type AssemblyLayer = { name: string; material: string; thickness?: number };
export type SpecRow = { label: string; value: string };
export type StatItem = { label: string; value: string; unit?: string; note?: string };
export type ProcessStep = { title: string; body: string; meta?: string };
export type MaterialItem = { name: string; note: string; src?: string };
export type FaqItem = { title: string; body: string };
export type TeamMember = { label: string; ratio: "portrait"; caption: string };
export type DetailPoint = { title: string; note: string; src?: string };
export type Project = {
  slug: string;
  category: "Střecha" | "Dům";
  title: string;
  location: string;
  year: string;
  tags: string[];
  label: string;
  pillar: "strechy" | "domy";
  ratio: "project" | "portrait";
};

export const PHONE = "+420 777 123 456";
export const EMAIL = "info@tatai.cz";
export const ADDRESS = "Valašské Meziříčí, Morava";
export const ICO = "12345678";

export const NAV = [
  { id: "strechy", label: "Střechy" },
  { id: "domy", label: "Domy" },
  { id: "realizace", label: "Realizace" },
  { id: "o-nas", label: "O nás" },
  { id: "kontakt", label: "Kontakt" },
];

export const FLAT_ROOF: AssemblyLayer[] = [
  { name: "Hydroizolace", material: "PVC-P fólie", thickness: 1.5 },
  { name: "Separační vrstva", material: "Geotextilie 300 g/m²" },
  { name: "Tepelná izolace", material: "EPS 150 ve spádu", thickness: 240 },
  { name: "Parozábrana", material: "SBS modifikovaný asfalt", thickness: 4 },
  { name: "Penetrace", material: "Asfaltová emulze" },
  { name: "Nosná konstrukce", material: "Trapézový plech", thickness: 135 },
];

export const PITCHED_ROOF: AssemblyLayer[] = [
  { name: "Krytina", material: "Plech, taška nebo šindel" },
  { name: "Kontralatě", material: "Impregnované řezivo, větraná mezera", thickness: 40 },
  { name: "Pojistná fólie", material: "Difuzně otevřená" },
  { name: "Krokve", material: "Smrk, izolace mezi krokvemi", thickness: 200 },
  { name: "Parozábrana", material: "Fólie s přelepenými spoji" },
  { name: "Podhled", material: "Sádrokarton nebo palubky", thickness: 12.5 },
];

export const CLT_WALL: AssemblyLayer[] = [
  { name: "Fasádní obklad", material: "Sibiřský modřín, provětrávaný", thickness: 21 },
  { name: "Nosný rošt", material: "Lať 40/60", thickness: 60 },
  { name: "Difuzní fólie", material: "Sd ≤ 0,02 m" },
  { name: "Tepelná izolace", material: "Dřevovláknitá deska", thickness: 200 },
  { name: "Nosná konstrukce", material: "CLT panel, 5 vrstev", thickness: 100 },
  { name: "Povrch interiéru", material: "CLT viditelný, brus" },
];

export const PROJECTS: Project[] = [
  { slug: "hala-olomouc", category: "Střecha", title: "Výrobní hala Olomouc", location: "Olomouc", year: "2025", tags: ["Plochá střecha", "PVC-P"], label: "Plochá střecha — 4 200 m²", pillar: "strechy", ratio: "project" },
  { slug: "roubenka-becva", category: "Dům", title: "Roubenka Prostřední Bečva", location: "Prostřední Bečva", year: "2025", tags: ["Roubenka", "Šindel"], label: "Roubenka v krajině", pillar: "domy", ratio: "portrait" },
  { slug: "clt-frenstat", category: "Dům", title: "CLT dům Frenštát", location: "Frenštát pod Radhoštěm", year: "2024", tags: ["CLT panely", "Plochá střecha"], label: "CLT konstrukce, montáž", pillar: "domy", ratio: "project" },
  { slug: "sikma-valmez", category: "Střecha", title: "Rekonstrukce krovu", location: "Valašské Meziříčí", year: "2024", tags: ["Šikmá střecha", "Krov"], label: "Krov — vaznicová soustava", pillar: "strechy", ratio: "project" },
  { slug: "strecha-zlin", category: "Střecha", title: "Bytový dům Zlín", location: "Zlín", year: "2024", tags: ["Plochá střecha", "Zateplení"], label: "Atika a vpusť", pillar: "strechy", ratio: "portrait" },
  { slug: "sloupkovy-hostalkova", category: "Dům", title: "Sloupkový dům Hošťálková", location: "Hošťálková", year: "2023", tags: ["Sloupková konstrukce"], label: "Sloupková konstrukce, hrubá stavba", pillar: "domy", ratio: "project" },
];

export const HERO_META = [
  { label: "Na trhu", value: "18 let" },
  { label: "Realizací", value: "420+" },
  { label: "Vlastních part", value: "4" },
];

export const ROOF_META = [
  { label: "Plochých střech ročně", value: "11 000 m²" },
  { label: "Záruka na dílo", value: "10 let" },
  { label: "Ploché i šikmé", value: "Obojí vlastní parta" },
];

export const HOUSE_META = [
  { label: "Technologie", value: "3" },
  { label: "Hrubá stavba CLT", value: "do 5 dnů" },
  { label: "Tesařina", value: "Vlastní parta" },
];

export const ROOF_POINTS: DetailPoint[] = [
  { title: "Atika", note: "Poplastovaný plech, svařený spoj", src: "/photos/atika.webp" },
  { title: "Spádový klín", note: "EPS 150, spád 2 %", src: "/photos/roof-spadovy-klin.webp" },
  { title: "Vpusť", note: "Dvoustupňová, s ochranným košem", src: "/photos/roof-vpust.webp" },
];

export const CLT_POINTS: DetailPoint[] = [
  { title: "CLT panel 100 mm", note: "5 vrstev, smrk C24", src: "/photos/clt-panel-100mm.webp" },
  { title: "Úhelník", note: "Kotvení do panelu, vruty 8×80", src: "/photos/clt-uhelnik.webp" },
  { title: "Těsnicí páska", note: "Vzduchotěsnost linie", src: "/photos/clt-tesnici-paska.webp" },
];

export const FLAT_SPEC: SpecRow[] = [
  { label: "Krytina", value: "PVC-P / SBS asfalt" },
  { label: "Izolace", value: "EPS 150, PIR" },
  { label: "Spád", value: "min. 2 %" },
  { label: "Záruka", value: "10 let na dílo" },
];

export const PITCHED_SPEC: SpecRow[] = [
  { label: "Krytina", value: "Plech / taška / šindel" },
  { label: "Konstrukce", value: "Vaznicová, hambálková" },
  { label: "Tesařina", value: "Vlastní parta" },
];

export const PROCESS: ProcessStep[] = [
  { title: "Prohlídka", body: "Přijedeme, změříme, nafotíme stav. Bez poplatku a bez závazku.", meta: "do 5 dnů" },
  { title: "Návrh skladby", body: "Navrhneme skladbu, detaily a materiál. Vysvětlíme, proč právě takhle.", meta: "1–2 týdny" },
  { title: "Cenová nabídka", body: "Položkový rozpočet. Žádné schované položky, žádné „upřesníme na stavbě“." },
  { title: "Realizace", body: "Vlastní parta, jeden odpovědný stavbyvedoucí, jeden telefon." },
  { title: "Předání", body: "Předávací protokol, fotodokumentace skrytých vrstev, záruka." },
];

export const STATS: StatItem[] = [
  { label: "Na trhu", value: "18", unit: "let", note: "Od roku 2008" },
  { label: "Realizací", value: "420", unit: "+" },
  { label: "Plochých střech ročně", value: "11 000", unit: "m²" },
  { label: "Vlastních part", value: "4", note: "Bez subdodávek na klíčové práce" },
];

export const HOUSE_MATERIALS: MaterialItem[] = [
  { name: "CLT panel", note: "Křížem lepené lamely, smrk C24. Nosná stěna i strop v jednom prvku.", src: "/photos/material-clt-panel.webp" },
  { name: "Masivní smrk", note: "Ručně tesané spoje pro roubenky. Bez ocelových spojek, kde nemusí být.", src: "/photos/material-masivni-smrk.webp" },
];

export const ROOF_MATERIALS: MaterialItem[] = [
  { name: "PVC-P fólie", note: "Ploché střechy, 1,5–2,0 mm. Horkovzdušně svařované spoje.", src: "/photos/material-pvc-folie.webp" },
  { name: "Falcovaný plech", note: "Šikmé střechy a detaily. Titanzinek nebo poplastovaný plech.", src: "/photos/material-falcovany-plech.webp" },
];

export const FAQ: FaqItem[] = [
  { title: "Jak dlouho trvá realizace ploché střechy?", body: "U běžné rodinné novostavby 5–10 dní podle plochy a skladby. U rekonstrukce záleží na stavu podkladu — to zjistíme při prohlídce, ne po demontáži." },
  { title: "Zajišťujete i projektovou dokumentaci?", body: "Ano, včetně skladeb a technických detailů. U dřevostaveb spolupracujeme s architektem klienta nebo doporučíme svého." },
  { title: "Proč CLT a ne klasická sloupková konstrukce?", body: "CLT dává tuhost, akustiku a rychlost montáže — hrubá stavba stojí za dny. Sloupková konstrukce je levnější a variabilnější. Rozhodujeme podle rozpočtu a rozponů, ne podle módy." },
  { title: "Děláte i drobné opravy střech?", body: "Ano. Lokální opravy a servis děláme i tam, kde jsme původní střechu nestavěli." },
];

export const TEAM: TeamMember[] = [
  { label: "Tesař", ratio: "portrait", caption: "Tesařská parta" },
  { label: "Izolatér", ratio: "portrait", caption: "Ploché střechy" },
  { label: "Stavbyvedoucí", ratio: "portrait", caption: "Vedení zakázek" },
  { label: "Technik", ratio: "portrait", caption: "Skladby a detaily" },
];

export const CONTACT_ROWS: SpecRow[] = [
  { label: "Telefon", value: "+420 777 123 456" },
  { label: "E-mail", value: "info@tatai.cz" },
  { label: "Sídlo", value: "Valašské Meziříčí" },
  { label: "IČO", value: "12345678" },
  { label: "Působnost", value: "Morava, do 120 km" },
];

export const FOOTER_COLUMNS = [
  { title: "Střechy", links: [{ label: "Ploché střechy", href: "#strechy" }, { label: "Šikmé střechy", href: "#strechy" }] },
  { title: "Domy", links: [{ label: "Sloupkové konstrukce", href: "#domy" }, { label: "CLT panely", href: "#domy" }, { label: "Roubenky", href: "#domy" }] },
  { title: "Firma", links: [{ label: "O nás", href: "#o-nas" }, { label: "Realizace", href: "#realizace" }, { label: "Kontakt", href: "#kontakt" }] },
];
