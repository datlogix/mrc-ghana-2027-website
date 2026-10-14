import Link from "next/link";
import { Suspense } from "react";
import { event } from "@/config/event";
import { categories } from "@/data/categories";
import { RegisterLauncher } from "@/components/RegisterLauncher";
import { Notice, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Register a Team",
  description: `Register your team for ${event.shortName} (${event.dates.display}, ${event.city}) through the official registration application.`,
  path: "/register",
});

export default function RegisterPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Register", path: "/register" }]}
        eyebrow="Registration"
        title="Register a team for MRC Ghana 2027."
        intro={`${event.dates.display} · ${event.city}, ${event.country} · Venue to be announced`}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Before you start</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Choose your sport(s)", <>Check the <Link href="/categories" className="font-semibold text-navy-700 underline underline-offset-4">seven categories</Link> and their age bands.</>],
                ["Read the official rules", "Each category page links to its official H.E.R.O. rules."],
                ["Have your team details ready", "Organisation details, coach and team members (including dates of birth), guardian details and consent for every minor, and robot and emergency-contact details. Coaches must be at least 20 years old."],
                ["Expect an eligibility review", "Registration is an expression of interest. The MakersPlace reviews each entry against the current H.E.R.O. rules and contacts you about the outcome."],
              ].map(([t, b], i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-soft font-display font-bold text-green-700">{i + 1}</span>
                  <div><p className="font-semibold text-navy-950">{t}</p><p className="text-muted">{b}</p></div>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Notice tone="info" title="Fees and deadlines">
                {event.registration.fee ?? "Registration fees: to be announced."} {event.registration.deadline ?? "Registration deadline: to be announced."}
              </Notice>
            </div>
          </div>
          <div className="lg:pt-12">
            <Suspense fallback={<div className="card h-48 animate-pulse p-7" />}>
              <RegisterLauncher />
            </Suspense>
            <p className="mt-6 text-sm text-muted">
              Need help? <Link href="/contact" className="font-semibold text-navy-700 underline underline-offset-4">Contact the organisers</Link>.
            </p>
            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted">Register for a specific category</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/register?category=${c.slug}`} className="inline-block rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-navy-900 hover:border-navy-900">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
