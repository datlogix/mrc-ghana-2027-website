import Link from "next/link";
import { categories } from "@/data/categories";
import { competitionVideos, publishedVideos, videosForCategory } from "@/data/videos";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ExternalLink, Notice, PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Videos and Past Events",
  description: "Official MRC category videos and highlights from past MRC Global Olympiads in Greece, published by H.E.R.O.",
  path: "/media",
});

export default function MediaPage() {
  const years = [...new Set(competitionVideos.map((v) => v.event!.year))].sort((a, b) => b - a);
  const about = publishedVideos.filter((v) => v.kind === "about");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Videos & past events", path: "/media" }]}
        eyebrow="Video library"
        title="Watch robot sports in action."
        intro="Official videos from the Hellenic Educational Robotics Organization (H.E.R.O.). Videos load only when you press play."
      >
        <nav aria-label="Video sections" className="flex flex-wrap gap-2">
          <a href="#categories" className="btn btn-ghost-light !min-h-10 !py-2 text-sm">Category videos</a>
          <a href="#international" className="btn btn-ghost-light !min-h-10 !py-2 text-sm">International highlights</a>
        </nav>
      </PageHero>

      <Section id="categories" labelledBy="cv-title">
        <SectionHeading id="cv-title" eyebrow="By category" title="Category demonstrations" intro="Short official videos introducing each sport. They are not a substitute for the official rules." />
        <div className="mt-12 space-y-14">
          {categories.map((c) => {
            const vids = videosForCategory(c.slug);
            return (
              <section key={c.slug} aria-labelledby={`v-${c.slug}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-3">
                  <h3 id={`v-${c.slug}`} className="text-2xl font-bold">{c.name}</h3>
                  <Link href={`/categories/${c.slug}`} className="font-semibold text-navy-700 underline underline-offset-4">Category details</Link>
                </div>
                {vids.length ? (
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{vids.map((v) => <VideoEmbed key={v.id} video={v} />)}</div>
                ) : (
                  <p className="mt-6 rounded-xl border border-dashed border-line bg-mist p-5 text-muted">
                    A verified video for {c.name} has not yet been identified. See the <ExternalLink href={c.rulesUrl} className="font-semibold text-navy-700 underline underline-offset-4">official rules</ExternalLink>.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Section>

      <Section id="international" className="bg-mist" labelledBy="intl-title">
        <SectionHeading id="intl-title" eyebrow="MRC international highlights" title="Past Global Olympiads" />
        <div className="mt-6 max-w-3xl">
          <Notice title="International events, not Ghana events">
            These videos show previous international MRC competitions in Greece. They are not past MRC Ghana competitions.
          </Notice>
        </div>
        {years.map((y) => (
          <section key={y} className="mt-12" aria-labelledby={`y-${y}`}>
            <h3 id={`y-${y}`} className="font-display text-3xl font-extrabold text-navy-950">{y}</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {competitionVideos.filter((v) => v.event!.year === y).map((v) => <VideoEmbed key={v.id} video={v} />)}
            </div>
          </section>
        ))}
        {about.length > 0 && (
          <section className="mt-14" aria-labelledby="about-v">
            <h3 id="about-v" className="text-2xl font-bold">About the organisers</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{about.map((v) => <VideoEmbed key={v.id} video={v} />)}</div>
          </section>
        )}
        <p className="mt-12 text-muted">
          More on the official channel:{" "}
          <ExternalLink href="https://www.youtube.com/@helleniceducationalrobotics" className="font-semibold text-navy-700 underline underline-offset-4">H.E.R.O. on YouTube</ExternalLink>
        </p>
      </Section>
    </>
  );
}
