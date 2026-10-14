import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/event";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview/staging deployments should not be indexed.
  const isProd = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1" ? false : process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProd ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
