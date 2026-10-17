/**
 * Source-verification register (machine-readable).
 * Human-readable version with findings: docs/SOURCE_VERIFICATION.md
 *
 * Every factual statement about sports, eligibility and the Global Olympiad
 * must trace back to one of these sources. Update `checkedOn` whenever a source
 * is re-checked, and regenerate the PDFs (npm run pdfs).
 */

export type Source = {
  id: string;
  title: string;
  url: string;
  publisher: string;
  checkedOn: string; // ISO date
  covers: string;
  notes?: string;
};

export const sources: Source[] = [
  {
    id: "hero-mrc",
    title: "Minoan RobotSports Competition — MRC Global Olympiad",
    url: "https://www.he-ro.gr/minoan-robotsports-competition",
    publisher: "Hellenic Educational Robotics Organization (H.E.R.O.)",
    checkedOn: "2026-10-14",
    covers: "Global Olympiad 2027 dates, city and venue; list of sports; general participation rules.",
    notes:
      "Page shows 23–26 April 2027, Chania, Crete, Chania Kladissos Indoor Hall. An organiser block is still headed 'MRC GLOBAL OLYMPIAD 2026'. No age boundaries or national qualification rules are stated.",
  },
  {
    id: "hero-home",
    title: "H.E.R.O. homepage",
    url: "https://www.he-ro.gr",
    publisher: "Hellenic Educational Robotics Organization (H.E.R.O.)",
    checkedOn: "2026-10-14",
    covers: "Organisation name; 6th edition MRC Global Olympiad, 23–26 April 2027, Chania.",
  },
  {
    id: "rules-drones",
    title: "MRC Drones rules",
    url: "https://www.he-ro.gr/mrc-drones",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Drones category rules.",
  },
  {
    id: "rules-drone-soccer",
    title: "MRC Drone Soccer 3x3 rules",
    url: "https://www.he-ro.gr/drone-soccer",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Drone Soccer 3×3 category rules.",
  },
  {
    id: "rules-marathon",
    title: "MRC Marathon rules",
    url: "https://www.he-ro.gr/mrc-marathon",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Marathon (Basic and Advanced) category rules.",
  },
  {
    id: "rules-football",
    title: "MRC Football 3x3 rules",
    url: "https://www.he-ro.gr/mrc-soccer",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Football 3×3 category rules.",
  },
  {
    id: "rules-shooting",
    title: "MRC Shooting rules",
    url: "https://www.he-ro.gr/mrc-shooting",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Shooting category rules.",
  },
  {
    id: "rules-archery",
    title: "MRC Archery rules",
    url: "https://www.he-ro.gr/mrc-archery",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Archery category rules.",
  },
  {
    id: "rules-exhibition",
    title: "MRC Exhibition (EUREKA / Exhibition)",
    url: "https://www.he-ro.gr/mrc-exhibition",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Exhibition category.",
    notes:
      "URL redirects to /eureka-exhibition. On 2026-10-14 the page displayed only its title ('EUREKA / EXHIBITION') with no rules content, both via direct fetch and in a full browser.",
  },
  {
    id: "hero-youtube",
    title: "Hellenic Educational Robotics Organization — YouTube channel",
    url: "https://www.youtube.com/@helleniceducationalrobotics",
    publisher: "H.E.R.O.",
    checkedOn: "2026-10-14",
    covers: "Official category demonstration videos and Global Olympiad broadcasts.",
    notes: "Video titles, uploader, upload dates and embeddability checked through YouTube oEmbed and watch pages.",
  },
  {
    id: "owner-ghana",
    title: "Project owner instruction — MRC Ghana 2027 event facts",
    url: "https://www.mrcghana.com",
    publisher: "The MakersPlace (project owner)",
    checkedOn: "2026-10-15",
    covers: "Ghana dates (19–20 February 2027; moved from 29–30 January on 17 Oct 2026, previously 30–31 January), Accra, venue TBA, organiser, seven-sport working list, Ghana’s participation in the 2025 MRC Global Olympiad in Crete.",
    notes: "Owner-supplied facts override the previous mrcghana.com promotional content.",
  },
];

export const sourceById = (id: string) => sources.find((s) => s.id === id);
