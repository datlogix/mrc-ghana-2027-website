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
  event: { year: number; name: string; location: string };
  credit?: string;
  /** Rights/permission record reference (required for publication). */
  rightsRef: string;
  /** Consent record reference when identifiable minors appear. */
  consentRef?: string;
  published: boolean;
};

export const gallery: GalleryImage[] = [
  // No authorised photographs have been supplied yet.
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
