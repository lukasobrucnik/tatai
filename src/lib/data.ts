/* Texty mají za jednopísmennými předložkami a spojkami (v, u, s, z, k, o, i, a)
   pevnou mezeru (U+00A0), ne obyčejnou — česká typografie je nenechává na konci
   řádku a na telefonu by jinak visely („Domy stavíme v / hale“). Při úpravě
   textů je potřeba ji zachovat. */
export type SpecRow = { label: string; value: string };
export type ProcessStep = { title: string; body: string };
/** Téma častých otázek: krátká odpověď (vidět i zavřená), části s delším
 *  textem a volitelně čísla — buď jako řádek faktů, nebo jako časová osa. */
export type FaqItem = {
  title: string;
  body: string;
  parts?: { title: string; body: string }[];
  facts?: SpecRow[];
  timeline?: SpecRow[];
};
/** Jedna fotka z dílny. Rozměry drží lightbox — podle nich volí object-contain
 *  box, aby fotka na výšku nepřetekla obrazovku. */
export type HallPhoto = { src: string; w: number; h: number };
/** Snímek z haly s krátkým popiskem. Popisky říkají jen to, co je na fotce
 *  vidět (rám, izolace, deska, hotová stěna) — technický kontext k nim od
 *  majitele pořád nemáme, takže žádné materiály ani tloušťky. */
export type BuildStep = HallPhoto & { title: string; note: string };

export const PHONE = "+420 601 505 323";
export const EMAIL = "info@tatai.cz";
/** Sídlo od listopadu 2026 — stejná adresa jako u firmy TARUS. */
export const ADDRESS = "Pavelkova 1210/10b, 779 00 Olomouc";
/** Hledání adresy, ne uložený špendlík: pro novou adresu firma vlastní pin
 *  v Google Maps zatím nemá. Odkaz typu api=1 je univerzální — na telefonu
 *  s Mapami ho systém otevře v aplikaci, jinde na webu. */
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Pavelkova%201210%2F10b%2C%20779%2000%20Olomouc";
/** Oficiální název podle obchodního rejstříku (ARES, ověřeno 11/2026). Na
 *  stránce se firma jmenuje TATAI; plný název patří do právních textů,
 *  patičky a strukturovaných dat. */
export const COMPANY_NAME = "TATAI specializované stavební činnosti s.r.o.";
export const ICO = "05452783";
/** Poloha sídla (OpenStreetMap, uzel adresy 1210/10b). Na ní je vystředěná
 *  mapa public/photos/mapa-sidlo.webp a čte ji i strukturovaná data. */
export const OFFICE_GEO = { lat: 49.5902343, lng: 17.2996594 };
/** Kam chodí poptávky z formuláře (viz app/api/poptavka). Na serveru je
 *  přebije proměnná CONTACT_TO, pokud je nastavená. */
export const INQUIRY_RECIPIENTS = ["info@tatai.cz", "stavba@tatai.cz"];

/** Působnost — majitel: „v rámci Moravy“. Jedno místo, ať se hero, kontakt
 *  a patička nerozejdou. */
export const AREA = "Morava";

export const NAV = [
  { id: "strechy", label: "Střechy" },
  { id: "domy", label: "Dřevostavby" },
  { id: "vyroba", label: "Výroba" },
  { id: "kontakt", label: "Kontakt" },
];

/** Hlavní deska. Jedna fotka pro oba obory — krov na dřevostavbě je zároveň
 *  střecha i dům, takže hero už nemusí být rozpůlené. */
export const HERO = {
  title: "Střechy a dřevostavby na Moravě.",
  lead: "Domy vyrábíme v naší hale, takže do konstrukce nezaprší. Na pozemku stojí za týden a do tří měsíců se stěhujete.",
  src: "/photos/hero-krov.webp",
  alt: "Krov dřevostavby proti zamračené obloze, na vazbě stojí tesař",
  links: [
    { index: "01", label: "Střechy", caption: "Ploché, šikmé, zelené", href: "#strechy" },
    { index: "02", label: "Dřevostavby", caption: "Vyrobené v hale", href: "#domy" },
  ],
};

/** Jen to, co zákazníka zajímá před první schůzkou. Počty part, realizací
 *  a metrů ročně šly na přání majitele pryč (viz docs/archiv). */
export const HERO_META = [
  { label: "Záruka", value: "10 let" },
  // „Na klíč“, ne „Dům k nastěhování“: delší štítek se na telefonu láme do
  // dvou řádků a rozhodí zarovnání tří hodnot vedle sebe.
  { label: "Na klíč", value: "3 měsíce" },
  { label: "Působnost", value: AREA },
];

export const ROOFS_HERO = {
  title: "Ploché, šikmé i zelené střechy.",
  lead: "Nejvíc nás baví krokevní izolace a složité střechy. Kvůli nim nás jako subdodavatele volají i velké stavební firmy.",
};

/** Tři kategorie jako u domů (poznámky majitele, listopad 2026). Zelená
 *  střecha zatím nemá vlastní fotku — Photo bez src ukáže popisek na rastru,
 *  dokud ji majitel nedodá. */
export const ROOF_TYPES: { i: string; title: string; body: string; items: string[]; src?: string; label: string }[] = [
  {
    i: "01",
    title: "Ploché střechy",
    body: "Hydroizolace, zateplení a odvodnění — na rodinné domy, bytové domy i haly.",
    items: ["Fólie PVC i asfaltové pásy", "Zateplení a spádování", "Atiky, vpusti, oplechování"],
    src: "/photos/strecha-plocha-pvc.webp",
    label: "Plochá střecha — hydroizolace PVC",
  },
  {
    i: "02",
    title: "Šikmé střechy",
    body: "Krov, izolaci i krytinu děláme sami, takže si nikdy neodporují.",
    items: ["Krovy a tesařina", "Krokevní izolace", "Plech, tašky, šindel"],
    src: "/photos/strecha-sikma-pokladka.webp",
    label: "Šikmá střecha — pokládka krytiny",
  },
  {
    i: "03",
    title: "Zelené střechy",
    body: "Vegetační střecha na plochý i mírně šikmý střešní plášť.",
    items: ["Hydroizolace pod zeleň", "Drenáž a odvodnění", "Novostavby i stávající střechy"],
    src: "/photos/strecha-zelena.webp",
    label: "Zelená střecha — extenzivní vegetace",
  },
];

/** Dvě věci, které se zákazník u střech ptá jako první. */
export const ROOF_FACTS = [
  { label: "Záruka na dílo", value: "10 let" },
  { label: "Nová izolace", value: "Ve stejné tloušťce 2× lepší" },
  { label: "Opravy a servis", value: "I na střechách od jiných firem" },
];

export const HOUSES_HERO = {
  title: "Dřevostavby, které nezmoknou.",
  lead: "Sloupkové konstrukce, CLT panely i roubenky. Vyrobíme je v hale, u vás je jen smontujeme.",
};

export const HOUSE_TYPES = [
  {
    i: "01",
    title: "Sloupkové konstrukce",
    body: "Nejvariabilnější a cenově nejdostupnější dřevostavba.",
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
    body: "Ručně tesané spoje z masivního smrku.",
    src: "/photos/domy-roubenka-spoj.webp",
    label: "Roubenka — tesaný spoj",
  },
];

/** Tři čísla, na která se ptá každý, kdo zvažuje dřevostavbu místo zděného
 *  domu. Všechna od majitele (listopad 2026). */
export const HOUSE_FACTS = [
  { label: "Cena", value: "Jako zděný dům" },
  { label: "Montáž na pozemku", value: "Týden i se střechou" },
  { label: "S fasádou", value: "Do tří týdnů" },
  { label: "K nastěhování", value: "3 měsíce od výkopu" },
];

/** Proč hala — tři důvody, které má zákazník odnést. Tohle je jádro celého
 *  sdělení majitele, proto stojí hned pod nadpisem kapitoly Výroba. Pořadí
 *  i obsah podle majitele: neprší, nižší náklady, méně lidí. */
export const HALL_REASONS = [
  { title: "Do stavby neprší", body: "Stěny i stropy vznikají pod střechou haly. Dřevo a izolace zůstanou suché." },
  { title: "Nižší náklady", body: "Výroba v hale stojí méně než stavění na pozemku. Úspora se promítne do ceny vašeho domu." },
  { title: "Méně lidí, nižší cena", body: "V hale stačí mnohem menší parta než na stavbě. Proto můžeme nabídnout nižší konečnou cenu." },
];

/** Jak vzniká stěna — čtyři snímky z haly seřazené od rámu po hotový dílec. */
export const BUILD_STEPS: BuildStep[] = [
  { src: "/photos/vyroba/jih-09.webp", w: 2000, h: 1126, title: "Rám", note: "Dřevěná nosná konstrukce" },
  { src: "/photos/vyroba/jih-02.webp", w: 2000, h: 1126, title: "Izolace", note: "Vyplníme celý rám" },
  { src: "/photos/vyroba/sever-05.webp", w: 2000, h: 1126, title: "Opláštění", note: "Zavřeme deskami" },
  { src: "/photos/vyroba/sever-03.webp", w: 2000, h: 1126, title: "Hotový dílec", note: "I s okny, připravený k převozu" },
];

/** Vedoucí záběr haly — celá výrobní plocha s rozpracovanými dílci. */
export const HALL_LEAD: HallPhoto = { src: "/photos/vyroba/jih-10.webp", w: 2000, h: 1126 };

/** Fotky z obou hal pro lightbox (bez rozmazaného detailu fólie jih-11). Pořadí: nejdřív to, co je vidět na
 *  stránce, potom zbytek — šipkou se tak čtenář nejdřív vrací k známému. */
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
  { title: "Prohlídka", body: "Přijedeme, změříme a poradíme. Zdarma a nezávazně." },
  { title: "Nabídka", body: "Položkový rozpočet bez schovaných položek." },
  { title: "Výroba", body: "Dílce domu vyrobíme v hale, v suchu." },
  { title: "Montáž", body: "Za týden stojí dům i se střechou. Do tří měsíců se stěhujete." },
];

/** Časté otázky — záměrně málo témat a delší odpovědi rozdělené do částí.
 *  Kdo to opravdu řeší, rozbalí si celé téma; ostatním stačí úvodní věta,
 *  která je vidět i zavřená. Obsah od majitele (listopad 2026). `body` je
 *  zároveň krátká odpověď pro strukturovaná data (FAQPage). */
export const FAQ: FaqItem[] = [
  {
    title: "Střechy — co děláme a jak",
    body: "Ploché, šikmé i zelené střechy. Specializujeme se na krokevní izolace a složité střechy, ale rádi uděláme i jednoduchou střechu na novostavbě.",
    parts: [
      {
        title: "Složité střechy",
        body: "Krokevní izolace a členité střechy jsou naše specializace. Proto nás jako subdodavatele volají i větší stavební firmy, které si na ně samy netroufnou.",
      },
      {
        title: "Jednoduchá novostavba",
        body: "Jednoduchá střecha je pro nás hračka. Na novostavbě ji uděláme rádi, rychle a za super cenu.",
      },
      {
        title: "Ze staré nová",
        body: "Předěláme i střechu, která ještě drží, jen je morálně zastaralá. Nová izolace ve stejné tloušťce izoluje dvakrát lépe. Modernizujete jednou a dům máte hezký napořád.",
      },
    ],
    facts: ROOF_FACTS,
  },
  {
    title: "Dřevostavby — cena a jak dlouho to trvá",
    body: "Dřevostavba od nás vyjde zhruba stejně jako zděný dům. Na pozemku stojí za týden i se střechou a do tří měsíců od výkopu se stěhujete.",
    parts: [
      {
        title: "Cena",
        body: "Počítejte zhruba s cenou zděného domu. Dílce vyrábíme v hale, kde stačí menší parta a práce stojí méně než na stavbě. Úsporu promítneme do ceny. Přesné číslo dostanete v položkovém rozpočtu po prohlídce, která je zdarma.",
      },
      {
        title: "Proč tak rychle",
        body: "Stěny i stropy vznikají pod střechou haly, takže do konstrukce nezaprší a nečeká se na počasí. Na pozemek přivezeme hotové dílce i s okny a jen je smontujeme.",
      },
    ],
    timeline: [
      { label: "Výroba", value: "V hale, v suchu" },
      { label: "Montáž", value: "Týden i se střechou" },
      { label: "Fasáda", value: "Do tří týdnů" },
      { label: "Nastěhování", value: "3 měsíce od výkopu" },
    ],
  },
  {
    title: "Projekt a stavební povolení",
    body: "Projekt ani stavební povolení nevyřizujeme. Když ale přijdete s povolením na zděný dům, předěláme ho na dřevostavbu.",
    parts: [
      {
        title: "Co nezajišťujeme",
        body: "Projekt ani stavební povolení nevyřizujeme, omlouváme se. Je potřeba si je zajistit u projektanta.",
      },
      {
        title: "Zděný projekt na dřevostavbu",
        body: "Máte projekt a povolení na zděný dům? Nemusíte začínat znovu — projekt předěláme na dřevostavbu. Rádi s tím poradíme.",
      },
    ],
  },
  {
    title: "Spolupráce a kde působíme",
    body: "Stavíme po celé Moravě pro soukromé zákazníky i jako subdodavatel pro stavební firmy. Sídlo máme v Olomouci.",
    parts: [
      {
        title: "Pro vás",
        body: "Přijedeme, změříme a poradíme — zdarma a nezávazně. Potom dostanete položkový rozpočet bez schovaných položek.",
      },
      {
        title: "Pro stavební firmy",
        body: "Krokevní izolace a složité střechy děláme i jako subdodávku pro větší firmy, které si na ně samy netroufnou.",
      },
      {
        title: "Kde působíme",
        body: "Po celé Moravě. Sídlo máme v Olomouci na Pavelkově ulici a na prohlídku přijedeme za vámi.",
      },
    ],
  },
];

export const CONTACT_ROWS: SpecRow[] = [
  { label: "Telefon", value: "+420 601 505 323" },
  { label: "E-mail", value: "info@tatai.cz" },
  { label: "Sídlo", value: "Pavelkova 1210/10b, Olomouc" },
  { label: "Působnost", value: AREA },
];

/** Jedna věta do patičky — sdílí ji homepage, 404 i právní stránky. */
export const FOOTER_CLAIM = [
  "Ploché, šikmé i zelené střechy a dřevostavby, které vyrábíme v hale a u vás jen smontujeme. Po celé Moravě od roku 2016.",
];

export const FOOTER_COLUMNS = [
  {
    title: "Střechy",
    links: [
      { label: "Ploché střechy", href: "#strechy" },
      { label: "Šikmé střechy", href: "#strechy" },
      { label: "Zelené střechy", href: "#strechy" },
    ],
  },
  {
    title: "Dřevostavby",
    links: [
      { label: "Sloupkové konstrukce", href: "#domy" },
      { label: "CLT panely", href: "#domy" },
      { label: "Roubenky", href: "#domy" },
    ],
  },
  { title: "Firma", links: [{ label: "Výroba v hale", href: "#vyroba" }, { label: "Kontakt", href: "#kontakt" }] },
];
