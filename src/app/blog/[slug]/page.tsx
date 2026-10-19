import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/blog";
import { event, siteUrl } from "@/config/event";
import { PostCover } from "@/components/PostCover";
import { PostCard } from "@/components/PostCard";
import { ArrowIcon, Breadcrumbs } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, authors: [post.author] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: [
      post.cover?.kind === "category" ? `${siteUrl}/images/categories/${post.cover.slug}.png` : `${siteUrl}/images/hero-robotics-lab.jpg`,
      `${siteUrl}/opengraph-image`,
    ],
    inLanguage: "en-GB",
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: event.organisers.ghana.name, logo: { "@type": "ImageObject", url: `${siteUrl}/images/brand/makersplace.png` } },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <article>
        <header className="border-b border-line bg-white">
          <div className="container-x pb-10 pt-8 sm:pt-10">
            <Breadcrumbs items={[{ name: "News & blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
            <div className="mx-auto mt-10 max-w-3xl">
              {post.tags.length > 0 && <p className="eyebrow">{post.tags.join(" · ")}</p>}
              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{post.title}</h1>
              <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <span className="font-semibold text-navy-950">{post.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </p>
            </div>
          </div>
        </header>
        <div className="container-x py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-[var(--radius-card)]">
              <PostCover cover={post.cover} sizes="(min-width: 768px) 768px, 100vw" priority />
            </div>
            <div className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="mt-12 rounded-[var(--radius-card)] bg-navy-band p-7 text-white sm:p-8">
              <p className="font-display text-2xl font-bold">{event.shortName} · {event.dates.display} · {event.city}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/register" className="btn btn-gold">Register a Team <ArrowIcon /></Link>
                <Link href="/categories" className="btn btn-ghost-light">Explore categories</Link>
              </div>
            </div>
            <p className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-green-700 underline underline-offset-4">← All posts</Link>
            </p>
          </div>
        </div>
      </article>
      {others.length > 0 && (
        <section className="border-t border-line bg-mist py-14" aria-labelledby="more-posts">
          <div className="container-x">
            <h2 id="more-posts" className="text-2xl font-bold">More from the blog</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
            </ul>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
