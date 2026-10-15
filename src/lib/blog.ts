/**
 * Blog posts live as Markdown files in /content/blog (one file per post).
 * The file name (without .md) is the URL slug: content/blog/my-post.md → /blog/my-post
 *
 * Front matter (between the --- lines at the top):
 *   title:     Post title (required)
 *   date:      YYYY-MM-DD (required)
 *   excerpt:   One or two sentences for cards and search results (required)
 *   author:    Optional, defaults to "MRC Ghana 2027 team"
 *   tags:      Optional, e.g. [Announcements, Sports]
 *   cover:     Optional: "hero" or "category:<slug>" (e.g. category:drones)
 *   published: true | false (false = draft, never shown)
 *
 * See docs/CONTENT_EDITING.md § Blog.
 */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { APPROVED_SLUGS, type CategorySlug } from "@/data/categories";

export type PostCover = { kind: "hero" } | { kind: "category"; slug: CategorySlug } | null;

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  cover: PostCover;
  published: boolean;
  html: string;
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content", "blog");

function parseFrontMatter(raw: string, file: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter (--- block at the top)`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

function parseCover(value: string | undefined, file: string): PostCover {
  if (!value) return null;
  if (value === "hero") return { kind: "hero" };
  const c = value.match(/^category:([a-z-]+)$/);
  if (c && (APPROVED_SLUGS as readonly string[]).includes(c[1])) return { kind: "category", slug: c[1] as CategorySlug };
  throw new Error(`${file}: unknown cover "${value}" (use "hero" or "category:<slug>")`);
}

/** Prefix site-internal links/images when served under a sub-path (static preview). */
function withBasePath(html: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!base) return html;
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
}

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, body } = parseFrontMatter(raw, file);
  for (const key of ["title", "date", "excerpt"]) {
    if (!data[key]) throw new Error(`${file}: front matter needs "${key}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) throw new Error(`${file}: date must be YYYY-MM-DD`);
  const words = body.split(/\s+/).filter(Boolean).length;
  const html = withBasePath(
    (marked.parse(body, { async: false, gfm: true }) as string)
      // open external links in a new tab safely
      .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"')
      .replace(/<img /g, '<img loading="lazy" decoding="async" '),
  );
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    author: data.author || "MRC Ghana 2027 team",
    tags: (data.tags || "").replace(/^\[|\]$/g, "").split(",").map((t) => t.trim()).filter(Boolean),
    cover: parseCover(data.cover, file),
    published: data.published !== "false",
    html,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

let cache: Post[] | null = null;

/** All posts, newest first. Drafts (published: false) are excluded unless includeDrafts is true. */
export function getPosts({ includeDrafts = false } = {}): Post[] {
  if (!cache) {
    const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_")) : [];
    cache = files.map(load).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  }
  return includeDrafts ? cache : cache.filter((p) => p.published);
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);
