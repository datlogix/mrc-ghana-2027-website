import Link from "next/link";
import { categorySheets, generalResources } from "@/data/downloads";
import { categories } from "@/data/categories";
import { CategoryImage } from "@/components/CategoryImage";
import { Flyer } from "@/components/Flyer";
import { DownloadIcon, Notice, PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMetadata({
  title: "Resources and Downloads",
  description: "Download MRC Ghana 2027 category information sheets (PDF) and preparation resources.",
  path: "/resources",
});

export default function ResourcesPage() {
  const visible = generalResources.filter((r) => r.status !== "hidden");
  return (
    <>
      <PageHero
        crumbs={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources & downloads"
        title="Everything you need to prepare."
        intro="Category information sheets, preparation guides and official documents. The current H.E.R.O. rules always take precedence."
      />
      <Section labelledBy="sheets-title">
        <SectionHeading id="sheets-title" eyebrow="Category information sheets" title="Seven sports, seven sheets." intro="A4 PDFs summarising each category, with a checklist, safety notes, registration guidance and a QR code to the official rules." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {categorySheets.map((d, i) => {
            const c = categories[i];
            return (
              <li key={d.id} className="card flex items-start gap-5 p-6">
                <span className="block w-16 shrink-0 overflow-hidden rounded-md sm:w-20"><CategoryImage slug={c.slug} name={c.name} decorative sizes="80px" /></span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold">{d.title}</h3>
                  <p className="mt-1 text-[0.98rem] text-muted">{d.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <a href={asset(d.href!)} download className="btn btn-navy !min-h-11 !py-2 text-[0.95rem]"><DownloadIcon /> Download PDF</a>
                    <Link href={`/categories/${c.slug}`} className="font-semibold text-navy-700 underline underline-offset-4">View page</Link>
                    <span className="text-sm text-muted">{d.format}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section className="bg-mist" labelledBy="flyers-title">
        <SectionHeading id="flyers-title" eyebrow="Announcements" title="Official flyers" intro="Share these with schools, clubs, parents and partners. Updated save-the-date and categories flyers with the new February dates are coming soon." />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <li><Flyer id="call-for-partnership" sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw" /></li>
        </ul>
      </Section>
      <Section labelledBy="more-title">
        <SectionHeading id="more-title" eyebrow="More resources" title="Guides and documents" />
        <div className="mt-6 max-w-3xl">
          <Notice title="Forthcoming resources">Documents marked “Coming soon” are in preparation and will be published here once approved by the organisers.</Notice>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <li key={r.id} className="card p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold">{r.title}</h3>
                {r.status === "forthcoming" && <span className="shrink-0 rounded-full bg-gold-soft px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-green-700">Coming soon</span>}
              </div>
              <p className="mt-2 text-[0.98rem] text-muted">{r.description}</p>
              <p className="mt-3 text-sm text-muted">For: {r.audience}</p>
              {r.status === "published" && r.href && (
                <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a href={asset(r.href)} className="inline-flex items-center gap-2 font-semibold text-navy-700 underline" download><DownloadIcon /> Download</a>
                  {r.format && <span className="text-sm text-muted">{r.format}</span>}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
