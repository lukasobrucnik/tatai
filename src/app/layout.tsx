import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
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
    "Ploché a šikmé střechy, sloupkové konstrukce, CLT panely a roubenky. Od skladby a detailu po předání. Valašské Meziříčí a okolí.",
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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
