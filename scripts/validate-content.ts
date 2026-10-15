/**
 * Content guard-rails. Runs automatically before every build (npm run build).
 * Fails the build if content drifts from the approved, verified scope.
 *
 *   npm run validate:content
 */
import { APPROVED_SLUGS, categories } from "../src/data/categories";
import { videos } from "../src/data/videos";
import { gallery } from "../src/data/gallery";
import { partners } from "../src/data/partners";
import { faqs } from "../src/data/faqs";
import { event } from "../src/config/event";
import { sources } from "../src/data/sources";
import { participationSteps, homeSteps } from "../src/data/steps";
import { getPosts } from "../src/lib/blog";

const errors: string[] = [];
const warnings: string[] = [];
const fail = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

// 1. Exactly the seven approved sports, with their approved names and rules URLs.
const APPROVED: Record<string, { name: string; rulesUrl: string }> = {
  drones: { name: "Drones", rulesUrl: "https://www.he-ro.gr/mrc-drones" },
  "drone-soccer": { name: "Drone Soccer 3×3", rulesUrl: "https://www.he-ro.gr/drone-soccer" },
  marathon: { name: "Marathon", rulesUrl: "https://www.he-ro.gr/mrc-marathon" },
  football: { name: "Football 3×3", rulesUrl: "https://www.he-ro.gr/mrc-soccer" },
  shooting: { name: "Shooting", rulesUrl: "https://www.he-ro.gr/mrc-shooting" },
  archery: { name: "Archery", rulesUrl: "https://www.he-ro.gr/mrc-archery" },
  exhibition: { name: "Exhibition", rulesUrl: "https://www.he-ro.gr/mrc-exhibition" },
};
if (categories.length !== 7) fail(`Expected exactly 7 categories, found ${categories.length}.`);
if (APPROVED_SLUGS.length !== 7) fail("APPROVED_SLUGS must contain exactly 7 slugs.");
for (const c of categories) {
  const a = APPROVED[c.slug];
  if (!a) { fail(`Unapproved category slug: ${c.slug}`); continue; }
  if (c.name !== a.name) fail(`Category ${c.slug} name must be "${a.name}" (found "${c.name}").`);
  if (c.rulesUrl !== a.rulesUrl) fail(`Category ${c.slug} rules URL must be ${a.rulesUrl}.`);
  if (!sources.find((s) => s.id === c.sourceId)) fail(`Category ${c.slug} references unknown source ${c.sourceId}.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.rulesCheckedOn)) fail(`Category ${c.slug} needs an ISO rulesCheckedOn date.`);
  if (c.summary.length > 170) warn(`Category ${c.slug} summary is long (${c.summary.length} chars) for meta descriptions.`);
  const days = (Date.now() - Date.parse(c.rulesCheckedOn)) / 86_400_000;
  if (days > 60) warn(`Category ${c.slug} rules last checked ${Math.round(days)} days ago — re-verify against ${c.rulesUrl}.`);
}

// 1b. Blog posts parse (throws with the file name if front matter is invalid).
const posts = getPosts({ includeDrafts: true });
for (const p of posts) {
  if (p.excerpt.length > 220) warn(`Blog post ${p.slug}: excerpt is long (${p.excerpt.length} chars).`);
  if (Date.parse(p.date) > Date.now() + 86_400_000) warn(`Blog post ${p.slug} is dated in the future (${p.date}).`);
}
const postText = posts.filter((p) => p.published).map((p) => p.title + " " + p.html).join(" ");

// 2. Forbidden sports must not appear anywhere in public content.
const FORBIDDEN = [/marathon turbo/i, /obstacle race/i, /wrestling/i, /vex iq/i, /relay race/i, /rowing/i, /\bsumo\b/i];
const publicText = JSON.stringify({ categories, faqs, participationSteps, homeSteps, videos: videos.filter((v) => v.published) }) + postText;
for (const re of FORBIDDEN) if (re.test(publicText)) fail(`Forbidden sport mention found in public content: ${re}`);

// 3. School grade/class must not be used for eligibility.
if (/\b(grade|class [0-9]|primary [0-9]|jhs ?[0-9]|shs ?[0-9])\b/i.test(JSON.stringify(categories.map((c) => [c.ageBands, c.team]))))
  fail("Eligibility text must be age-based — remove school grade/class references.");

// 4. Videos: valid IDs, verified, categories approved, no duplicates.
const seen = new Set<string>();
for (const v of videos) {
  if (!/^[\w-]{11}$/.test(v.id)) fail(`Invalid YouTube ID: ${v.id}`);
  if (seen.has(v.id)) fail(`Duplicate video ID: ${v.id}`);
  seen.add(v.id);
  if (v.published && !v.verifiedOn) fail(`Published video ${v.id} has no verifiedOn date.`);
  if (v.category && !APPROVED[v.category]) fail(`Video ${v.id} uses unapproved category ${v.category}.`);
  if (v.kind === "competition" && !v.event) fail(`Competition video ${v.id} must state its event year and location.`);
  if (v.event && /ghana/i.test(v.event.location) && v.event.year < 2027)
    fail(`Video ${v.id}: past international events must not be labelled as Ghana events.`);
}

// 5. Gallery: rights + consent records.
for (const g of gallery) {
  if (g.published && !g.rightsRef) fail(`Gallery image ${g.src} is published without a rights record.`);
  if (g.published && g.alt.trim().length < 8) fail(`Gallery image ${g.src} needs meaningful alt text.`);
}

// 6. Partners: only approved ones can be published (logo wall hidden otherwise).
for (const p of partners) if (p.approved && !p.logo) fail(`Approved partner ${p.name} needs a logo path.`);

// 7. Event facts that must not drift without an explicit decision.
if (event.dates.start !== "2027-01-29" || event.dates.end !== "2027-01-30") fail("Ghana event dates changed — confirm with the organising committee and update this check.");
if (event.city !== "Accra") fail("Host city must be Accra.");
if (event.venue.status === "confirmed" && !event.venue.name) fail("Venue marked confirmed but has no name.");
if (event.globalOlympiad.dates.start !== "2027-04-23") warn("Global Olympiad dates changed — re-verify on he-ro.gr.");
if (!event.registration.url) warn("NEXT_PUBLIC_REGISTRATION_URL is not set — /register will show the 'link being finalised' message.");

// 7b. Stale event dates (the event moved from 30–31 to 29–30 January 2027 on 15 Oct 2026).
if (/30\s*[–-]\s*31 January|31 January 2027|Sunday,? 31/i.test(publicText.replace(/If you saw earlier dates[^.]*\./g, "")))
  fail("Public content still mentions the old 30–31 January dates — use 29–30 January 2027.");

// 8. No guarantees of qualification/travel funding.
const GUARANTEE = /(guaranteed (place|qualification|selection)|automatically qualif|fully funded|free (flights|travel))/i;
if (GUARANTEE.test(JSON.stringify({ faqs, categories }) + postText)) fail("Content appears to guarantee qualification or travel funding.");

for (const w of warnings) console.warn(`⚠  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`✗  ${e}`);
  console.error(`\nContent validation failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`✓  Content validation passed (${categories.length} categories, ${videos.filter((v) => v.published).length} published videos, ${gallery.filter((g) => g.published).length} gallery images, ${posts.filter((p) => p.published).length} blog posts).`);
