import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/event";
import { categories } from "@/data/categories";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/categories", "/participate", "/register", "/programme", "/global-finals", "/gallery", "/media", "/partners", "/resources", "/faq", "/contact", "/privacy", "/blog"];
  return [
    ...routes.map((r) => ({ url: `${siteUrl}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${siteUrl}/categories/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getPosts().map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: new Date(`${p.date}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
