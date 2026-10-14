/**
 * Partners & sponsors. The logo wall stays HIDDEN until at least one partner
 * is added here with `approved: true` and written permission to display
 * their logo. Never list an organisation that has not confirmed.
 */
export type Partner = {
  name: string;
  logo: string; // e.g. "/images/partners/acme.svg"
  url?: string;
  role: string; // e.g. "Venue Partner" — only roles agreed in writing
  approved: boolean;
};

export const partners: Partner[] = [];

export const approvedPartners = partners.filter((p) => p.approved);

/** Opportunity areas presented on /partners. These are areas of interest, not priced packages. */
export const partnershipAreas = [
  { title: "Competition venue & infrastructure", body: "Help secure and equip a professional venue in Accra for two days of national competition." },
  { title: "Robotics equipment & arenas", body: "Support competition arenas, fields, timing systems and robotics kits that meet official specifications." },
  { title: "Student participation & inclusion", body: "Enable schools and young people from under-served communities to take part, including girls in STEM." },
  { title: "Technical & volunteer capacity", body: "Contribute engineers, judges, mentors and volunteers who bring the competition to life." },
  { title: "Awards & recognition", body: "Celebrate excellence through medals, trophies and recognition for students, coaches and schools." },
  { title: "Media & communications", body: "Help tell the story of Ghana's young innovators through broadcast, digital and print media." },
  { title: "International team preparation & travel", body: "Support teams preparing for international competition, should they be selected under the official process." },
  { title: "In-kind equipment & professional services", body: "Offer products, connectivity, logistics, printing, catering or professional expertise." },
] as const;

export const partnershipTypes = [
  "Corporate sponsorship",
  "Government / public institution",
  "Foundation / development partner",
  "Educational institution",
  "In-kind support",
  "Media partnership",
  "Individual supporter",
  "Other",
] as const;

export const budgetRanges = [
  "Prefer not to say",
  "Under GHS 10,000",
  "GHS 10,000 – 50,000",
  "GHS 50,000 – 150,000",
  "Above GHS 150,000",
  "In-kind only",
] as const;
