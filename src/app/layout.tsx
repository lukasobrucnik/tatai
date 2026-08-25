import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";
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
  weight: ["400", "500"],
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
        {/* `html { scroll-behavior: smooth }` (globals.css) also governs the
            browser's native initial scroll-to-fragment. On a deep link like
            /#realizace that turns first paint into a multi-second animated
            scroll down the whole page instead of landing instantly. Force
            "auto" for that one native scroll, then hand behavior back to the
            CSS rule so in-page nav clicks stay smooth. */}
        <Script id="hash-scroll-instant" strategy="beforeInteractive">
          {`if (location.hash) {
            document.documentElement.style.scrollBehavior = "auto";
            window.addEventListener("load", function () {
              document.documentElement.style.scrollBehavior = "";
            }, { once: true });
          }`}
        </Script>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
