import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Section({ id, className = "", children, labelledBy }: { id?: string; className?: string; children: ReactNode; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id, eyebrow, title, intro, align = "left", dark = false,
}: { id?: string; eyebrow?: string; title: string; intro?: ReactNode; align?: "left" | "center"; dark?: boolean }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${dark ? "on-dark" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className={`mt-3 text-3xl sm:text-4xl font-extrabold ${dark ? "!text-white" : ""}`}>{title}</h2>
      {intro && <div className={`mt-4 text-lg ${dark ? "text-slate-300" : "text-muted"}`}>{intro}</div>}
    </div>
  );
}

type NoticeTone = "info" | "pending" | "warning";
export function Notice({ tone = "info", title, children }: { tone?: NoticeTone; title: string; children: ReactNode }) {
  const tones: Record<NoticeTone, string> = {
    info: "border-navy-600/30 bg-mist",
    pending: "border-gold-500/60 bg-[#fbf6e8]",
    warning: "border-[#b42318]/40 bg-[#fdf2f1]",
  };
  return (
    <div role="note" className={`rounded-2xl border-l-4 ${tones[tone]} p-5`}>
      <p className="font-semibold text-navy-950">{title}</p>
      <div className="mt-1 text-[0.98rem] text-body">{children}</div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-300">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-slate-500">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-gold-300 underline-offset-4 hover:underline">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(all)) }} />
    </>
  );
}

export function PageHero({
  eyebrow, title, intro, crumbs, children,
}: { eyebrow?: string; title: string; intro?: ReactNode; crumbs: { name: string; path: string }[]; children?: ReactNode }) {
  return (
    <header className="bg-midnight relative overflow-hidden text-white">
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="container-x relative pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl on-dark">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold !text-white">{title}</h1>
          {intro && <div className="mt-5 text-lg text-slate-300">{intro}</div>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div className="kente" aria-hidden />
    </header>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExternalIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 4h5v5M16 4l-7 7M14 12v4H4V6h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 17h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
