import Link from "next/link";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { PostCover } from "./PostCover";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <span className="block overflow-hidden">
        <PostCover cover={post.cover} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-500 group-hover:scale-[1.02]" />
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </span>
        <h3 className="mt-2 text-xl font-bold group-hover:text-green-700">{post.title}</h3>
        <span className="mt-2 flex-1 text-[0.98rem] text-muted">{post.excerpt}</span>
        {post.tags.length > 0 && (
          <span className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-md bg-green-soft px-2.5 py-0.5 text-xs font-semibold text-green-700">{t}</span>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}
