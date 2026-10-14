import Link from "next/link";
import { event } from "@/config/event";
import { ExternalLink, Notice, PageHero, Section } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Olympiad Pathway",
  description: `The MRC Global Olympiad 2027: ${event.globalOlympiad.dates.display}, ${event.globalOlympiad.city}, ${event.globalOlympiad.country}. How the international pathway from Ghana works.`,
  path: "/global-finals",
});

export default function GlobalFinalsPage() {
  const g = event.globalOlympiad;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Global Olympiad pathway", path: "/global-finals" }]}
        eyebrow="International pathway"
        title="The MRC Global Olympiad in Greece."
        intro="The Minoan RobotSports Competition brings teams from around the world together at an annual Global Olympiad, organised by H.E.R.O."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="card p-7" aria-labelledby="gh">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-700">National competition</p>
            <h2 id="gh" className="mt-2 text-2xl font-bold">{event.shortName}</h2>
            <dl className="mt-5 space-y-3">
              <div><dt className="font-semibold text-navy-950">Dates</dt><dd>{event.dates.display}</dd></div>
              <div><dt className="font-semibold text-navy-950">Location</dt><dd>{event.city}, {event.country}</dd></div>
              <div><dt className="font-semibold text-navy-950">Venue</dt><dd>To be announced</dd></div>
              <div><dt className="font-semibold text-navy-950">Organiser</dt><dd>{event.organisers.ghana.name}</dd></div>
            </dl>
          </section>
          <section className="rounded-[var(--radius-card)] bg-navy-950 p-7 text-white" aria-labelledby="go">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-400">International final</p>
            <h2 id="go" className="mt-2 text-2xl font-bold !text-white">{g.name}</h2>
            <dl className="mt-5 space-y-3">
              <div><dt className="font-semibold">Dates</dt><dd className="text-slate-300">{g.dates.display}</dd></div>
              <div><dt className="font-semibold">Location</dt><dd className="text-slate-300">{g.city}, {g.country}</dd></div>
              <div><dt className="font-semibold">Venue</dt><dd className="text-slate-300">{g.venue}</dd></div>
              <div><dt className="font-semibold">Organiser</dt><dd className="text-slate-300">{event.organisers.international.name} ({event.organisers.international.abbreviation})</dd></div>
            </dl>
            <p className="mt-5 text-sm text-slate-400">
              Source: <ExternalLink href={g.sourceUrl} className="underline underline-offset-4">he-ro.gr</ExternalLink>, verified {formatDate(g.verifiedOn)}.
            </p>
          </section>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-6 text-lg">
          <h2 className="text-3xl font-extrabold">How progression works</h2>
          <p>Any progression from MRC Ghana 2027 to the Global Olympiad is conditional. It depends on:</p>
          <div className="prose-mrc">
            <ul>
              <li>the official eligibility rules for each sport and age category;</li>
              <li>the national selection arrangements, which will be published by the Ghana organisers;</li>
              <li>compliance with the official H.E.R.O. rules and technical requirements;</li>
              <li>any international places or quotas confirmed for Ghana.</li>
            </ul>
          </div>
          <Notice tone="pending" title="Please note">
            Winning a category at MRC Ghana 2027 does not by itself guarantee selection for the Global Olympiad. Selection does not include flights, accommodation, international registration fees or sponsorship unless this is separately confirmed in writing.
          </Notice>
          <p>
            Details of the national selection process will be published on this website. Questions? <Link href="/contact" className="font-semibold text-navy-700 underline underline-offset-4">Contact the organisers</Link>.
          </p>
        </div>
      </Section>
    </>
  );
}
