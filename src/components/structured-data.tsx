import { ADDRESS, EMAIL, FAQ, ICO, MAP_URL, PHONE } from "@/lib/data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Structured data: the same facts the page already states, in the form search
 * engines read without having to infer anything.
 *
 * Every value here is sourced from lib/data, which is what the page renders —
 * marking up a claim the visitor cannot also see on the page is how a rich
 * result turns into a manual penalty, so the two can only ever drift apart by
 * someone deliberately breaking that.
 *
 * Two graphs, deliberately separate: the business (site-wide, in the layout)
 * and the questions (homepage only, where the answers actually live).
 */

const [street, cityWithZip] = ADDRESS.split(", ");
const postalCode = cityWithZip?.slice(0, 6).trim() ?? "";
const city = cityWithZip?.slice(6).trim() ?? "";

export function BusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "GeneralContractor"],
    "@id": `${SITE_URL}/#business`,
    name: "TATAI s.r.o.",
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: PHONE.replace(/\s/g, ""),
    email: EMAIL,
    foundingDate: "2016",
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/logo/tatai-mark.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      postalCode,
      addressLocality: city,
      addressCountry: "CZ",
    },
    areaServed: { "@type": "Country", name: "Česká republika" },
    hasMap: MAP_URL,
    identifier: { "@type": "PropertyValue", name: "IČO", value: ICO },
    knowsAbout: [
      "Ploché střechy",
      "Šikmé střechy",
      "Hydroizolace PVC-P",
      "Krovy a tesařské konstrukce",
      "Sloupkové konstrukce",
      "CLT panely",
      "Roubenky",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Střechy a dřevěné konstrukce",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ploché střechy" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Šikmé střechy a krovy" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sloupkové dřevostavby" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stavby z CLT panelů" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roubenky" } },
      ],
    },
  };

  return <Script id="schema-business" data={data} />;
}

export function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.body },
    })),
  };

  return <Script id="schema-faq" data={data} />;
}

/** JSON-LD only ever contains our own serialised data, never user input. */
function Script({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // `<` is escaped so a value can never close the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
