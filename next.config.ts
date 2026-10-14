import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "font-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://challenges.cloudflare.com",
  "connect-src 'self' https://plausible.io https://challenges.cloudflare.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/**
 * STATIC_EXPORT=1 builds the static test preview (GitHub Pages). It has no server,
 * so security headers, redirects, image optimisation and /api are not available.
 * Production on Vercel uses the normal (server) build.
 */
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport ? { output: "export" as const, trailingSlash: true, basePath: basePath || undefined } : {}),
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/downloads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
      },
    ];
  },
  /** Legacy URLs from the previous mrcghana.com (listed in its sitemap.xml) → new routes. */
  async redirects() {
    return [
      { source: "/sports", destination: "/categories", permanent: true },
      { source: "/sports/:slug*", destination: "/categories", permanent: true },
      { source: "/rules", destination: "/categories", permanent: true },
      { source: "/pathway", destination: "/global-finals", permanent: true },
      { source: "/sponsors", destination: "/partners", permanent: true },
      { source: "/terms", destination: "/privacy#terms", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/admin", destination: "/register", permanent: false },
      { source: "/admin/:path*", destination: "/register", permanent: false },
      { source: "/categories/soccer", destination: "/categories/football", permanent: true },
      { source: "/categories/drone-soccer-3x3", destination: "/categories/drone-soccer", permanent: true },
      { source: "/categories/football-3x3", destination: "/categories/football", permanent: true },
    ];
  },
};

if (staticExport) {
  // Not supported by static export; production (Vercel) keeps them.
  delete nextConfig.headers;
  delete nextConfig.redirects;
}

export default nextConfig;
