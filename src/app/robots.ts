import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Nothing here is private, so everything is crawlable — the file exists to
 * point at the sitemap and to stop crawlers guessing at paths that were never
 * there.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
