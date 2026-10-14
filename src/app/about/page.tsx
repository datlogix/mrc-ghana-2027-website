import Link from "next/link";
import { event } from "@/config/event";
import { publishedVideos } from "@/data/videos";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ExternalLink, PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About MRC",
  description: "About the Minoan RobotSports Competition and MRC Ghana 2027, organised in Ghana by The MakersPlace with the international programme of H.E.R.O.",
  path: "/about",
});

export default function AboutPage() {
  const intro = publishedVideos.find((v) => v.id === "wlJ_z_oG7KY");
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About MRC"
        title="Where engineering becomes a sport."
        intro="The Minoan RobotSports Competition (MRC) invites young people to design, build and program robots that compete in sports — and to learn engineering, coding, mathematics and teamwork along the way."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg">
            <h2 className="text-3xl font-extrabold">What makes robot sports different</h2>
            <p>In robot sports, the athlete is a machine — but the competitors are the people who build it. Every robot, drone or project must meet clear specifications and pass a technical inspection, and teams may be asked to explain how their design and program work.</p>
            <p>Each sport tests a different mix of skills: autonomous control in Marathon and Archery, precision piloting in Drones, alliance tactics in Football 3×3 and Drone Soccer 3×3, mechanism design in Shooting, and creative engineering in Exhibition.</p>
            <p>Rules are published by the international organiser and summarised on each <Link href="/categories" className="font-semibold text-navy-700 underline underline-offset-4">category page</Link>.</p>
          </div>
          <div className="grid gap-5">
            <div className="card p-7">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-700">Ghana organiser</p>
              <h3 className="mt-2 text-2xl font-bold">{event.organisers.ghana.name}</h3>
              <p className="mt-2 text-muted">Organiser of {event.shortName} in {event.city}.</p>
              <ExternalLink href={event.organisers.ghana.url} className="mt-3 inline-block font-semibold text-navy-700 underline underline-offset-4">makersplacegh.com</ExternalLink>
            </div>
            <div className="card p-7">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-700">International organiser</p>
              <h3 className="mt-2 text-2xl font-bold">{event.organisers.international.name} ({event.organisers.international.abbreviation})</h3>
              <p className="mt-2 text-muted">A non-profit organisation based in Heraklion, Crete, Greece, which organises the Minoan RobotSports Competition Global Olympiad and publishes the official MRC rules.</p>
              <ExternalLink href={event.organisers.international.mrcUrl} className="mt-3 inline-block font-semibold text-navy-700 underline underline-offset-4">he-ro.gr</ExternalLink>
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-mist">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Two events, clearly distinct"
            title="MRC Ghana 2027 and the Global Olympiad"
            intro={
              <ul className="mt-2 space-y-3 text-[1.02rem]">
                <li><strong className="text-navy-950">MRC Ghana 2027</strong> — {event.dates.display}, {event.city}, {event.country}. Venue to be announced.</li>
                <li><strong className="text-navy-950">{event.globalOlympiad.name}</strong> — {event.globalOlympiad.dates.display}, {event.globalOlympiad.city}, {event.globalOlympiad.country} ({event.globalOlympiad.venue}).</li>
              </ul>
            }
          />
          {intro && <VideoEmbed video={intro} />}
        </div>
      </Section>
    </>
  );
}
