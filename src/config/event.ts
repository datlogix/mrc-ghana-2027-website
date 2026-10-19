/**
 * MRC Ghana 2027 — central event configuration.
 *
 * This is the ONE place to update dates, venue, registration, contacts and
 * Global Olympiad details. Every page reads from here. See docs/CONTENT_EDITING.md.
 *
 * Rules:
 *  - Only publish information that is confirmed by the organising committee.
 *  - Leave `confirmed: false` (or `null`) for anything undecided; the website
 *    then shows "To be announced" automatically.
 */

export type ConfirmationStatus = "confirmed" | "to-be-announced";

export const event = {
  name: "Minoan RobotSports Competition Ghana 2027",
  shortName: "MRC Ghana 2027",
  tagline: "Create. Code. Compete.",
  description:
    "Where robotics meets sport. Join innovators, students and teams in Accra for two days of engineering, coding, creativity and competition.",

  /** Ghana competition dates. Times are Ghana time (GMT, UTC+0). Moved from 29–30 January to 19–20 February 2027 (owner, 17 Oct 2026). */
  dates: {
    start: "2027-02-19",
    end: "2027-02-20",
    display: "19–20 February 2027",
    days: [
      { date: "2027-02-19", label: "Friday, 19 February 2027" },
      { date: "2027-02-20", label: "Saturday, 20 February 2027" },
    ],
    timeZone: "GMT",
  },

  city: "Accra",
  country: "Ghana",

  /**
   * Venue. Keep `status: "to-be-announced"` until the organising committee
   * confirms in writing. When confirmed, fill in the fields and change status.
   */
  venue: {
    status: "to-be-announced" as ConfirmationStatus,
    name: null as string | null,
    address: null as string | null,
    googleMapsUrl: null as string | null,
    directions: null as string | null,
    accessibility: null as string | null,
    visitorGuidance: null as string | null,
  },

  /**
   * Programme / timetable. Keep `status: "to-be-announced"` until the official
   * timetable is approved. Do not assign sports or ceremonies to days before then.
   */
  programme: {
    status: "to-be-announced" as ConfirmationStatus,
    reportingAndInspection: null as string | null,
    /** Fill per day once approved, e.g. [{ time: "08:00", title: "Registration desk opens" }] */
    schedule: {
      "2027-02-19": [] as { time: string; title: string; detail?: string }[],
      "2027-02-20": [] as { time: string; title: string; detail?: string }[],
    },
  },

  /**
   * Ghana sports programme approval. The seven sports in src/data/categories.ts
   * are the controlled working list. Set to "approved" once the organising
   * committee's approval record (and any written H.E.R.O. confirmation) exists.
   */
  programmeApproval: {
    status: "pending" as "pending" | "approved",
    approvedOn: null as string | null,
    reference: null as string | null,
  },

  organisers: {
    ghana: {
      name: "The MakersPlace",
      url: "https://makersplacegh.com",
    },
    international: {
      name: "Hellenic Educational Robotics Organization",
      abbreviation: "H.E.R.O.",
      url: "https://www.he-ro.gr",
      mrcUrl: "https://www.he-ro.gr/minoan-robotsports-competition",
    },
  },

  /**
   * Registration — the EXISTING Lovable application. Do not rebuild it here.
   * Set NEXT_PUBLIC_REGISTRATION_URL in the hosting environment, or replace the
   * fallback below once the published URL is confirmed.
   */
  registration: {
    /** Existing Lovable app: https://mrcghana2027.lovable.app — /register requires a passwordless email sign-in. */
    url: process.env.NEXT_PUBLIC_REGISTRATION_URL || "https://mrcghana2027.lovable.app/register",
    /** "open" | "opening-soon" | "closed". Controls button labels and messaging. */
    status: "open" as "open" | "opening-soon" | "closed",
    /**
     * Query parameter the Lovable app accepts for pre-selecting a category.
     * Checked 2026-10-14: the app's /register route only accepts ?id=<draft uuid>,
     * so this stays null and buttons link to the general registration start.
     */
    categoryParam: null as string | null,
    /** Fee: leave null until approved. */
    fee: null as string | null,
    /** Registration deadline (owner instruction, 16 Oct 2026). Set to null to show "to be announced". */
    deadline: "15 January 2027" as string | null,
    deadlineDate: "2027-01-15" as string | null,
  },

  contact: {
    /** Public organiser email used across the website (owner instruction, 15 Oct 2026). */
    email: "partnerships@makersplacegh.com",
    /** Partnership & sponsorship enquiries (from the official Call for Partnership flyer, 15 Oct 2026). */
    partnershipsEmail: "partnerships@makersplacegh.com",
    /** Organiser telephone numbers (from the official MRC Ghana 2027 flyers, 15 Oct 2026). */
    phones: ["+233 249 391 817", "+233 556 310 034"],
    /** WhatsApp for chatbot hand-off and the contact page (owner instruction, 19 Oct 2026). */
    whatsapp: "+233 556 310 034" as string | null,
    /** Only list verified official channels. */
    social: [] as { label: string; url: string }[],
  },

  /** International final — information from https://www.he-ro.gr/minoan-robotsports-competition */
  globalOlympiad: {
    name: "MRC Global Olympiad 2027",
    edition: "6th edition",
    dates: { start: "2027-04-23", end: "2027-04-26", display: "23–26 April 2027" },
    city: "Chania, Crete",
    country: "Greece",
    venue: "Chania Kladissos Indoor Hall",
    sourceUrl: "https://www.he-ro.gr/minoan-robotsports-competition",
    verifiedOn: "2026-10-14",
    /** Ghana's previous participation (project owner, 15 Oct 2026). */
    ghanaHistory: [{ year: 2025, text: "Ghana took part in the 2025 MRC Global Olympiad in Crete." }],
  },

  /** Partner/sponsor enquiries are delivered to ENQUIRY_TO_EMAIL (server env). */
  partnerEnquiryDestinationNote:
    "Set ENQUIRY_TO_EMAIL in the hosting environment to the approved organiser mailbox.",
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrcghana.com").replace(/\/$/, "");

/** Event start in Ghana time (GMT). Used by the countdown. */
export const eventStartUtc = Date.UTC(2027, 1, 19, 0, 0, 0);
export const eventEndUtc = Date.UTC(2027, 1, 21, 0, 0, 0); // end of Saturday 20 Feb (GMT)
