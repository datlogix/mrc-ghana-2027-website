/**
 * Generates the A4 guide PDFs listed under "Guides and documents" on /resources,
 * from the single content sources (src/config/event.ts, src/data/categories.ts,
 * src/data/steps.ts). Only confirmed information is used; undecided items say
 * "to be announced".
 *
 *   npm run guides
 *
 * Output: public/downloads/guides/mrc-ghana-2027-<guide>.pdf
 */
import fs from "node:fs";
import path from "node:path";
import { createGuide, C } from "./pdf-kit";
import { categories } from "../src/data/categories";
import { participationSteps } from "../src/data/steps";
import { event } from "../src/config/event";

const OUT = path.join(process.cwd(), "public", "downloads", "guides");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrcghana.com").replace(/\/$/, "");
const VERSION = "2026-10-16";
const where = `${event.dates.display}  ·  ${event.city}, ${event.country}  ·  Venue to be announced`;
const deadline = event.registration.deadline ? `Registration closes on ${event.registration.deadline}.` : "Registration deadline: to be announced.";
const fees = event.registration.fee ? `Registration fees: ${event.registration.fee}.` : "Registration fees: to be announced.";
const go = event.globalOlympiad;
const pathwayNote = `Progression to the ${go.name} depends on official eligibility, national selection arrangements, rule compliance and any confirmed international places. It does not include flights, accommodation, fees or sponsorship unless separately confirmed in writing.`;
const contacts = [
  `Email: ${event.contact.email}`,
  `Phone: ${event.contact.phones.join(" or ")}`,
  `Website: ${SITE.replace(/^https?:\/\//, "")}`,
];

async function overview(file: string) {
  const g = createGuide({ file, title: "MRC Ghana 2027 — Competition Overview", subject: event.name, keywords: "MRC Ghana 2027, overview, robotics, Accra", date: VERSION });
  g.cover("Competition overview", "MRC Ghana 2027", "Ghana’s national robot sports competition", where);
  g.heading("What is MRC Ghana 2027?");
  g.para(`MRC Ghana 2027 is Ghana’s edition of the Minoan RobotSports Competition (MRC). Students design, build and program robots and drones that race, aim, shoot, fly missions and play football, under the official rules published by the Hellenic Educational Robotics Organization (H.E.R.O.). Every robot passes a technical inspection before it competes.`);
  g.para(`The competition is organised in Ghana by ${event.organisers.ghana.name}. Internationally, H.E.R.O. runs the annual MRC Global Olympiad in Crete. Ghana took part in the 2025 Global Olympiad in Crete.`);
  g.heading("Key dates", 260);
  g.table(["Date", "What happens"], [
    ["Now", "Team registration is open"],
    ...(event.registration.deadline ? [[event.registration.deadline, "Registration closes"] as [string, string]] : []),
    ["To be announced", "Venue and competition programme published"],
    [event.dates.display, `MRC Ghana 2027 in ${event.city}`],
    [go.dates.display, `${go.name}, ${go.city}`],
  ]);
  g.heading("The seven sports", 300);
  g.table(["Sport", "What teams do"], categories.map((c) => [c.name, c.rulesPublished ? c.summary : `${c.summary}`]));
  g.heading("Who can take part");
  g.list([
    "Eligibility is based on age, not school class. Team members must be at least 10 years old in the sports with published rules; each sport lists its age bands.",
    "Most sports are played by teams of 2 to 3 students. Individual entries are not accepted.",
    "Every team needs an adult coach aged 20 or over. A coach must bring one assistant for every three teams they register.",
    "Football 3×3 and Drone Soccer 3×3 are played in alliances of three teams.",
    "Exhibition rules for 2027 are awaiting publication by H.E.R.O.",
  ]);
  g.heading("How to take part");
  g.list(participationSteps.map((s) => `${s.title}. ${s.body}`), "number");
  g.heading("Registration and fees");
  g.list([deadline, fees, `Register online at ${SITE}/register. Participant information is collected only through the official registration application.`]);
  g.heading("The international pathway");
  g.para(`Top teams can be selected to represent Ghana at the ${go.name} (${go.edition}), ${go.dates.display}, ${go.venue}, ${go.city}.`);
  g.notice("Selection is not automatic", pathwayNote);
  g.heading("Contact the organisers");
  g.list(contacts);
  return g.finish(`${event.shortName} · Competition overview · v${VERSION} · Official H.E.R.O. rules take precedence`);
}

async function coachGuide(file: string) {
  const g = createGuide({ file, title: "MRC Ghana 2027 — Coach Preparation Guide", subject: `${event.name}: coach preparation`, keywords: "MRC Ghana 2027, coach, preparation, robotics", date: VERSION });
  g.cover("Coach preparation guide", "Coach Preparation Guide", "Planning, building and team management", where);
  g.notice("The current official H.E.R.O. rules take precedence", `This guide is a plain-English summary prepared by the MRC Ghana 2027 organisers. Always check each sport’s official rules, linked from ${SITE}/categories.`);
  g.heading("Your role as a coach");
  g.list([
    "You must be at least 20 years old. Bring one assistant for every three teams you register.",
    "Each team has 2 to 3 members (in most sports), all at least 10 years old.",
    "Each team names one Technician, the only team member allowed in the waiting and competition area. The Technician may change between attempts or matches.",
    "One robot per team. Robots may not be swapped during the competition or shared between teams.",
    "Rule ZERO applies: if you are not sure something is allowed, assume it is not and ask the organisers.",
  ]);
  g.heading("Suggested preparation plan", 320);
  g.para("A suggested plan to adapt to your school or club calendar. Only the registration deadline and competition dates are fixed.", { color: C.muted });
  g.table(["When", "What to do"], [
    ["Now", "Choose sports, check every student’s age band, read the official rules and form teams. Check equipment lists before buying parts or drones."],
    ...(event.registration.deadline ? [[`By ${event.registration.deadline}`, "Register every team. Collect guardian details and consent for every student under 18."] as [string, string]] : []),
    ["Build season", "Build and test against the size, weight and equipment rules. Practise runs and matches, and practise explaining how the robot works."],
    ["Final week", "Work through the Technical Inspection Checklist, charge batteries, pack spares and protective eyewear, and check organiser updates on reporting times."],
    [event.dates.display, "Report for technical inspection, then compete."],
    ["Afterwards", "Follow results and any international selection announcements from the organisers."],
  ], 140);
  g.heading("What to have ready for registration");
  g.list([
    "Organisation details (school, club or institution)",
    "Coach details and team members, including dates of birth",
    "Guardian details and consent for every minor",
    "Robot details and emergency contacts",
  ]);
  g.heading("Preparation checklists by sport");
  for (const c of categories) {
    g.subheading(c.name);
    g.list(c.checklist, "check");
  }
  g.heading("On competition day");
  g.list([
    "Be on time for technical inspection. In some sports, missing the inspection slot or failing inspection means exclusion or disqualification.",
    "Protective eyewear: the Drones pilot wears goggles; Shooting and Archery teams need safety glasses and protective equipment.",
    "Reporting times and the programme for both days will be published by the organisers on the Programme page.",
  ]);
  g.heading("Useful links");
  g.link("Sports, rules and age bands", `${SITE}/categories`);
  g.link("Category information sheets", `${SITE}/resources`);
  g.link("Register a team", `${SITE}/register`);
  g.link("Frequently asked questions", `${SITE}/faq`);
  g.heading("Contact the organisers");
  g.list(contacts);
  return g.finish(`${event.shortName} · Coach preparation guide · v${VERSION} · Official H.E.R.O. rules take precedence`);
}

async function inspection(file: string) {
  const g = createGuide({ file, title: "MRC Ghana 2027 — Technical Inspection Checklist", subject: `${event.name}: technical inspection`, keywords: "MRC Ghana 2027, technical inspection, checklist", date: VERSION });
  g.cover("Technical inspection checklist", "Technical Inspection Checklist", "What is checked before your robot competes", where);
  g.notice("Check against the current official rules", "Every robot passes a technical inspection before it competes. This checklist summarises the equipment and safety requirements in the official H.E.R.O. rules. The rules take precedence, and the organisers will confirm inspection arrangements in the programme.");
  g.para("Tick each item as you build, then bring a printed copy to the competition.");
  for (const c of categories) {
    g.heading(c.name);
    if (!c.rulesPublished || !c.equipment.length) {
      g.notice("Rules awaiting publication", "Detailed equipment and inspection requirements for this sport will be added once H.E.R.O. publishes and the organisers confirm them.");
      g.link("Official rules", c.rulesUrl);
      continue;
    }
    g.subheading("Robot and equipment");
    g.list(c.equipment, "check");
    g.subheading("Safety");
    g.list(c.safety, "check");
    g.link("Official rules", c.rulesUrl);
  }
  g.heading("Before you leave for the venue");
  g.list([
    "Robot or drone, controller and any tools you need for repairs",
    "Charged batteries, chargers and safe battery storage",
    "Protective eyewear, where your sport requires it",
    "This checklist and your team’s registration confirmation",
  ], "check");
  return g.finish(`${event.shortName} · Technical inspection checklist · v${VERSION} · Official H.E.R.O. rules take precedence`);
}

async function parents(file: string) {
  const g = createGuide({ file, title: "MRC Ghana 2027 — Parent Information Guide", subject: `${event.name}: information for parents and guardians`, keywords: "MRC Ghana 2027, parents, guardians, consent", date: VERSION });
  g.cover("Parent information guide", "Parent Information Guide", "What families need to know", where);
  g.heading("What is MRC Ghana 2027?");
  g.para(`MRC Ghana 2027 is Ghana’s national robot sports competition. Students work in small teams with an adult coach to design, build and program robots and drones, then compete in seven sports in ${event.city} on ${event.dates.display}. It is organised by ${event.organisers.ghana.name} as part of the Minoan RobotSports Competition run internationally by H.E.R.O.`);
  g.heading("Is my child eligible?");
  g.list([
    "Eligibility is based on age, not school class. Students must be at least 10 years old in the sports with published rules, and each sport lists its age bands.",
    "Students take part in teams of 2 to 3 (in most sports), entered by a school, club or organisation.",
    "Every team has an adult coach aged 20 or over.",
  ]);
  g.heading("Registration and consent");
  g.list([
    "The team’s coach registers the team through the official MRC Ghana 2027 registration application.",
    "Registration collects guardian details and consent for every student under 18.",
    deadline,
    fees,
    "Participant information is collected only through the official registration application.",
  ]);
  g.heading("Safety");
  g.list([
    "Every robot passes a technical inspection before it competes.",
    "Protective eyewear is required in the sports that need it: goggles for the Drones pilot, and safety glasses for Shooting and Archery.",
    "Drone Soccer matches are flown inside a fully netted arena.",
    "Only each team’s Technician enters the competition area during play.",
  ]);
  g.heading("Photos and filming");
  g.para("Photographs and video may be taken at MRC events. Images of identifiable young people are published only where appropriate consent has been recorded. To request removal of an image, email the organisers with the page address and a description of the image.");
  g.heading("The competition days");
  g.list([
    `${event.dates.days.map((d) => d.label).join(" and ")}, in ${event.city}. Times are Ghana time (GMT).`,
    "The venue and the programme for both days will be announced on the Programme page.",
  ]);
  g.heading("The international pathway");
  g.para(`Top teams can be selected to represent Ghana at the ${go.name}, ${go.dates.display}, ${go.city}.`);
  g.notice("Selection is not automatic", pathwayNote);
  g.heading("Questions?");
  g.list(contacts);
  g.link("Frequently asked questions", `${SITE}/faq`);
  return g.finish(`${event.shortName} · Parent information guide · v${VERSION}`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const jobs: [string, (f: string) => Promise<number>][] = [
    ["competition-overview", overview],
    ["coach-preparation-guide", coachGuide],
    ["technical-inspection-checklist", inspection],
    ["parent-information-guide", parents],
  ];
  for (const [slug, fn] of jobs) {
    const file = path.join(OUT, `mrc-ghana-2027-${slug}.pdf`);
    const pages = await fn(file);
    console.log(`✓ ${path.relative(process.cwd(), file)} (${pages} pages, ${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
