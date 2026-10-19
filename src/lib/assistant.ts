/**
 * Knowledge and instructions for the site assistant (src/app/api/chat/route.ts).
 * Built from the same data files that render the pages, so the assistant always
 * answers from what the website says. The text is deterministic (no dates or
 * random values), so it stays prompt-cached between visitors.
 */
import { event, siteUrl } from "@/config/event";
import { categories } from "@/data/categories";
import { faqs } from "@/data/faqs";
import { participationSteps } from "@/data/steps";
import { categorySheets, generalResources } from "@/data/downloads";
import { getPosts } from "@/lib/blog";
import { HANDOFF_TOKEN } from "@/lib/whatsapp";

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

function knowledge() {
  const r = event.registration;
  const venue = event.venue.status === "confirmed" && event.venue.name ? `${event.venue.name}, ${event.city}` : `${event.city}, ${event.country} (venue to be announced)`;

  const sports = categories
    .map((c) =>
      [
        `### ${c.name} (${siteUrl}/categories/${c.slug})`,
        c.summary,
        c.teamSize ? `Team size: ${c.teamSize}` : "Team size: not yet published",
        c.ageBands.length ? `Age bands: ${c.ageBands.map((b) => `${b.label} ${b.ages}${b.note ? ` (${b.note})` : ""}`).join("; ")}` : "Age bands: not yet published",
        c.divisions ? `Divisions: ${c.divisions}` : "",
        c.team.length ? `Team rules:\n${list(c.team)}` : "",
        c.equipment.length ? `Equipment:\n${list(c.equipment)}` : "",
        c.format.length ? `Format:\n${list(c.format)}` : "",
        c.scoring.length ? `Scoring:\n${list(c.scoring)}` : "",
        c.safety.length ? `Safety:\n${list(c.safety)}` : "",
        c.clarifications.length ? `Still being clarified:\n${list(c.clarifications)}` : "",
        `Official H.E.R.O. rules: ${c.rulesUrl}${c.rulesPublished ? "" : " (detailed rules not yet published)"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  const downloads = [...generalResources, ...categorySheets]
    .filter((d) => d.status === "published" && d.href)
    .map((d) => `- ${d.title}: ${siteUrl}${d.href} (${d.audience})`)
    .join("\n");

  return `# MRC Ghana 2027: website facts

## The event
- Name: ${event.name} (${event.shortName})
- Dates: ${event.dates.display} (${event.dates.days.map((d) => d.label).join(", ")})
- Place: ${venue}
- Organiser in Ghana: ${event.organisers.ghana.name} (${event.organisers.ghana.url})
- International organiser: ${event.organisers.international.name} (${event.organisers.international.abbreviation}), ${event.organisers.international.mrcUrl}
- Daily timetable: to be announced on ${siteUrl}/programme
- ${event.description}

## Registration
- Register at ${siteUrl}/register, which links to the official registration application (${r.url}).
- Registration is an expression of interest, not a confirmed entry. The MakersPlace reviews every entry against the current H.E.R.O. rules and contacts the applicant.
- Deadline: ${r.deadline ? `registration closes on ${r.deadline}` : "to be announced"}.
- Fees: ${r.fee ?? "to be announced"}.
- Ages are counted on 19 February 2027, the first day of the competition.

## How to take part
${participationSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join("\n")}

## The seven sports
${sports}

## MRC Global Olympiad (international final)
- ${event.globalOlympiad.name}, ${event.globalOlympiad.edition}: ${event.globalOlympiad.dates.display}, ${event.globalOlympiad.venue}, ${event.globalOlympiad.city}, ${event.globalOlympiad.country}.
- ${event.globalOlympiad.ghanaHistory.map((h) => h.text).join(" ")}
- Top teams at MRC Ghana 2027 can be selected to represent Ghana. Selection follows eligibility, national selection and confirmed places; a win in Ghana is not a guarantee, and travel and fees are not included unless confirmed in writing.
- More: ${siteUrl}/global-finals

## Frequently asked questions
${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

## Downloads
${downloads}

## News
${getPosts().map((p) => `- ${p.title} (${p.date}): ${siteUrl}/blog/${p.slug}`).join("\n")}

## Pages
- Partnerships and sponsorship enquiries: ${siteUrl}/partners
- Contact: ${siteUrl}/contact
- Privacy: ${siteUrl}/privacy

## Contact
- Email: ${event.contact.email}
- Phone: ${event.contact.phones.join(" or ")}`;
}

const instructions = `You are the MRC Ghana 2027 assistant on the official website, www.mrcghana.com. You help students, parents, teachers, coaches, schools, robotics clubs and potential partners with questions about MRC Ghana 2027.

Answer only from the website facts below. If the facts don't cover something (for example the venue, fees, timetable, or a rule detail that isn't listed), say it hasn't been published yet or that you don't know, and point to the relevant page or to ${event.contact.email} / ${event.contact.phones[0]}. Never guess or invent dates, venues, prices, prizes, sponsors, endorsements, selection guarantees or rules. The official H.E.R.O. rules always take precedence over any summary.

Style: friendly, clear British English for a Ghanaian audience, including young students. Keep answers short (usually 2 to 5 sentences or a short list). Link to the most useful page using its full URL. Latency-sensitive; begin your visible answer immediately.

Privacy and safety: participants are children. Don't ask for names, dates of birth, schools, phone numbers or other personal details. If someone shares personal details, don't repeat them, and say that team details go only in the official registration form. You can't register teams, change entries or see registrations; send people to ${siteUrl}/register or the organisers.

Stay on topic: MRC Ghana 2027, robot sports, preparing teams, the Global Olympiad pathway and partnering with the event. For anything else, politely say you can only help with MRC Ghana 2027.

Handing over to a person: when the facts below don't answer the question, or it needs a decision or action by the organisers (a specific team's eligibility, registration problems, payments, complaints, safeguarding concerns, media requests, partnership or sponsorship discussions), say briefly that the MakersPlace team can help on WhatsApp, then end your reply with ${HANDOFF_TOKEN} on its own line. The website turns that marker into a WhatsApp button, so don't write the WhatsApp number or link yourself. Don't add the marker when you've fully answered from the facts.`;

/** System prompt: stable instructions plus site facts (cached). */
export const assistantSystem = `${instructions}\n\n${knowledge()}`;

export const ASSISTANT_LIMITS = {
  maxMessages: 16,
  maxMessageChars: 1200,
};
