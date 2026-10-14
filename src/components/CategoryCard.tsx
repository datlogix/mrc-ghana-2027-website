import Link from "next/link";
import type { Category } from "@/data/categories";
import { CategoryIcon } from "./CategoryIcon";
import { ArrowIcon } from "./ui";

export function CategoryCard({ c, index }: { c: Category; index: number }) {
  return (
    <Link
      href={`/categories/${c.slug}`}
      className="card card-hover group relative flex h-full flex-col overflow-hidden p-6 sm:p-7"
    >
      <span
        aria-hidden
        data-n={String(index + 1).padStart(2, "0")}
        className="absolute right-5 top-4 font-display text-5xl font-extrabold text-navy-950/[0.05] before:content-[attr(data-n)]"
      />
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-ink">
        <CategoryIcon slug={c.slug} className="h-8 w-8" />
      </span>
      <h3 className="mt-6 text-xl font-bold">{c.name}</h3>
      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-gold-700">{c.strapline}</p>
      <p className="mt-3 flex-1 text-[0.98rem] text-muted">{c.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-900">
        Explore {c.name}
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
