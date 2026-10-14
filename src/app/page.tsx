import Link from "next/link";
import { event } from "@/config/event";
import { categories } from "@/data/categories";
import { competitionVideos, publishedVideos } from "@/data/videos";
import { faqs } from "@/data/faqs";
import { approvedPartners } from "@/data/partners";
import { CategoryCard } from "@/components/CategoryCard";
import { Countdown } from "@/components/Countdown";
import { HeroArt } from "@/components/HeroArt";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ArrowIcon, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { homeSteps } from "@/data/steps";

export const metadata = pageMetadata({
  title: `${event.shortName} | ${event.tagline}`,
  description: `Ghana's Minoan RobotSports Competition: ${event.dates.display} in ${event.city}. Seven robot sports, from Drones to Archery. Register a team or become a partner.`,
  path: "/",
});

export default function Home() {
  const featured = [
    publishedVideos.find((v) => v.category === "football"),
    publishedVideos.find((v) => v.category === "drone-soccer"),
    publishedVideos.find((v) => v.category === "archery"),
  ].filter(Boolean) as typeof publishedVideos;
  const highlight = competitionVideos.find((v) => v.id === "b_fLG_9D27A") ?? competitionVideos[0];
  const homeFaqs = faqs.filter((f) => f.home);

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-midnight relative overflow-hidden text-white" aria-labelledby="hero-title">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:pb-24 lg:pt-20">
          <div className="on-dark">
            <p className="eyebrow animate-rise">Minoan RobotSports Competition</p>
            <h1 id="hero-title" className="mt-5 text-5xl font-extrabold !text-white sm:text-6xl lg:text-7xl">
              MRC GHANA <span className="text-gold-400">2027</span>
            </h1>
            <p className="animate-rise delay-2 mt-4 font-display text-2xl font-bold text-gold-300 sm:text-3xl">{event.tagline}</p>
            <p className="animate-rise delay-2 mt-5 max-w-xl text-lg text-slate-300">{event.description}</p>

            <div className="animate-rise delay-3 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/10 py-5">
              <p className="font-display text-xl font-bold text-white">
                <time dateTime={event.dates.start}>{event.dates.display}</time>
                <span className="mx-2 text-gold-400" aria-hidden>|</span>
                {event.city}, {event.country}
              </p>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-sm font-semibold text-gold-300">
                Venue to be announced
              </p>
            </div>

            <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-gold">Register a Team <ArrowIcon /></Link>
              <Link href="/categories" className="btn btn-ghost-light">Explore Categories</Link>
              <Link href="/partners" className="btn px-2 text-white underline underline-offset-4 hover:text-gold-300">Become a Partner</Link>
            </div>

            <div className="mt-10">
              <Countdown />
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            <HeroArt />
          </div>
        </div>
        <div className="kente" aria-hidden />
      </section>

      {/* ── What is MRC ── */}
      <Section labelledBy="what-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            id="what-title"
            eyebrow="What is MRC?"
            title="Robotics, played as a sport."
            intro={
              <>
                <p>
                  The Minoan RobotSports Competition turns engineering into athletics. Students design, build and program robots and drones that race, shoot, play football and fly precision missions — under clear rules, against the clock and against each other.
                </p>
                <p className="mt-4">
                  MRC is an international programme of the {event.organisers.international.name} ({event.organisers.international.abbreviation}). In Ghana, it is organised by {event.organisers.ghana.name}.
                </p>
              </>
            }
          />
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["7", "robot sports on the Ghana programme"],
              ["2", "days of competition in Accra"],
              ["10+", "minimum age for team members"],
              ["1", "international Olympiad in Greece"],
            ].map(([n, l]) => (
              <div key={l} className="card flex flex-col-reverse justify-end p-6">
                <dt className="mt-2 text-[0.98rem] text-muted">{l}</dt>
                <dd className="font-display text-4xl font-extrabold text-navy-950">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ── Categories ── */}
      <Section className="bg-mist" labelledBy="cats-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="cats-title" eyebrow="Competition categories" title="Seven sports. One arena." intro="Choose the challenge that fits your team — from autonomous racing robots to aerial football." />
          <Link href="/categories" className="btn btn-outline self-start md:self-auto">View all categories</Link>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((c, i) => (
            <li key={c.slug}><CategoryCard c={c} index={i} /></li>
          ))}
          <li className="hidden xl:block">
            <Link href="/participate" className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-navy-950 p-7 text-white transition-colors hover:bg-navy-800">
              <span className="font-display text-xl font-bold">Not sure where to start?</span>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-300">How participation works <ArrowIcon /></span>
            </Link>
          </li>
        </ul>
      </Section>

      {/* ── How it works ── */}
      <Section labelledBy="how-title">
        <SectionHeading id="how-title" eyebrow="How participation works" title="From first idea to competition day." align="center" />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeSteps.map((s, i) => (
            <li key={s.title} className="card p-6">
              <span className="font-display text-sm font-extrabold tracking-[0.2em] text-gold-700">STEP {i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.98rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center">
          <Link href="/participate" className="inline-flex items-center gap-2 font-semibold text-navy-800 underline underline-offset-4">
            See the full participation guide <ArrowIcon />
          </Link>
        </p>
      </Section>

      {/* ── Videos ── */}
      <section className="bg-midnight py-16 text-white sm:py-24" aria-labelledby="watch-title">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading dark id="watch-title" eyebrow="Watch" title="Robot sports in action." intro="Official category videos from H.E.R.O., the international organiser of MRC." />
            <Link href="/media" className="btn btn-ghost-light self-start md:self-auto">Open the video library</Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((v) => <VideoEmbed key={v.id} video={v} />)}
          </div>
        </div>
      </section>

      {/* ── International pathway ── */}
      <Section labelledBy="path-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              id="path-title"
              eyebrow="International pathway"
              title="From Accra to Crete."
              intro="MRC Ghana 2027 is part of a worldwide robot sports movement that meets each year at the MRC Global Olympiad in Greece."
            />
            <p className="mt-6 text-[0.98rem] text-muted">
              Any progression from Ghana to Greece depends on official eligibility, national selection arrangements, compliance with the rules and any international places confirmed. Winning a Ghana category does not by itself guarantee selection, and selection does not include travel or fees unless separately confirmed.
            </p>
            <Link href="/global-finals" className="btn btn-navy mt-8">About the Global Olympiad</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-700">Ghana competition</p>
              <p className="mt-3 font-display text-2xl font-bold text-navy-950">{event.dates.display}</p>
              <p className="mt-1 text-muted">{event.city}, {event.country}</p>
              <p className="mt-1 text-muted">Venue to be announced</p>
            </div>
            <div className="rounded-[var(--radius-card)] bg-navy-950 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gold-400">{event.globalOlympiad.name}</p>
              <p className="mt-3 font-display text-2xl font-bold">{event.globalOlympiad.dates.display}</p>
              <p className="mt-1 text-slate-300">{event.globalOlympiad.city}, {event.globalOlympiad.country}</p>
              <p className="mt-1 text-slate-300">{event.globalOlympiad.venue}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Past international competitions ── */}
      <Section className="bg-mist" labelledBy="past-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <SectionHeading
              id="past-title"
              eyebrow="MRC international highlights"
              title="See the Global Olympiad."
              intro="Footage from previous international MRC competitions in Greece, published by H.E.R.O. These are international events, not past Ghana competitions."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/media#international" className="btn btn-navy">International highlights</Link>
              <Link href="/gallery" className="btn btn-outline">Gallery</Link>
            </div>
          </div>
          {highlight && <VideoEmbed video={highlight} />}
        </div>
      </Section>

      {/* ── Partners ── */}
      <section className="py-16 sm:py-24" aria-labelledby="partner-title">
        <div className="container-x">
          <div className="bg-midnight relative overflow-hidden rounded-[2rem] px-6 py-14 text-white sm:px-12 lg:px-16">
            <div className="grid-lines absolute inset-0" aria-hidden />
            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div className="on-dark">
                <p className="eyebrow">Partners & sponsors</p>
                <h2 id="partner-title" className="mt-3 text-3xl font-extrabold !text-white sm:text-4xl">
                  Partner with us to build Ghana&apos;s next generation of innovators.
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-slate-300">
                  Support young people through robotics, engineering, digital skills and international competition exposure.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/partners#enquire" className="btn btn-gold">Become a Sponsor</Link>
                <Link href="/partners" className="btn btn-ghost-light">Explore Partnership Opportunities</Link>
              </div>
            </div>
            {approvedPartners.length > 0 && (
              <ul className="relative mt-10 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8" aria-label="Our partners">
                {approvedPartners.map((p) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <li key={p.name}><img src={p.logo} alt={p.name} className="h-10 w-auto opacity-80" /></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ & essentials ── */}
      <Section className="pt-0 sm:pt-0" labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="Essentials" title="Good to know." />
            <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
              {[
                ["Dates", event.dates.display],
                ["City", `${event.city}, ${event.country}`],
                ["Venue", "To be announced"],
                ["Fees & deadlines", "To be announced"],
                ["Organiser", event.organisers.ghana.name],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-4">
                  <dt className="font-semibold text-navy-950">{k}</dt>
                  <dd className="text-right text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="divide-y divide-line border-y border-line">
              {homeFaqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-bold text-navy-950">
                    {f.q}
                    <span className="mt-1 text-gold-700 transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-800 underline underline-offset-4">All FAQs <ArrowIcon /></Link>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ── */}
      <section className="bg-midnight text-white" aria-labelledby="cta-title">
        <div className="container-x py-16 text-center sm:py-20 on-dark">
          <p className="eyebrow justify-center">{event.dates.display} · {event.city}</p>
          <h2 id="cta-title" className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold !text-white sm:text-5xl">Build it. Program it. Bring it to Accra.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="btn btn-gold">Register a Team <ArrowIcon /></Link>
            <Link href="/resources" className="btn btn-ghost-light">Download category sheets</Link>
          </div>
        </div>
      </section>
    </>
  );
}
