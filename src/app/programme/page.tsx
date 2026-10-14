import { event } from "@/config/event";
import { ExternalLink, Notice, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Programme and Venue",
  description: `MRC Ghana 2027 programme and venue: ${event.dates.display}, ${event.city}. Timetable and venue to be announced.`,
  path: "/programme",
});

export default function ProgrammePage() {
  const venueConfirmed = event.venue.status === "confirmed" && event.venue.name;
  const scheduleConfirmed = event.programme.status === "confirmed";
  return (
    <>
      <PageHero
        crumbs={[{ name: "Programme & venue", path: "/programme" }]}
        eyebrow="Programme & venue"
        title="Two days in Accra."
        intro={`${event.dates.display} · Ghana time (GMT)`}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {event.dates.days.map((d) => {
            const items = event.programme.schedule[d.date as keyof typeof event.programme.schedule];
            return (
              <section key={d.date} className="card p-7" aria-labelledby={`day-${d.date}`}>
                <h2 id={`day-${d.date}`} className="text-2xl font-bold"><time dateTime={d.date}>{d.label}</time></h2>
                <p className="mt-1 text-muted">Location: {event.city}, {event.country}</p>
                {scheduleConfirmed && items.length > 0 ? (
                  <ol className="mt-6 divide-y divide-line">
                    {items.map((it) => (
                      <li key={it.time + it.title} className="flex gap-5 py-3">
                        <span className="w-16 shrink-0 font-display font-bold tabular-nums text-gold-700">{it.time}</span>
                        <span><span className="font-semibold text-navy-950">{it.title}</span>{it.detail && <span className="block text-muted">{it.detail}</span>}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-6 rounded-xl border border-dashed border-gold-500/60 bg-[#fbf6e8] px-4 py-3 font-medium text-navy-950">Schedule pending — the timetable for this day will be published once approved.</p>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <section className="card p-7" aria-labelledby="venue">
            <h2 id="venue" className="text-2xl font-bold">Venue</h2>
            {venueConfirmed ? (
              <dl className="mt-5 space-y-4">
                <div><dt className="font-semibold text-navy-950">Venue</dt><dd>{event.venue.name}</dd></div>
                {event.venue.address && <div><dt className="font-semibold text-navy-950">Address</dt><dd>{event.venue.address}</dd></div>}
                {event.venue.directions && <div><dt className="font-semibold text-navy-950">Directions</dt><dd>{event.venue.directions}</dd></div>}
                {event.venue.accessibility && <div><dt className="font-semibold text-navy-950">Accessibility</dt><dd>{event.venue.accessibility}</dd></div>}
                {event.venue.visitorGuidance && <div><dt className="font-semibold text-navy-950">Visitor guidance</dt><dd>{event.venue.visitorGuidance}</dd></div>}
                {event.venue.googleMapsUrl && <ExternalLink href={event.venue.googleMapsUrl} className="btn btn-navy">Open in Google Maps</ExternalLink>}
              </dl>
            ) : (
              <p className="mt-4 text-lg">The venue in {event.city} will be announced once confirmed. Directions, accessibility information and visitor guidance will be published here.</p>
            )}
          </section>
          <div className="space-y-5">
            <Notice tone="pending" title="Reporting & technical inspection">
              {event.programme.reportingAndInspection ?? "Reporting times and technical inspection arrangements will be announced with the official programme."}
            </Notice>
            <Notice title="Time zone">All times on this website are Ghana time (GMT, UTC+0).</Notice>
          </div>
        </div>
      </Section>
    </>
  );
}
