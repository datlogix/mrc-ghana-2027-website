/**
 * Crawls a running site and reports broken internal links, missing anchors and
 * missing downloads. External links are listed and (optionally) checked.
 *
 *   npm run build && npx next start -p 3100   (in another terminal)
 *   npm run check:links -- http://localhost:3100 [--external]
 */
export {};

const base = (process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "http://localhost:3100").replace(/\/$/, "");
const checkExternal = process.argv.includes("--external");
// Canonical / structured-data URLs point at the production domain; they only resolve after go-live.
const OWN_DOMAIN = /^https?:\/\/(www\.)?mrcghana\.com/;

const seen = new Map<string, number>();
const pageIds = new Map<string, Set<string>>();
const links: { from: string; href: string }[] = [];
const external = new Set<string>();
const queue = ["/"];

const attr = (html: string, name: string) => [...html.matchAll(new RegExp(`${name}="([^"]+)"`, "g"))].map((m) => m[1].replace(/&amp;/g, "&"));

async function crawl() {
  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    const res = await fetch(base + path, { redirect: "follow" });
    seen.set(path, res.status);
    const type = res.headers.get("content-type") || "";
    if (!type.includes("text/html")) continue;
    const html = await res.text();
    pageIds.set(new URL(res.url).pathname, new Set(attr(html, "id")));
    for (const href of [...attr(html, "href"), ...attr(html, "src")]) {
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("data:")) continue;
      if (/^https?:\/\//.test(href)) { if (!href.startsWith(base) && !OWN_DOMAIN.test(href)) external.add(href); continue; }
      if (href.startsWith("/_next/")) continue;
      links.push({ from: path, href });
      const u = new URL(href, base + path);
      const p = u.pathname + u.search;
      if (!seen.has(p) && !queue.includes(p)) queue.push(p);
    }
  }
}

(async () => {
  await crawl();
  const problems: string[] = [];
  for (const [p, status] of seen) if (status >= 400) problems.push(`${status}  ${p}  (linked from ${links.filter((l) => new URL(l.href, base + l.from).pathname + new URL(l.href, base + l.from).search === p).map((l) => l.from).slice(0, 3).join(", ")})`);
  for (const { from, href } of links) {
    const u = new URL(href, base + from);
    if (!u.hash) continue;
    const ids = pageIds.get(u.pathname);
    if (ids && !ids.has(decodeURIComponent(u.hash.slice(1)))) problems.push(`missing anchor  ${href}  (on ${from})`);
  }
  console.log(`Crawled ${seen.size} internal URLs; ${external.size} unique external links.`);
  if (checkExternal) {
    for (const url of external) {
      try {
        const r = await fetch(url, { method: "GET", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (link-check)" } });
        if (r.status >= 400) problems.push(`external ${r.status}  ${url}`);
      } catch (e) {
        problems.push(`external error  ${url}  ${(e as Error).message}`);
      }
    }
  } else {
    console.log("(run with --external to check external links)");
  }
  if (problems.length) {
    console.error(problems.map((p) => "✗ " + p).join("\n"));
    process.exit(1);
  }
  console.log("✓ No broken links found.");
})();
