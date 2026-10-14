/**
 * Video library. Only add videos whose exact YouTube ID, title and uploader
 * have been verified. Never invent an ID. Set `published: false` to hold a
 * video back until it has been reviewed.
 *
 * `kind`:
 *  - "category-demo"  → short official demonstration of a single sport
 *  - "competition"    → genuine MRC international competition footage
 *  - "about"          → introductions to H.E.R.O. / MRC
 *
 * Verification method (2026-10-14): YouTube oEmbed + watch-page metadata
 * (title, channel, upload date, embeddable). Footage of the category demos
 * matches the sport named in the official title; organisers should still
 * view each video before final approval (see docs/SOURCE_VERIFICATION.md).
 */
import type { CategorySlug } from "./categories";

export type Video = {
  id: string; // 11-character YouTube ID
  title: string; // title as published on YouTube
  displayTitle: string;
  uploader: string;
  uploadDate: string;
  durationSeconds: number;
  kind: "category-demo" | "competition" | "about";
  category?: CategorySlug;
  /** Event year and location the footage shows — only for verified competition footage. */
  event?: { year: number; name: string; location: string };
  description: string;
  verifiedOn: string;
  published: boolean;
};

const HERO = "Hellenic Educational Robotics Organization";
const V = "2026-10-14";

export const videos: Video[] = [
  // ── Category demonstrations (official H.E.R.O. channel) ──
  {
    id: "UmVT7IiZVo0", title: "Drones", displayTitle: "Drones — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 51, kind: "category-demo", category: "drones",
    description: "Short official H.E.R.O. video introducing the Drones category. Not a rules explanation — read the official rules.",
    verifiedOn: V, published: true,
  },
  {
    id: "MX3EVqIi-Y0", title: "DRONES", displayTitle: "Drones — earlier official video", uploader: HERO,
    uploadDate: "2023-05-12", durationSeconds: 212, kind: "category-demo", category: "drones",
    description: "An earlier H.E.R.O. Drones video (2023). Rules may have changed since — the current official rules take precedence.",
    verifiedOn: V, published: true,
  },
  {
    id: "HHCYRrN3-ss", title: "Drone Soccer", displayTitle: "Drone Soccer — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 53, kind: "category-demo", category: "drone-soccer",
    description: "Short official H.E.R.O. video introducing Drone Soccer. Not a rules explanation — read the official rules.",
    verifiedOn: V, published: true,
  },
  {
    id: "iG8R8jg7fUw", title: "Marathon Basic", displayTitle: "Marathon Basic — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 68, kind: "category-demo", category: "marathon",
    description: "Short official H.E.R.O. video showing the Marathon Basic division.",
    verifiedOn: V, published: true,
  },
  {
    id: "Fm-ZlJQ3OQM", title: "Marathon Advanced", displayTitle: "Marathon Advanced — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 47, kind: "category-demo", category: "marathon",
    description: "Short official H.E.R.O. video showing the Marathon Advanced division.",
    verifiedOn: V, published: true,
  },
  {
    id: "Ug7rW05WcGE", title: "Football", displayTitle: "Football — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 54, kind: "category-demo", category: "football",
    description: "Short official H.E.R.O. video introducing robot Football.",
    verifiedOn: V, published: true,
  },
  {
    id: "-t1rnDkqBBA", title: "Shooting", displayTitle: "Shooting — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 38, kind: "category-demo", category: "shooting",
    description: "Short official H.E.R.O. video introducing the Shooting category.",
    verifiedOn: V, published: true,
  },
  {
    id: "uai4x6XWNdc", title: "Archery", displayTitle: "Archery — official category video", uploader: HERO,
    uploadDate: "2025-10-21", durationSeconds: 60, kind: "category-demo", category: "archery",
    description: "Short official H.E.R.O. video introducing the Archery category.",
    verifiedOn: V, published: true,
  },
  // Exhibition: no verified official video identified yet — slot intentionally empty.

  // ── MRC international competition footage (Greece — NOT Ghana events) ──
  {
    id: "eVXRmr3lWZE", title: "MINOAN ROBOTSPORTS COMPETITION GLOBAL OLYMPIAD 2026 | 5TH EDITION | DAY 1",
    displayTitle: "Global Olympiad 2026 — Day 1 broadcast", uploader: HERO, uploadDate: "2026-04-03", durationSeconds: 9915,
    kind: "competition", event: { year: 2026, name: "MRC Global Olympiad 2026 (5th edition)", location: "Greece" },
    description: "Official live broadcast of the first day of the 5th MRC Global Olympiad.",
    verifiedOn: V, published: true,
  },
  {
    id: "gED_IXB12Yk", title: "MINOAN ROBOTSPORTS COMPETITION GLOBAL OLYMPIAD 2026 | 5TH EDITION | DAY 2",
    displayTitle: "Global Olympiad 2026 — Day 2 broadcast", uploader: HERO, uploadDate: "2026-04-04", durationSeconds: 35050,
    kind: "competition", event: { year: 2026, name: "MRC Global Olympiad 2026 (5th edition)", location: "Greece" },
    description: "Official live broadcast of the second day of the 5th MRC Global Olympiad.",
    verifiedOn: V, published: true,
  },
  {
    id: "eTyoeMEnT-U", title: "MINOAN ROBOTSPORTS COMPETITION GLOBAL OLYMPIAD 2026 | 5TH EDITION | DAY 3",
    displayTitle: "Global Olympiad 2026 — Day 3 broadcast", uploader: HERO, uploadDate: "2026-04-05", durationSeconds: 33470,
    kind: "competition", event: { year: 2026, name: "MRC Global Olympiad 2026 (5th edition)", location: "Greece" },
    description: "Official live broadcast of the third day of the 5th MRC Global Olympiad.",
    verifiedOn: V, published: true,
  },
  {
    id: "WJa4LDDnQaU", title: "MINOAN ROBOTSPORTS COMPETITION GLOBAL OLYMPIAD 2026 | 5TH EDITION | DAY 4",
    displayTitle: "Global Olympiad 2026 — Day 4 broadcast", uploader: HERO, uploadDate: "2026-04-06", durationSeconds: 36845,
    kind: "competition", event: { year: 2026, name: "MRC Global Olympiad 2026 (5th edition)", location: "Greece" },
    description: "Official live broadcast of the final day of the 5th MRC Global Olympiad.",
    verifiedOn: V, published: true,
  },
  {
    id: "b_fLG_9D27A", title: "MRC VIDEO 2025", displayTitle: "MRC 2025 highlights", uploader: HERO, uploadDate: "2026-01-02",
    durationSeconds: 241, kind: "competition", event: { year: 2025, name: "MRC Global Olympiad 2025", location: "Greece" },
    description: "Official H.E.R.O. highlights video titled 'MRC VIDEO 2025'.",
    verifiedOn: V, published: true,
  },
  {
    id: "wlJ_z_oG7KY", title: "INTRO H.E.R.O.", displayTitle: "Introducing H.E.R.O.", uploader: HERO, uploadDate: "2026-01-02",
    durationSeconds: 120, kind: "about",
    description: "Official introduction to the Hellenic Educational Robotics Organization, the international organiser of MRC.",
    verifiedOn: V, published: true,
  },
];

export const publishedVideos = videos.filter((v) => v.published);
export const videosForCategory = (slug: CategorySlug) =>
  publishedVideos.filter((v) => v.kind === "category-demo" && v.category === slug);
export const competitionVideos = publishedVideos
  .filter((v) => v.kind === "competition")
  .sort((a, b) => (b.event!.year - a.event!.year) || a.uploadDate.localeCompare(b.uploadDate));
