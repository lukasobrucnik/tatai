import type { NextConfig } from "next";

/**
 * HSTS tells the browser to refuse plaintext for this host for a year, so the
 * http→https hop only ever happens once per visitor — the host's own redirect
 * handles the first one. Two years and `preload` is the stricter setting, but
 * it is also effectively irreversible, so that is a decision for whoever owns
 * the domain rather than a default to ship.
 *
 * The rest are the cheap, no-behaviour-change hardening headers: no MIME
 * sniffing, no framing by other sites, and referrers trimmed to the origin
 * when leaving for another one.
 */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // One less fingerprint header on every response.
  poweredByHeader: false,
  images: {
    // AVIF first, WebP for anything that cannot take it. The source files are
    // already WebP; this is about what gets served, which is typically another
    // 20–30% off the same picture.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
