import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
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
  title: "TATAI — Střechy a dřevěné konstrukce",
  description:
    "Ploché a šikmé střechy, sloupkové konstrukce, CLT panely a roubenky. Od skladby a detailu po předání. Olomouc a celá ČR.",
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
            /#realizace into a multi-second animated scroll on first paint.
            That CSS rule is gone (Lenis owns smoothing now), so the native
            fragment landing is instant again on its own. */}
        <SmoothScroll>{children}</SmoothScroll>
        {/* Outside SmoothScroll: these are fixed to the viewport and have no
            business inside the scrolled content. */}
        <CookieConsent />
        <CustomCursor />
      </body>
    </html>
  );
}
