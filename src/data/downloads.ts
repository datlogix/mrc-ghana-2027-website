/**
 * Resources & downloads. Only `status: "published"` items show a download link.
 * "forthcoming" items appear as clearly labelled upcoming resources (no link).
 * "hidden" items never appear. Never publish placeholder documents as final.
 */
import { categories, categoryPdfPath } from "./categories";

export type Download = {
  id: string;
  title: string;
  description: string;
  audience: string;
  href?: string;
  format?: string;
  status: "published" | "forthcoming" | "hidden";
};

export const categorySheets: Download[] = categories.map((c) => ({
  id: `sheet-${c.slug}`,
  title: `${c.name} — Category Information Sheet`,
  description: c.rulesPublished
    ? `Overview, eligibility, equipment checklist, safety notes and registration guidance for ${c.name}.`
    : `Current status and preparation guidance for ${c.name}. Detailed rules awaiting official publication.`,
  audience: "Teams, coaches, parents",
  href: categoryPdfPath(c.slug),
  format: "PDF · A4",
  status: "published",
}));

export const generalResources: Download[] = [
  { id: "overview", title: "Competition Overview", description: "A summary of MRC Ghana 2027 for schools and families.", audience: "Everyone", status: "forthcoming" },
  { id: "school-pack", title: "School Invitation Pack", description: "Information for head teachers and school leaders.", audience: "School leaders", status: "forthcoming" },
  { id: "coach-guide", title: "Coach Preparation Guide", description: "Planning, training timelines and team management.", audience: "Coaches", status: "forthcoming" },
  { id: "inspection", title: "Technical Inspection Checklist", description: "What judges check before your robot competes.", audience: "Teams, coaches", status: "forthcoming" },
  { id: "parents", title: "Parent Information Guide", description: "What to expect, safety, consent and the event day.", audience: "Parents", status: "forthcoming" },
  { id: "prospectus", title: "Partnership Prospectus", description: "Partnership opportunities — request a copy via the Partners page.", audience: "Partners", status: "forthcoming" },
  { id: "programme", title: "Official Competition Programme", description: "Published once the timetable and venue are confirmed.", audience: "Everyone", status: "forthcoming" },
];
