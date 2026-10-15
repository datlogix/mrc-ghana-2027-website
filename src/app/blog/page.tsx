import { getPosts } from "@/lib/blog";
import { PostCard } from "@/components/PostCard";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/asset";

const base = pageMetadata({
  title: "News & Blog",
  description: "News, announcements and preparation tips for MRC Ghana 2027 — the Minoan RobotSports Competition in Accra.",
  path: "/blog",
});
export const metadata = { ...base, alternates: { ...base.alternates, types: { "application/rss+xml": "/blog/rss.xml" } } };

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <PageHero
        crumbs={[{ name: "News & blog", path: "/blog" }]}
        eyebrow="News & blog"
        title="Latest from MRC Ghana 2027."
        intro="Announcements, sport guides and preparation tips for teams, coaches, parents and partners."
      >
        <a href={asset("/blog/rss.xml")} className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 underline underline-offset-4">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden><path d="M4 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1-5.9a7.9 7.9 0 0 1 7.9 7.9H9a6 6 0 0 0-6-6V9.1ZM3 4a13 13 0 0 1 13 13h-1.9A11.1 11.1 0 0 0 3 5.9V4Z" /></svg>
          RSS feed
        </a>
      </PageHero>
      <Section>
        <h2 className="sr-only">All posts</h2>
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
          </ul>
        ) : (
          <p className="text-lg text-muted">No posts yet. Please check back soon.</p>
        )}
      </Section>
    </>
  );
}
