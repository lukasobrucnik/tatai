export type SpecRow = { label: string; value: string };
export type ProcessStep = { title: string; body: string };
export type FaqItem = { title: string; body: string };
/** Jedna fotka z dílny. Rozměry drží lightbox — podle nich volí object-contain
 *  box, aby fotka na výšku nepřetekla obrazovku. */
export type HallPhoto = { src: string; w: number; h: number };
/** Snímek z haly s krátkým popiskem. Popisky říkají jen to, co je na fotce
 *  vidět (rám, izolace, deska, hotová stěna) — technický kontext k nim od
 *  majitele pořád nemáme, takže žádné materiály ani tloušťky. */
export type BuildStep = HallPhoto & { title: string; note: string };

export const PHONE = "+420 601 505 323";
export const EMAIL = "info@tatai.cz";
export const ADDRESS = "Křižíkova 965/1, 779 00 Olomouc";
/** The firm's own pin, not a search for the address string. A maps.app.goo.gl
 *  link is a universal link: on a phone with Google Maps installed the OS hands
 *  it to the app, everywhere else it opens the same place on the web. */
export const MAP_URL = "https://maps.app.goo.gl/osrbTmmYX5DJXM8i9";
export const ICO = "05452783";

export const NAV = [
  { id: "strechy", label: "Střechy" },
  { id: "domy", label: "Domy" },
  { id: "vyroba", label: "Výroba" },
  { id: "kontakt", label: "Kontakt" },
];

/** Jen to, co zákazníka zajímá před první schůzkou. Počty part, realizací
 *  a metrů ročně šly na přání majitele pryč (viz docs/archiv). */
export const HERO_META = [
  { label: "Prohlídka", value: "Zdarma" },
  { label: "Záruka na dílo", value: "10 let" },
  { label: "Působnost", value: "Celá ČR" },
];

export const ROOF_TYPES = [
  {
    i: "01",
    title: "Ploché střechy",
    body: "Hydroizolace, zateplení a odvodnění — na rodinné domy, bytové domy i haly.",
    items: ["Fólie PVC i asfaltové pásy", "Zateplení a spádování", "Atiky, vpusti, oplechování"],
    src: "/photos/strecha-plocha-pvc.webp",
    label: "Plochá střecha — hydroizolace PVC",
  },
  {
    i: "02",
    title: "Šikmé střechy",
    body: "Krov i krytinu děláme sami, takže si nikdy neodporují.",
    items: ["Krovy a tesařina", "Plech, tašky, šindel", "Rekonstrukce krovů"],
    src: "/photos/strecha-sikma-pokladka.webp",
    label: "Šikmá střecha — pokládka krytiny",
  },
];

export const HOUSE_TYPES = [
  {
    i: "01",
    title: "Sloupkové konstrukce",
    body: "Nejvariabilnější a cenově nejdostupnější dřevostavba.",
    src: "/photos/domy-sloupkova-konstrukce.webp",
    label: "Sloupková konstrukce — hrubá stavba",
  },
  {
    i: "02",
    title: "CLT panely",
    body: "Masivní dřevěné stěny. Hrubá stavba stojí za pár dní.",
    src: "/photos/clt-panel-hruba-stavba.webp",
    label: "CLT panel — hrubá stavba",
  },
  {
    i: "03",
    title: "Roubenky",
    body: "Ručně tesané spoje z masivního smrku.",
    src: "/photos/domy-roubenka-spoj.webp",
    label: "Roubenka — tesaný spoj",
  },
];

/** Proč hala — tři důvody, které má zákazník odnést. Tohle je jádro celého
 *  sdělení majitele, proto stojí hned pod nadpisem kapitoly Výroba. */
export const HALL_REASONS = [
  { title: "Do stavby neprší", body: "Stěny i stropy vznikají pod střechou. Dřevo a izolace zůstanou suché." },
  { title: "Montáž za pár dní", body: "Hotové dílce přivezeme a na pozemku je jen sestavíme." },
  { title: "Přesnost z dílny", body: "Dílce skládáme na rovném stole v hale, ne v blátě staveniště." },
];

/** Jak vzniká stěna — čtyři snímky z haly seřazené od rámu po hotový dílec. */
export const BUILD_STEPS: BuildStep[] = [
  { src: "/photos/vyroba/jih-09.webp", w: 2000, h: 1126, title: "Rám", note: "Dřevěná nosná konstrukce" },
  { src: "/photos/vyroba/jih-02.webp", w: 2000, h: 1126, title: "Izolace", note: "Vyplníme celý rám" },
  { src: "/photos/vyroba/sever-05.webp", w: 2000, h: 1126, title: "Opláštění", note: "Zavřeme deskami" },
  { src: "/photos/vyroba/sever-03.webp", w: 2000, h: 1126, title: "Hotový dílec", note: "I s okny, připravený k převozu" },
];

/** Vedoucí záběr haly — celá výrobní plocha s rozpracovanými dílci. */
export const HALL_LEAD: HallPhoto = { src: "/photos/vyroba/jih-10.webp", w: 2000, h: 1126 };

/** Fotky z obou hal pro lightbox (bez rozmazaného detailu fólie jih-11). Pořadí: nejdřív to, co je vidět na
 *  stránce, potom zbytek — šipkou se tak čtenář nejdřív vrací k známému. */
export const HALL_PHOTOS: HallPhoto[] = [
  HALL_LEAD,
  ...BUILD_STEPS.map(({ src, w, h }) => ({ src, w, h })),
  ...[
    "jih-01", "jih-03", "jih-04", "jih-05", "jih-06", "jih-08",
    "sever-01", "sever-02", "sever-07", "sever-08", "sever-10", "sever-11",
  ].map((n) => ({ src: `/photos/vyroba/${n}.webp`, w: 2000, h: 1126 })),
  ...["jih-07", "sever-04", "sever-06", "sever-09"].map((n) => ({ src: `/photos/vyroba/${n}.webp`, w: 1126, h: 2000 })),
];

export const PROCESS: ProcessStep[] = [
  { title: "Prohlídka", body: "Přijedeme, změříme a poradíme. Zdarma a nezávazně." },
  { title: "Nabídka", body: "Položkový rozpočet bez schovaných položek." },
  { title: "Výroba", body: "Dílce domu vyrobíme v hale, v suchu." },
  { title: "Montáž", body: "Na stavbě smontujeme a předáme se zárukou." },
];

export const FAQ: FaqItem[] = [
  { title: "Kolik to bude stát?", body: "Záleží na ploše, skladbě a materiálu. Po prohlídce, která je zdarma, dostanete položkový rozpočet." },
  { title: "Jak dlouho trvá montáž domu?", body: "Dílce vyrábíme v hale, takže na pozemku stojí hrubá stavba za pár dní — u CLT do pěti. Přesný harmonogram dostanete s nabídkou." },
  { title: "Zajistíte i projekt?", body: "Ano. Spolupracujeme s architektem klienta, nebo doporučíme svého." },
  { title: "Opravíte i střechu, kterou jste nestavěli?", body: "Ano. Opravy a servis děláme i na střechách od jiných firem." },
];

export const CONTACT_ROWS: SpecRow[] = [
  { label: "Telefon", value: "+420 601 505 323" },
  { label: "E-mail", value: "info@tatai.cz" },
  { label: "Sídlo", value: "Křižíkova 965/1, Olomouc" },
  { label: "Působnost", value: "Celá ČR" },
];

/** Jedna věta do patičky — sdílí ji homepage, 404 i právní stránky. */
export const FOOTER_CLAIM = [
  "Ploché i šikmé střechy a dřevěné domy, které vyrábíme v hale a u vás jen smontujeme. Po celé ČR od roku 2016.",
];

export const FOOTER_COLUMNS = [
  { title: "Střechy", links: [{ label: "Ploché střechy", href: "#strechy" }, { label: "Šikmé střechy", href: "#strechy" }] },
  { title: "Domy", links: [{ label: "Sloupkové konstrukce", href: "#domy" }, { label: "CLT panely", href: "#domy" }, { label: "Roubenky", href: "#domy" }] },
  { title: "Firma", links: [{ label: "Výroba v hale", href: "#vyroba" }, { label: "Kontakt", href: "#kontakt" }] },
];
