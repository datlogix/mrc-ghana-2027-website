import Link from "next/link";
import { faqGroups, faqs } from "@/data/faqs";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about MRC Ghana 2027: dates, sports, ages, registration, preparation, the international pathway and partnerships.",
  path: "/faq",
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero crumbs={[{ name: "FAQs", path: "/faq" }]} eyebrow="FAQs" title="Frequently asked questions." intro="Only confirmed answers are published here. Undecided matters are marked “to be announced”." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase().replace(/\s+/g, "-")}`} className="block rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-navy-900 lg:rounded-lg lg:border-0 lg:px-3 lg:text-base hover:bg-mist">{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {faqGroups.map((g) => (
              <section key={g} id={g.toLowerCase().replace(/\s+/g, "-")} aria-labelledby={`h-${g}`} className="scroll-mt-28">
                <h2 id={`h-${g}`} className="text-2xl font-bold">{g}</h2>
                <div className="mt-4 divide-y divide-line border-y border-line">
                  {faqs.filter((f) => f.group === g).map((f) => (
                    <details key={f.q} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-bold text-navy-950">
                        {f.q}
                        <span className="mt-1 text-green-700 transition-transform group-open:rotate-45" aria-hidden>+</span>
                      </summary>
                      <p className="mt-3 text-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
            <p className="text-muted">Can&apos;t find your answer? <Link href="/contact" className="font-semibold text-navy-700 underline underline-offset-4">Contact us</Link>.</p>
          </div>
        </div>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
