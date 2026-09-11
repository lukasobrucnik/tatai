export type SpecRow = { label: string; value: string };
export type StatItem = { label: string; value: string; unit?: string; note?: string };
export type ProcessStep = { title: string; body: string; meta?: string; src?: string; alt?: string };
export type MaterialItem = { name: string; note: string; src?: string };
export type FaqItem = { title: string; body: string };
export type DetailPoint = { title: string; note: string; src?: string };
/** Jedna fotka z dílny. Rozměry drží lightbox — podle nich volí object-contain
 *  box, aby fotka na výšku nepřetekla obrazovku. */
export type HallPhoto = { src: string; w: number; h: number };
/** Hala výroby. Vědomě bez popisků: k fotkám jsme od majitele žádný technický
 *  kontext nedostali a web stojí na tom, že co je napsané, sedí. */
export type Hall = { id: string; name: string; photos: HallPhoto[] };

export const PHONE = "+420 601 505 323";
export const EMAIL = "info@tatai.cz";
export const ADDRESS = "Křižíkova 965/1, 779 00 Olomouc";
export const ICO = "05452783";

export const NAV = [
  { id: "strechy", label: "Střechy" },
  { id: "domy", label: "Domy" },
  { id: "o-nas", label: "O nás" },
  { id: "kontakt", label: "Kontakt" },
];

export const HERO_META = [
  { label: "Na trhu", value: "10 let" },
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

// Photos are stand-ins picked from the existing library so the step-by-step
// section has something real to show — they are not shot for these steps and
// are expected to be replaced once the owner supplies proper ones.
export const PROCESS: ProcessStep[] = [
  {
    title: "Prohlídka",
    body: "Přijedeme, změříme, nafotíme stav. Bez poplatku a bez závazku.",
    meta: "do 5 dnů",
    src: "/photos/roof-krov-pohled.webp",
    alt: "Pohled do krovu při obhlídce stavby",
  },
  {
    title: "Návrh skladby",
    body: "Navrhneme skladbu, detaily a materiál. Vysvětlíme, proč právě takhle.",
    meta: "1–2 týdny",
    src: "/photos/roof-spadovy-klin.webp",
    alt: "Spádové klíny připravené ve skladbě ploché střechy",
  },
  {
    title: "Cenová nabídka",
    body: "Položkový rozpočet. Žádné schované položky, žádné „upřesníme na stavbě“.",
    src: "/photos/material-pvc-folie.webp",
    alt: "Role hydroizolační PVC fólie",
  },
  {
    title: "Realizace",
    body: "Vlastní parta, jeden odpovědný stavbyvedoucí, jeden telefon.",
    src: "/photos/pillar-svarovani-folie.webp",
    alt: "Svařování hydroizolační fólie na ploché střeše",
  },
  {
    title: "Předání",
    body: "Předávací protokol, fotodokumentace skrytých vrstev, záruka.",
    src: "/photos/feature-hala-olomouc.webp",
    alt: "Dokončená plochá střecha výrobní haly",
  },
];

export const STATS: StatItem[] = [
  { label: "Na trhu", value: "10", unit: "let", note: "Od roku 2016" },
  { label: "Realizací", value: "420", unit: "+" },
  { label: "Plochých střech ročně", value: "11 000", unit: "m²" },
  { label: "Vlastních part", value: "4", note: "Bez subdodávek na klíčové práce" },
];

export const HOUSE_MATERIALS: MaterialItem[] = [
  { name: "CLT panel", note: "Křížem lepené lamely, smrk C24. Nosná stěna i strop v jednom prvku.", src: "/photos/material-clt-panel.webp" },
  { name: "Masivní smrk", note: "Ručně tesané spoje pro roubenky. Bez ocelových spojek, kde nemusí být.", src: "/photos/material-masivni-smrk.webp" },
];

export const FAQ: FaqItem[] = [
  { title: "Jak dlouho trvá realizace ploché střechy?", body: "U běžné rodinné novostavby 5–10 dní podle plochy a skladby. U rekonstrukce záleží na stavu podkladu — to zjistíme při prohlídce, ne po demontáži." },
  { title: "Zajišťujete i projektovou dokumentaci?", body: "Ano, včetně skladeb a technických detailů. U dřevostaveb spolupracujeme s architektem klienta nebo doporučíme svého." },
  { title: "Proč CLT a ne klasická sloupková konstrukce?", body: "CLT dává tuhost, akustiku a rychlost montáže — hrubá stavba stojí za dny. Sloupková konstrukce je levnější a variabilnější. Rozhodujeme podle rozpočtu a rozponů, ne podle módy." },
  { title: "Děláte i drobné opravy střech?", body: "Ano. Lokální opravy a servis děláme i tam, kde jsme původní střechu nestavěli." },
];

export const CONTACT_ROWS: SpecRow[] = [
  { label: "Telefon", value: "+420 601 505 323" },
  { label: "E-mail", value: "info@tatai.cz" },
  { label: "Sídlo", value: "Křižíkova 965/1, Olomouc" },
  { label: "IČO", value: "05452783" },
  { label: "Působnost", value: "Celá ČR" },
];

export const FOOTER_COLUMNS = [
  { title: "Střechy", links: [{ label: "Ploché střechy", href: "#strechy" }, { label: "Šikmé střechy", href: "#strechy" }] },
  { title: "Domy", links: [{ label: "Sloupkové konstrukce", href: "#domy" }, { label: "CLT panely", href: "#domy" }, { label: "Roubenky", href: "#domy" }] },
  { title: "Firma", links: [{ label: "O nás", href: "#o-nas" }, { label: "Kontakt", href: "#kontakt" }] },
];

/** Pořadí je záměrné, ne abecední: [0] je vedoucí záběr haly, [1..3] filmstrip,
 *  zbytek padá do kontaktního listu za tlačítkem. */
export const HALLS: Hall[] = [
  {
    id: "sever",
    name: "Hala sever",
    photos: [
      { src: "/photos/vyroba/sever-01.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-02.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-03.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-04.webp", w: 1126, h: 2000 },
      { src: "/photos/vyroba/sever-05.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-06.webp", w: 1126, h: 2000 },
      { src: "/photos/vyroba/sever-07.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-08.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-09.webp", w: 1126, h: 2000 },
      { src: "/photos/vyroba/sever-10.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/sever-11.webp", w: 2000, h: 1126 },
    ],
  },
  {
    id: "jih",
    name: "Hala jih",
    photos: [
      { src: "/photos/vyroba/jih-01.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-02.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-03.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-04.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-05.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-06.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-07.webp", w: 1126, h: 2000 },
      { src: "/photos/vyroba/jih-08.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-09.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-10.webp", w: 2000, h: 1126 },
      { src: "/photos/vyroba/jih-11.webp", w: 1126, h: 2000 },
    ],
  },
];
