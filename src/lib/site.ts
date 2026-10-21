/**
 * Everything that has to agree with the live domain lives here, so switching
 * hosts (or moving between www and apex) is one edit rather than a hunt.
 *
 * `SITE_URL` must be the canonical origin — the one the site actually serves
 * on after redirects. Get it wrong and every canonical tag, the sitemap and
 * the OG image URL all point somewhere that 301s, which is exactly the kind
 * of thing search engines take their time forgiving.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tatai.cz";

export const SITE_NAME = "TATAI";

/** Wording reused by the metadata, the OG card and the structured data, so
 *  the three can never drift apart. */
export const SITE_TAGLINE = "Střechy a dřevěné domy";

export const SITE_DESCRIPTION =
  "Ploché a šikmé střechy a dřevěné domy — sloupkové, CLT i roubenky. Domy vyrábíme v hale a na místě je jen smontujeme, takže do nich neprší. Olomouc a celá ČR.";

/** Routes that exist as real pages — the sitemap's source of truth. */
export const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/ochrana-soukromi", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/obchodni-podminky", priority: 0.3, changeFrequency: "yearly" as const },
];
