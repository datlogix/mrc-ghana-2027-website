import Link from "next/link";
import type { Category } from "@/data/categories";
import { CategoryIcon, tileClass } from "./CategoryIcon";

function TeamIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 19v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.6a3 3 0 0 1 0 5.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Sport card in the registration app's style: tinted icon tile, ↗ cue, team size footer. */
export function CategoryCard({ c, index }: { c: Category; index: number }) {
  return (
    <Link href={`/categories/${c.slug}`} className="card card-hover group flex h-full flex-col p-5 sm:p-6">
      <span className="flex items-start justify-between">
        <span className={`icon-tile ${tileClass(index)} h-12 w-12`}>
          <CategoryIcon slug={c.slug} className="h-7 w-7" />
        </span>
        <svg className="h-5 w-5 text-navy-950 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M6 14 14 6M7 6h7v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="mt-6 text-lg font-bold">{c.name}</h3>
      <p className="mt-1 text-[0.95rem] text-muted">{c.strapline}</p>
      <p className="mt-3 flex-1 text-[0.95rem] text-muted">{c.summary}</p>
      <span className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.8rem]">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted">
          <TeamIcon />
          {c.teamSize ?? "Team size TBC"}
        </span>
        <span className="whitespace-nowrap font-semibold text-green-700">Details</span>
      </span>
    </Link>
  );
}
