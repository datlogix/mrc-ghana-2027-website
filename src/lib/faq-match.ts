/**
 * Answers visitor questions from the website's own content, without an AI service.
 * Used by /api/chat when ANTHROPIC_API_KEY is not set. It matches the words in a
 * question against the FAQs, the seven sports and the key facts, and hands off to
 * WhatsApp when it isn't sure. Pure data in, text out: no network calls.
 */
import { event, siteUrl } from "@/config/event";
import { categories } from "@/data/categories";
import { faqs } from "@/data/faqs";
import { HANDOFF_TOKEN } from "@/lib/whatsapp";

const STOP = new Set(
  "a an the and or of to in on for at is are was were be do does i we you our my me it this that how what which who can with from by as about any there here please tell know want need get its us will would should could have has had not no yes so if then than too very also just can't don't it's".split(
    " ",
  ),
);

/** Lower-case words that carry meaning, with simple plural endings removed ("ages" -> "age"). */
export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.length > 4 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));
}

/** Questions that need a person: money back, complaints, safeguarding, press, and anything about a specific team or registration. */
const HANDOFF_WORDS = ["refund", "invoice", "receipt", "complaint", "complain", "abuse", "safeguard", "safeguarding", "press", "journalist", "interview", "withdraw"];
const PERSONAL_WORDS = ["team", "registration", "entry", "application", "status", "school", "club"];

const GREETING =
  "Hello! I can help with the dates, the seven robot sports, age rules, registration, fees, the Global Olympiad and partnerships. What would you like to know?";
const HANDOFF_TEXT = "That's a question for the MakersPlace team. They can help on WhatsApp.";
const NO_MATCH =
  "I don't have a clear answer to that on the website yet. Try asking about the dates, the sports, age rules or registration, or ask the MakersPlace team on WhatsApp.";

type Entry = {
  kind: "faq" | "intent";
  keys: Set<string>;
  /** A match on one of these is enough on its own (for example "register" or "fee"). */
  strong: Set<string>;
  text: string;
  url?: string;
};

const sportAliases: Record<string, string[]> = {
  drones: ["drone", "fly", "flying", "pilot"],
  "drone-soccer": ["soccer", "aerial", "football"],
  marathon: ["race", "racing", "autonomous", "line"],
  football: ["soccer", "match", "remote"],
  shooting: ["shoot", "dart", "launcher"],
  archery: ["bow", "arrow", "aim"],
  exhibition: ["showcase", "project", "display"],
};

const set = (words: string) => new Set(tokens(words));

/** The first published team rule matching a pattern, so these answers use the site's own wording. */
const teamRules = categories.flatMap((c) => c.team);
const pick = (pattern: RegExp) => teamRules.find((t) => pattern.test(t));

function buildEntries(): Entry[] {
  const r = event.registration;
  const deadline = r.deadline ?? "to be announced";
  const venueName = event.venue.status === "confirmed" && event.venue.name ? event.venue.name : "to be announced";

  const intents: Entry[] = [
    {
      kind: "intent",
      keys: set("when date dates day days february start time schedule"),
      strong: set("when date dates february"),
      text: `${event.dates.display} in ${event.city}, Ghana. The daily timetable will be announced on the programme page.`,
      url: "/programme",
    },
    {
      kind: "intent",
      keys: set("where venue place location address accra host city"),
      strong: set("where venue location"),
      text: `The competition takes place in ${event.city}, ${event.country}. Venue: ${venueName}.`,
      url: "/programme",
    },
    {
      kind: "intent",
      keys: set("register registration enter entry sign join apply enrol enroll team form"),
      strong: set("register registration enrol enroll entry"),
      text: `Register your team at ${siteUrl}/register. Registration is an expression of interest, not a confirmed entry: the MakersPlace reviews every entry against the official H.E.R.O. rules and contacts you. Registration closes on ${deadline}.`,
      url: "/register",
    },
    {
      kind: "intent",
      keys: set("deadline close closes closing last due until"),
      strong: set("deadline closes closing"),
      text: `Registration closes on ${deadline}.`,
      url: "/register",
    },
    {
      kind: "intent",
      keys: set("fee fees cost price pay free charge money"),
      strong: set("fee fees cost price"),
      text: r.fee ? `Entry fees: ${r.fee}.` : "Entry fees have not been announced yet. They will be published on the website when they are confirmed.",
    },
    {
      kind: "intent",
      keys: set("olympiad global crete chania greece international abroad travel final selection"),
      strong: set("olympiad crete chania greece"),
      text: `The MRC Global Olympiad 2027 is in ${event.globalOlympiad.city}, ${event.globalOlympiad.dates.display}. Top teams at MRC Ghana 2027 can be selected to represent Ghana, but selection follows eligibility and national selection, and a win in Ghana is not a guarantee. Travel and fees are not included unless confirmed in writing.`,
      url: "/global-finals",
    },
    {
      kind: "intent",
      keys: set("sponsor sponsorship partner partnership partners donate fund funding support invest csr"),
      strong: set("sponsor sponsorship partner partnership funding"),
      text: `Partners and sponsors help deliver the competition. Email ${event.contact.partnershipsEmail} or call ${event.contact.phones[0]}.`,
      url: "/partners",
    },
    {
      kind: "intent",
      keys: set("contact phone call email whatsapp reach telephone message organiser organisers"),
      strong: set("contact phone email whatsapp telephone"),
      text: `Email ${event.contact.email} or call ${event.contact.phones.join(" or ")}.${event.contact.whatsapp ? " You can also message us on WhatsApp." : ""}`,
      url: "/contact",
    },
    {
      kind: "intent",
      keys: set("age ages old young years born birthday student students child children kid kids minimum"),
      strong: set("age ages birthday"),
      text: [
        pick(/at least 10 years/i) ?? "Students must be at least 10 years old.",
        pick(/coach aged 20/i) ?? "Each team needs a coach aged 20 or over.",
        `Ages are counted on ${event.dates.days[0].label.replace(/^\w+, /, "")}, the first day of the competition. Age bands for each sport are on its page.`,
      ].join(" "),
      url: "/categories",
    },
    {
      kind: "intent",
      keys: set("coach coaches teacher teachers assistant adult supervise supervisor"),
      strong: set("coach coaches"),
      text: pick(/coach aged 20/i) ?? "Each team needs a coach aged 20 or over.",
      url: "/participate",
    },
    {
      kind: "intent",
      keys: set("hello hi hey greetings morning afternoon evening"),
      strong: set("hello hi hey greetings"),
      text: GREETING,
    },
  ];

  const sports: Entry[] = categories.map((c) => ({
    kind: "intent",
    keys: set([c.name, c.strapline, c.summary, ...(sportAliases[c.slug] ?? [])].join(" ")),
    strong: set(c.name),
    text: [
      `${c.name}: ${c.summary}`,
      c.teamSize ? `Team size: ${c.teamSize}.` : "",
      c.ageBands.length ? `Age bands: ${c.ageBands.map((b) => `${b.label} ${b.ages}`).join(", ")}.` : "",
      `Full details and the official rules: ${siteUrl}/categories/${c.slug}`,
    ]
      .filter(Boolean)
      .join(" "),
  }));

  const faqEntries: Entry[] = faqs.map((f) => ({
    kind: "faq",
    keys: set(f.q),
    strong: new Set(),
    text: f.a,
  }));

  return [...intents, ...sports, ...faqEntries];
}

let entries: Entry[] | null = null;

/** The best answer from the website's own content, plus whether a person should follow up on WhatsApp. */
export function answerFromWebsite(question: string): { text: string; handoff: boolean } {
  const raw = new Set(question.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
  if (raw.size === 0) return { text: GREETING, handoff: false };

  const personal = (raw.has("my") || raw.has("our")) && PERSONAL_WORDS.some((w) => raw.has(w));
  if (personal || HANDOFF_WORDS.some((w) => raw.has(w))) return { text: HANDOFF_TEXT, handoff: true };

  entries ??= buildEntries();
  const q = Array.from(new Set(tokens(question)));

  const hits: { score: number; text: string; url?: string }[] = [];
  for (const e of entries) {
    const matched = q.filter((t) => e.keys.has(t)).length;
    if (matched === 0) continue;
    const strongHit = q.some((t) => e.strong.has(t));
    const ok =
      e.kind === "faq"
        ? matched >= 2 || (matched >= 1 && matched / e.keys.size >= 0.5)
        : matched >= 2 || strongHit;
    if (!ok) continue;
    hits.push({ score: matched + (strongHit ? 0.5 : 0), text: e.text, url: e.url });
  }

  if (hits.length === 0) return { text: NO_MATCH, handoff: true };

  hits.sort((a, b) => b.score - a.score);
  const chosen = [hits[0]];
  // A question such as "when and where" can need two answers; add a second only when both are strong matches.
  if (hits[1] && hits[0].score >= 1.5 && hits[1].score >= 1.5 && hits[1].text !== hits[0].text) chosen.push(hits[1]);

  const text = chosen.map((h) => (h.url ? `${h.text}\nMore: ${siteUrl}${h.url}` : h.text)).join("\n");
  return { text, handoff: false };
}

export { HANDOFF_TOKEN };
