import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, categoryPdfPath, getCategory } from "@/data/categories";
import { videosForCategory } from "@/data/videos";
import { event } from "@/config/event";
import { CategoryIcon } from "@/components/CategoryIcon";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ArrowIcon, Breadcrumbs, DownloadIcon, ExternalIcon, ExternalLink, Notice } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { registerLanding } from "@/lib/registration";

export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} — Competition Category`, description: c.summary, path: `/categories/${c.slug}` });
}

function Block({ id, title, items, children }: { id: string; title: string; items?: string[]; children?: React.ReactNode }) {
  if ((!items || items.length === 0) && !children) return null;
  return (
    <section aria-labelledby={id} className="scroll-mt-28">
      <h2 id={id} className="text-2xl font-bold">{title}</h2>
      <div className="prose-mrc mt-5">
        {children}
        {items && items.length > 0 && <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>}
      </div>
    </section>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const vids = videosForCategory(c.slug);
  const idx = categories.findIndex((x) => x.slug === c.slug);
  const prev = categories[(idx - 1 + categories.length) % categories.length];
  const next = categories[(idx + 1) % categories.length];

  const toc = [
    ["overview", "Overview"],
    ["objectives", "What teams must do"],
    ["skills", "Skills tested"],
    ["eligibility", "Age eligibility"],
    ["team", "Team composition"],
    ["equipment", "Robot & equipment"],
    ["format", "Format & scoring"],
    ["safety", "Safety"],
    ["checklist", "Preparation checklist"],
    ["videos", "Videos"],
  ].filter(([id]) => {
    if (id === "eligibility") return c.ageBands.length > 0;
    if (id === "team") return c.team.length > 0;
    if (id === "equipment") return c.equipment.length > 0;
    if (id === "format") return c.format.length > 0 || c.scoring.length > 0;
    return true;
  });

  return (
    <>
      <header className="bg-midnight relative overflow-hidden text-white">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="container-x relative pb-14 pt-10 sm:pb-20 sm:pt-14">
          <Breadcrumbs items={[{ name: "Categories", path: "/categories" }, { name: c.name, path: `/categories/${c.slug}` }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="on-dark">
              <p className="eyebrow">Category {String(idx + 1).padStart(2, "0")} of 07 · {c.strapline}</p>
              <h1 className="mt-4 text-5xl font-extrabold !text-white sm:text-6xl">{c.name}</h1>
              <p className="mt-5 max-w-2xl text-lg text-slate-300">{c.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={registerLanding(c.slug)} className="btn btn-gold">Register for This Category <ArrowIcon /></Link>
                <a href={categoryPdfPath(c.slug)} className="btn btn-ghost-light" download>
                  <DownloadIcon /> Download Category Information (PDF)
                </a>
                <ExternalLink href={c.rulesUrl} className="btn btn-ghost-light">
                  Read Official H.E.R.O. Rules <ExternalIcon />
                </ExternalLink>
              </div>
            </div>
            <div className="hidden justify-end lg:flex" aria-hidden>
              <div className="flex h-56 w-56 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/[0.04] text-gold-400">
                <CategoryIcon slug={c.slug} className="h-32 w-32" />
              </div>
            </div>
          </div>
        </div>
        <div className="kente" aria-hidden />
      </header>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[16rem_1fr] lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="On this page" className="hidden lg:block">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted">On this page</p>
            <ul className="mt-4 space-y-2 border-l border-line">
              {toc.map(([id, label]) => (
                <li key={id}><a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-[0.95rem] text-muted hover:border-gold-500 hover:text-navy-950">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="card mt-0 p-5 lg:mt-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted">Rule source</p>
            <ExternalLink href={c.rulesUrl} className="mt-2 block break-words font-semibold text-navy-700 underline underline-offset-4">
              {c.rulesUrl.replace("https://", "")}
            </ExternalLink>
            <p className="mt-3 text-sm text-muted">Last verified: <time dateTime={c.rulesCheckedOn}>{formatDate(c.rulesCheckedOn)}</time></p>
            <p className="mt-3 text-sm text-muted">This page is a summary. The current official H.E.R.O. rules take precedence.</p>
          </div>
        </aside>

        <article className="min-w-0 space-y-14">
          {!c.rulesPublished && (
            <Notice tone="pending" title="Official rules awaiting publication">
              The official H.E.R.O. page for this category did not display detailed rules when last checked. Requirements below will be completed once the rules are published and confirmed.
            </Notice>
          )}

          <Block id="overview" title="Overview">
            {c.overview.map((p) => <p key={p} className="text-lg">{p}</p>)}
          </Block>
          <Block id="objectives" title="What teams must accomplish" items={c.objectives} />
          <Block id="skills" title="Skills being tested" items={c.skills} />

          {c.ageBands.length > 0 && (
            <section aria-labelledby="eligibility" className="scroll-mt-28">
              <h2 id="eligibility" className="text-2xl font-bold">Age eligibility & divisions</h2>
              {c.divisions && <p className="mt-4">{c.divisions}</p>}
              <div className="mt-5 overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-left">
                  <caption className="sr-only">Published age categories for {c.name}</caption>
                  <thead className="bg-mist text-sm uppercase tracking-[0.1em] text-muted">
                    <tr><th scope="col" className="px-5 py-3">Age category</th><th scope="col" className="px-5 py-3">Published ages</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {c.ageBands.map((a) => (
                      <tr key={a.label}>
                        <th scope="row" className="px-5 py-4 font-semibold text-navy-950">{a.label}</th>
                        <td className="px-5 py-4">{a.ages}{a.note && <span className="block text-sm text-muted">{a.note}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <Block id="team" title="Team composition" items={c.team} />
          <Block id="equipment" title="Robot & equipment requirements" items={c.equipment} />

          {(c.format.length > 0 || c.scoring.length > 0) && (
            <section aria-labelledby="format" className="scroll-mt-28">
              <h2 id="format" className="text-2xl font-bold">Format & scoring overview</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="card p-6 prose-mrc">
                  <h3 className="mb-4 text-lg font-bold">Format</h3>
                  <ul>{c.format.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div className="card p-6 prose-mrc">
                  <h3 className="mb-4 text-lg font-bold">Scoring</h3>
                  <ul>{c.scoring.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              </div>
            </section>
          )}

          <Block id="safety" title="Essential safety requirements" items={c.safety} />

          <section aria-labelledby="checklist" className="scroll-mt-28">
            <h2 id="checklist" className="text-2xl font-bold">Preparation checklist</h2>
            <ul className="mt-5 grid gap-3">
              {c.checklist.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                  <svg className="mt-0.5 h-6 w-6 shrink-0 text-gold-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><path d="m8 12 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            {c.officialResources.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Official practice resources</h3>
                <ul className="mt-3 space-y-2">
                  {c.officialResources.map((r) => (
                    <li key={r.url}>
                      <ExternalLink href={r.url} className="inline-flex items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">{r.label} <ExternalIcon /></ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {c.clarifications.length > 0 && (
            <Notice tone="pending" title="Awaiting clarification">
              <ul className="mt-2 list-disc space-y-2 pl-5">{c.clarifications.map((t) => <li key={t}>{t}</li>)}</ul>
            </Notice>
          )}

          <section aria-labelledby="videos" className="scroll-mt-28">
            <h2 id="videos" className="text-2xl font-bold">Videos</h2>
            {vids.length > 0 ? (
              <div className="mt-5 grid gap-6 md:grid-cols-2">{vids.map((v) => <VideoEmbed key={v.id} video={v} />)}</div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-line bg-mist p-8">
                <p className="font-semibold text-navy-950">A verified video for this category will be added soon.</p>
                <p className="mt-2 text-muted">In the meantime, read the <ExternalLink href={c.rulesUrl} className="font-semibold text-navy-700 underline underline-offset-4">official H.E.R.O. rules</ExternalLink> or browse the <Link href="/media" className="font-semibold text-navy-700 underline underline-offset-4">video library</Link>.</p>
              </div>
            )}
          </section>

          <section className="rounded-[2rem] bg-midnight p-8 text-white sm:p-10" aria-labelledby="cta">
            <h2 id="cta" className="text-3xl font-extrabold !text-white">Ready to compete in {c.name}?</h2>
            <p className="mt-3 text-slate-300">{event.dates.display} · {event.city}, {event.country} · Venue to be announced</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={registerLanding(c.slug)} className="btn btn-gold">Register for This Category <ArrowIcon /></Link>
              <a href={categoryPdfPath(c.slug)} className="btn btn-ghost-light" download><DownloadIcon /> Information sheet (PDF)</a>
            </div>
          </section>

          <nav aria-label="Other categories" className="flex flex-col justify-between gap-4 border-t border-line pt-8 sm:flex-row">
            <Link href={`/categories/${prev.slug}`} className="group">
              <span className="text-sm text-muted">Previous category</span>
              <span className="block font-display text-lg font-bold text-navy-950 group-hover:underline">← {prev.name}</span>
            </Link>
            <Link href={`/categories/${next.slug}`} className="group sm:text-right">
              <span className="text-sm text-muted">Next category</span>
              <span className="block font-display text-lg font-bold text-navy-950 group-hover:underline">{next.name} →</span>
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
