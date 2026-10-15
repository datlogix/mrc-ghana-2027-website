import Link from "next/link";
import type { Category } from "@/data/categories";
import { CategoryImage } from "./CategoryImage";

function TeamIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.6a3 3 0 0 1 0 5.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Sport card: official MRC sport tile, name, summary and team-size footer. */
export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link href={`/categories/${c.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <span className="block overflow-hidden bg-ink">
        <CategoryImage
          slug={c.slug}
          name={c.name}
          decorative
          sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold">{c.name}</h3>
          <svg className="mt-1 h-5 w-5 shrink-0 text-navy-950 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 14 14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="mt-1 text-[0.95rem] text-muted">{c.strapline}</span>
        <span className="mt-3 flex-1 text-[0.95rem] text-muted">{c.summary}</span>
        <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.8rem]">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted">
            <TeamIcon />
            {c.teamSize ?? "Team size TBC"}
          </span>
          <span className="whitespace-nowrap font-semibold text-green-700">Details</span>
        </span>
      </span>
    </Link>
  );
}
