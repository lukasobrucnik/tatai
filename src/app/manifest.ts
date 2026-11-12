import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * Manifest pro „Přidat na plochu“ (Android, Chrome, Edge). Barvy odpovídají
 * webu: kostěný podklad, grafitová hlavička. Ikony jsou v public/ — kostěná
 * dlaždice se značkou, maskable verze má větší okraj, aby ji systém mohl
 * oříznout do kruhu nebo „squircle“ bez uříznutí značky.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "cs",
    start_url: "/",
    display: "browser",
    background_color: "#f5f2ec",
    theme_color: "#f5f2ec",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
