import Link from "next/link";
import { categories } from "@/data/categories";
import { event } from "@/config/event";
import { CategoryCard } from "@/components/CategoryCard";
import { Notice, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Competition Categories",
  description: "The seven MRC Ghana 2027 sports: Drones, Drone Soccer 3×3, Marathon, Football 3×3, Shooting, Archery and Exhibition.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Categories", path: "/categories" }]}
        eyebrow="Competition categories"
        title="Seven sports. Pick your challenge."
        intro="Each category has its own page with a plain-English summary, preparation checklist, downloadable information sheet and a link to the official H.E.R.O. rules."
      />
      <Section>
        {event.programmeApproval.status === "pending" && (
          <div className="mb-10">
            <Notice tone="pending" title="Ghana programme confirmation">
              These seven sports form the MRC Ghana 2027 working programme. Final participation arrangements are subject to confirmation by the Ghana organising committee.
            </Notice>
          </div>
        )}
        <h2 className="sr-only">All seven categories</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c) => <li key={c.slug}><CategoryCard c={c} /></li>)}
        </ul>
        <div className="mt-16 rounded-[var(--radius-card)] bg-mist p-6 sm:p-10">
          <div>
            <p className="eyebrow">Share the programme</p>
            <h2 className="mt-3 text-3xl font-extrabold">Seven categories, one weekend in Accra.</h2>
            <p className="mt-4 text-lg text-muted">
              MRC Ghana 2027 takes place on {event.dates.display} in {event.city}. Share the categories with your school, club or community.
            </p>
            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {categories.map((c, i) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="font-semibold text-navy-900 underline-offset-4 hover:text-green-700 hover:underline">
                    {i + 1}. {c.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="card p-7">
            <h2 className="text-xl font-bold">Drones vs Drone Soccer</h2>
            <p className="mt-2 text-muted">
              <strong className="text-navy-950">Drones</strong> is a precision-piloting mission flown by one team at a time.{" "}
              <strong className="text-navy-950">Drone Soccer 3×3</strong> is an aerial football match between alliances of three teams. They are separate sports with separate rules.
            </p>
          </div>
          <div className="card p-7">
            <h2 className="text-xl font-bold">Age-based eligibility</h2>
            <p className="mt-2 text-muted">
              Eligibility is based on age, not school class. See each category for its published age bands. <Link href="/faq" className="font-semibold text-navy-700 underline underline-offset-4">Read the FAQs</Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
