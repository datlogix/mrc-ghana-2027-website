/**
 * Gallery images. Add only genuine, authorised photographs.
 *
 * Before publishing a photo:
 *  1. Confirm you have permission from the photographer / rights holder.
 *  2. For identifiable children, confirm a signed media-consent record exists
 *     (record its reference in `consentRef`).
 *  3. Write meaningful alt text describing what the photo shows.
 *  4. Place the file in /public/images/gallery/ (JPEG/WebP, ~2000px long edge).
 *
 * Items with `published: false` never appear on the website.
 */
import type { CategorySlug } from "./categories";

export type GalleryImage = {
  src: string; // e.g. "/images/gallery/2026-olympiad-football-01.jpg"
  width: number;
  height: number;
  alt: string;
  caption: string;
  category?: CategorySlug;
  /** Shows Ghana's team or delegation (enables the "Team Ghana" filter). */
  ghana?: boolean;
  event: { year: number; name: string; location: string };
  credit?: string;
  /** Rights/permission record reference (required for publication). */
  rightsRef: string;
  /** Consent record reference when identifiable minors appear. */
  consentRef?: string;
  published: boolean;
};

const MRC2025 = { year: 2025, name: "MRC Global Olympiad 2025", location: "Heraklion, Crete, Greece" };
/** Supplied by The MakersPlace from the official "MRC 2025" photo folder, 15 Oct 2026. */
const RIGHTS_2025 = "Owner-supplied MRC 2025 photo folder (Google Drive), 15 Oct 2026";
const CONSENT_2025 = "Event photography at MRC 2025 (H.E.R.O.) — confirm consent cover";
const CREDIT_2025 = "MRC Global Olympiad 2025";

export const gallery: GalleryImage[] = [
  {
    src: "/images/gallery/2025-ghana-flag-parade.jpg", width: 1600, height: 899,
    alt: "A member of the Ghana delegation raises the Ghana flag beside the South Korean flag during the parade of nations",
    caption: "Ghana’s flag in the parade of nations, opening day", ghana: true,
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-ghana-delegation-parade.jpg", width: 1600, height: 899,
    alt: "Members of the Ghana delegation, including young team members in grey hoodies with the Ghana flag, walk in the parade of nations",
    caption: "Team Ghana joins the parade of nations", ghana: true,
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-ghana-team-stands.jpg", width: 1600, height: 899,
    alt: "Team Ghana holds the Ghana flag in the arena stands, next to supporters with the Brazilian flag",
    caption: "Team Ghana in the stands", ghana: true,
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-ghana-flag-opening.jpg", width: 1600, height: 899,
    alt: "The Ghana flag flies among many national flags in the arena during the opening ceremony",
    caption: "The Ghana flag among the nations at the opening", ghana: true,
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-ghana-delegate-celebrates.jpg", width: 1600, height: 899,
    alt: "A smiling member of the Ghana delegation in an MRC hoodie celebrates in the crowd",
    caption: "Celebrating with the nations of MRC 2025", ghana: true,
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-flags-arena.jpg", width: 1600, height: 898,
    alt: "National flags line the arena balcony above teams preparing at their tables",
    caption: "Flags of the participating nations above the team area",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-teams-banners.jpg", width: 1600, height: 898,
    alt: "Teams wave club flags and banners on the green arena floor",
    caption: "Teams celebrate with their club banners",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-flags-crowd.jpg", width: 1600, height: 898,
    alt: "A crowd of students waves national flags in front of the main stage screen",
    caption: "Nations together in front of the main stage",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, consentRef: CONSENT_2025, published: true,
  },
  {
    src: "/images/gallery/2025-racing-track.jpg", width: 1600, height: 898,
    alt: "Teams gather at the end of a white robot racing track with black guide lines",
    caption: "Teams at a robot racing track",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, published: true,
  },
  {
    src: "/images/gallery/2025-autonomous-robot-ramp.jpg", width: 1600, height: 898,
    alt: "A small autonomous robot with green wheels follows a black line past a ramp",
    caption: "An autonomous robot on a line-following course",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, published: true,
  },
  {
    src: "/images/gallery/2025-drone.jpg", width: 1600, height: 898,
    alt: "A small quadcopter drone rests on a white table",
    caption: "A competition drone between flights", category: "drones",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, published: true,
  },
  {
    src: "/images/gallery/2025-kit-robot.jpg", width: 1600, height: 898,
    alt: "A colourful robot built from an educational construction kit on a competition field",
    caption: "A kit-built competition robot",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, published: true,
  },
  {
    src: "/images/gallery/2025-mrc-trophies.jpg", width: 1600, height: 898,
    alt: "A row of bronze-coloured MRC robot trophies on red stands",
    caption: "The MRC trophies",
    event: MRC2025, credit: CREDIT_2025, rightsRef: RIGHTS_2025, published: true,
  },
  // Example template:
  // Example (unpublished):
  // {
  //   src: "/images/gallery/2026-olympiad-football-01.jpg", width: 2000, height: 1333,
  //   alt: "Two robot football alliances compete on a green pitch",
  //   caption: "Football 3×3 at the MRC Global Olympiad 2026",
  //   category: "football", event: { year: 2026, name: "MRC Global Olympiad 2026", location: "Greece" },
  //   credit: "H.E.R.O.", rightsRef: "HERO-MEDIA-2026-01", published: false,
  // },
];

export const publishedGallery = gallery.filter((g) => g.published && g.rightsRef);
