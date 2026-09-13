import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BusinessSchema } from "@/components/structured-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  // 600 added so the active-nav-item weight bump (header.tsx) is a real font
  // file, not a browser-synthesized "faux bold" — synthetic bolding on a
  // mono face at this size renders visibly blurry.
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Everything relative below (canonicals, the OG image) is resolved against
  // this. Without it Next emits relative OG URLs, which most scrapers refuse
  // to follow — the card then falls back to bare text.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    // Sub-pages pass their own short title; this keeps the firm's name on the
    // end of it without every page repeating the construction by hand.
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "TATAI s.r.o." }],
  creator: "TATAI s.r.o.",
  publisher: "TATAI s.r.o.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — ${SITE_TAGLINE}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the host's environment and the
  // Search Console tag appears — no deploy of a code change needed for it.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// The site is light-only by design (no dark variant). Without this, Samsung
// Internet / Chrome on Android auto-invert ("force dark") the page for
// devices in system dark mode, mangling the real palette. Declaring the
// scheme explicitly opts the page out of that heuristic re-coloring.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f2ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* The old hash-scroll-instant script lived here to stop
            `html { scroll-behavior: smooth }` from turning a deep link like
            /#o-nas into a multi-second animated scroll on first paint.
            That CSS rule is gone (Lenis owns smoothing now), so the native
            fragment landing is instant again on its own. */}
        <SmoothScroll>{children}</SmoothScroll>
        {/* Outside SmoothScroll: these are fixed to the viewport and have no
            business inside the scrolled content. */}
        <CookieConsent />
        <CustomCursor />
        {/* Site-wide: the firm is the same firm on every page. The questions
            are marked up only where they are answered — see page.tsx. */}
        <BusinessSchema />
      </body>
    </html>
  );
}
