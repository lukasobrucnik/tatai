import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

/**
 * Three real pages. The chapters on the homepage are fragments of one
 * document, not URLs, so they are deliberately absent — listing `/#strechy`
 * as a separate entry tells a crawler the site has pages it does not have.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
