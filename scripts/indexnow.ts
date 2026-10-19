/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others) which
 * pages the site has, so they recrawl after a deploy.
 *
 *   npm run indexnow                 submit every page in the sitemap now
 *   tsx scripts/indexnow.ts --auto   used by "postbuild": only submits on
 *                                    Vercel production builds, otherwise skips
 *
 * The key is public by design: search engines check it against
 * public/<key>.txt on www.mrcghana.com. It never fails the build.
 */
import sitemap from "../src/app/sitemap";
import { siteUrl } from "../src/config/event";

export const INDEXNOW_KEY = "164e8ed539d66bddcc83022ebf4309d8";

async function main() {
  const auto = process.argv.includes("--auto");
  if (auto && process.env.VERCEL_ENV !== "production") {
    console.log("IndexNow: skipped (not a Vercel production build).");
    return;
  }

  const urlList = sitemap().map((entry) => entry.url);
  const host = new URL(siteUrl).host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`, urlList }),
  });

  // 200 = accepted, 202 = accepted while the key is being checked.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: submitted ${urlList.length} URLs for ${host} (HTTP ${res.status}).`);
  } else {
    console.warn(`IndexNow: not accepted (HTTP ${res.status}) ${await res.text().catch(() => "")}`.trim());
  }
}

main().catch((err) => {
  console.warn("IndexNow: request failed, continuing.", err instanceof Error ? err.message : err);
});
