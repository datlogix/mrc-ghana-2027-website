import Link from "next/link";
import { event } from "@/config/event";
import { categories } from "@/data/categories";
import { competitionVideos, publishedVideos } from "@/data/videos";
import { faqs } from "@/data/faqs";
import { approvedPartners } from "@/data/partners";
import { CategoryCard } from "@/components/CategoryCard";
import { Countdown } from "@/components/Countdown";
import Image from "next/image";
import heroImage from "../../public/images/hero-robotics-lab.jpg";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ArrowIcon, ExternalLink, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { homeSteps } from "@/data/steps";
import { PartnerLogos } from "@/components/PartnerLogos";
import { getPosts } from "@/lib/blog";
import { PostCard } from "@/components/PostCard";

export const metadata = pageMetadata({
  title: `${event.shortName} | Robotics Competition in ${event.city}, 19–20 Feb`,
  description: `Ghana's national robotics competition for schools and robotics clubs: seven robot sports, ${event.dates.display} in ${event.city}. Register a team by ${event.registration.deadline}.`,
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
  const latestPosts = getPosts().slice(0, 3);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
        <Image
          src={heroImage}
          alt=""
          priority
          quality={70}
          placeholder="blur"
          sizes="(max-width: 767px) 75vw, 100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        />
        <div className="hero-overlay absolute inset-0 -z-10" aria-hidden />
        <div className="container-x pb-14 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="max-w-2xl on-dark">
            <p className="eyebrow animate-rise"><ExternalLink href={event.organisers.ghana.url} className="underline underline-offset-4">{event.organisers.ghana.name}</ExternalLink> · Minoan RobotSports Competition</p>
            <h1 id="hero-title" className="mt-5 text-5xl font-extrabold !text-white sm:text-6xl lg:text-7xl">
              MRC Ghana <span className="text-gold-500">2027</span>
            </h1>
            <p className="animate-rise delay-1 mt-4 font-display text-2xl font-bold text-white sm:text-3xl">{event.tagline}</p>
            <p className="animate-rise delay-2 mt-4 max-w-xl text-lg text-slate-200">{event.description}</p>

            <div className="animate-rise delay-2 mt-7 flex flex-wrap items-center gap-3">
              <p className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-ink/40 px-3.5 py-2 font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden />
                <time dateTime={event.dates.start}>{event.dates.display}</time> · {event.city}, {event.country}
              </p>
              <p className="inline-flex items-center rounded-md border border-white/25 bg-ink/40 px-3.5 py-2 text-sm text-slate-200">Venue to be announced</p>
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
        </div>
        <div className="container-x absolute inset-x-0 bottom-5 hidden justify-end md:flex" aria-hidden>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-white/80">
            <span className="h-px w-6 bg-gold-500" /> CREATE. CODE. COMPETE.
          </p>
        </div>
      </section>

      {/* ── Registration notice (matches the registration app) ── */}
      <div className="border-b border-line bg-gold-soft">
        <div className="container-x flex gap-4 py-6">
          <svg className="mt-0.5 h-6 w-6 shrink-0 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p className="font-semibold text-navy-950">Registration is an expression of interest, not a confirmed entry.</p>
            <p className="mt-1 text-[0.98rem] text-body">
              {event.organisers.ghana.name} reviews every entry against the current H.E.R.O. rules and contacts the applicant. Submission does not confirm eligibility, selection or qualification.
            </p>
          </div>
        </div>
      </div>

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
                  MRC is an international programme of the {event.organisers.international.name} ({event.organisers.international.abbreviation}). In Ghana, it is organised by <ExternalLink href={event.organisers.ghana.url} className="font-semibold text-navy-700 underline underline-offset-4">{event.organisers.ghana.name}</ExternalLink>.
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
          {categories.map((c) => (
            <li key={c.slug}><CategoryCard c={c} /></li>
          ))}
          <li className="hidden xl:block">
            <Link href="/participate" className="flex h-full flex-col rounded-[var(--radius-card)] bg-green-soft p-6 transition-colors hover:bg-[#d3f0e2]">
              <svg className="h-7 w-7 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="mt-8 font-display text-lg font-bold text-navy-950">Not sure where to start?</span>
              <span className="mt-2 flex-1 text-[0.95rem] text-body">Explore each sport&apos;s rules before choosing your team&apos;s challenge.</span>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700">How participation works <ArrowIcon /></span>
            </Link>
          </li>
        </ul>
      </Section>

      {/* ── How it works ── */}
      <Section labelledBy="how-title">
        <SectionHeading id="how-title" eyebrow="How participation works" title="From first idea to competition day." />
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {homeSteps.map((s, i) => (
            <li key={s.title} className="border-t border-line pt-6">
              <span className="flex items-start justify-between">
                <span aria-hidden />
                <span aria-hidden data-n={String(i + 1).padStart(2, "0")} className="font-display text-3xl font-extrabold text-navy-950/15 before:content-[attr(data-n)]" />
              </span>
              <h3 className="mt-2 text-lg font-bold">
                <span className="sr-only">Step {i + 1}: </span>{s.title}
              </h3>
              <p className="mt-2 text-[0.98rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10">
          <Link href="/participate" className="inline-flex items-center gap-2 font-semibold text-navy-800 underline underline-offset-4">
            See the full participation guide <ArrowIcon />
          </Link>
        </p>
      </Section>

      {/* ── Videos ── */}
      <section className="bg-navy-band py-16 text-white sm:py-24" aria-labelledby="watch-title">
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
            <p className="mt-6 inline-flex items-center gap-3 rounded-md border-l-4 border-gold-500 bg-gold-soft px-4 py-3 font-semibold text-navy-950">
              {event.globalOlympiad.ghanaHistory[0].text}
            </p>
            <p className="mt-6 text-[0.98rem] text-muted">
              Any progression from Ghana to Greece depends on official eligibility, national selection arrangements, compliance with the rules and any international places confirmed. Winning a Ghana category does not by itself guarantee selection, and selection does not include travel or fees unless separately confirmed.
            </p>
            <Link href="/global-finals" className="btn btn-navy mt-8">About the Global Olympiad</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-green-700">Ghana competition</p>
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

      {/* ── Organisers & partners ── */}
      {approvedPartners.length > 0 && (
        <Section className="pb-0 sm:pb-0" labelledBy="org-title">
          <SectionHeading id="org-title" eyebrow="Organisers & partners" title="Brought to you by." align="center" />
          <PartnerLogos className="mx-auto mt-10 max-w-5xl" />
        </Section>
      )}

      {/* ── Partners ── */}
      <section className="py-16 sm:py-24" aria-labelledby="partner-title">
        <div className="container-x">
          <div className="bg-navy-band relative overflow-hidden rounded-[var(--radius-card)] px-6 py-14 text-white sm:px-12 lg:px-16">
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
          </div>
        </div>
      </section>

      {/* ── Latest news ── */}
      {latestPosts.length > 0 && (
        <Section className="pt-0 sm:pt-0" labelledBy="news-title">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="news-title" eyebrow="News & blog" title="Latest updates." />
            <Link href="/blog" className="btn btn-outline self-start md:self-auto">All posts</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
          </ul>
        </Section>
      )}

      {/* ── FAQ & essentials ── */}
      <Section className="pt-0 sm:pt-0" labelledBy="faq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="Essentials" title="Good to know." />
            <dl className="mt-8 divide-y divide-line rounded-md border border-line">
              {[
                ["Dates", event.dates.display],
                ["City", `${event.city}, ${event.country}`],
                ["Venue", "To be announced"],
                ["Registration closes", event.registration.deadline ?? "To be announced"],
                ["Fees", event.registration.fee ?? "To be announced"],
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
                    <span className="mt-1 text-green-700 transition-transform group-open:rotate-45" aria-hidden>+</span>
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
      <section className="bg-navy-band text-white" aria-labelledby="cta-title">
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
