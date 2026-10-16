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
  /** Other formats of the same document, e.g. a PowerPoint version. */
  alternates?: { label: string; href: string; format: string }[];
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
  {
    id: "call-to-participate",
    title: "Call to Participate — Schools & Robotics Clubs",
    description: "A 17-slide presentation for head teachers, STEM teachers and club leaders: the seven sports, what students gain, the route to the Global Olympiad and how to register.",
    audience: "School leaders, teachers, club leaders",
    href: "/downloads/mrc-ghana-2027-call-to-participate.pdf",
    format: "PDF · 17 slides · 5.4 MB",
    alternates: [{ label: "PowerPoint", href: "/downloads/mrc-ghana-2027-call-to-participate.pptx", format: "PPTX · 3.7 MB" }],
    status: "published",
  },
  { id: "coach-guide", title: "Coach Preparation Guide", description: "Planning, training timelines and team management.", audience: "Coaches", status: "forthcoming" },
  { id: "inspection", title: "Technical Inspection Checklist", description: "What judges check before your robot competes.", audience: "Teams, coaches", status: "forthcoming" },
  { id: "parents", title: "Parent Information Guide", description: "What to expect, safety, consent and the event day.", audience: "Parents", status: "forthcoming" },
  { id: "prospectus", title: "Partnership Prospectus", description: "Partnership opportunities — request a copy via the Partners page.", audience: "Partners", status: "forthcoming" },
  { id: "programme", title: "Official Competition Programme", description: "Published once the timetable and venue are confirmed.", audience: "Everyone", status: "forthcoming" },
];
