import Link from "next/link";
import { event } from "@/config/event";
import { participationSteps } from "@/data/steps";
import { ArrowIcon, Notice, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to Participate",
  description: "A step-by-step guide to taking part in MRC Ghana 2027 — from choosing a sport to registering your team and competing in Accra.",
  path: "/participate",
});

const links: Record<number, { href: string; label: string }> = {
  1: { href: "/categories", label: "Explore the categories" },
  2: { href: "/categories", label: "Find official rules" },
  4: { href: "/resources", label: "Download information sheets" },
  5: { href: "/register", label: "Register a team" },
  7: { href: "/programme", label: "Programme & venue" },
  8: { href: "/global-finals", label: "International pathway" },
};

export default function ParticipatePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Participate", path: "/participate" }]}
        eyebrow="How to participate"
        title="Your path to MRC Ghana 2027."
        intro="Nine simple steps from first curiosity to competition day."
      />
      <Section>
        <ol className="relative mx-auto max-w-3xl space-y-6 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-px before:bg-line">
          {participationSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-6">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display font-bold text-gold-400 ring-8 ring-white">{i + 1}</span>
              <div className="card flex-1 p-6">
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-2 text-muted">{s.body}</p>
                {links[i] && (
                  <Link href={links[i].href} className="mt-3 inline-flex items-center gap-2 font-semibold text-navy-700 underline underline-offset-4">{links[i].label} <ArrowIcon /></Link>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-14 max-w-3xl space-y-5">
          <Notice title="Age-based eligibility">
            Eligibility is based on age, not school class. Each category lists its published age bands; team members must be at least 10 years old in the sports with published rules.
          </Notice>
          <Notice tone="pending" title="International selection is not automatic">
            Progression to the {event.globalOlympiad.name} depends on official eligibility, national selection arrangements, rule compliance and any confirmed international places. It does not include flights, accommodation, fees or sponsorship unless separately confirmed. <Link href="/global-finals" className="font-semibold underline">Learn more</Link>.
          </Notice>
        </div>
      </Section>
    </>
  );
}
