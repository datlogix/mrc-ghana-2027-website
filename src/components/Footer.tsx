import Link from "next/link";
import { event } from "@/config/event";
import { categories } from "@/data/categories";
import { Logo } from "./Logo";
import { ExternalLink } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-slate-300">
      <div className="kente" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm">
            {event.name}. {event.dates.display}, {event.city}, {event.country}.
          </p>
          <p className="mt-4 text-sm">
            Organised in Ghana by{" "}
            <ExternalLink href={event.organisers.ghana.url} className="text-white underline underline-offset-4">
              {event.organisers.ghana.name}
            </ExternalLink>
            . International programme of the{" "}
            <ExternalLink href={event.organisers.international.url} className="text-white underline underline-offset-4">
              {event.organisers.international.name} ({event.organisers.international.abbreviation})
            </ExternalLink>
            .
          </p>
          <p className="mt-4">
            <a href={`mailto:${event.contact.email}`} className="text-gold-300 underline underline-offset-4">
              {event.contact.email}
            </a>
          </p>
        </div>

        <nav aria-labelledby="f-cats">
          <h2 id="f-cats" className="text-sm font-bold uppercase tracking-[0.14em] !text-white">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-take">
          <h2 id="f-take" className="text-sm font-bold uppercase tracking-[0.14em] !text-white">Take part</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/participate" className="hover:text-white">How to participate</Link></li>
            <li><Link href="/register" className="hover:text-white">Register a team</Link></li>
            <li><Link href="/programme" className="hover:text-white">Programme & venue</Link></li>
            <li><Link href="/global-finals" className="hover:text-white">Global Olympiad pathway</Link></li>
            <li><Link href="/resources" className="hover:text-white">Resources & downloads</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="f-more">
          <h2 id="f-more" className="text-sm font-bold uppercase tracking-[0.14em] !text-white">More</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/about" className="hover:text-white">About MRC</Link></li>
            <li><Link href="/media" className="hover:text-white">Videos & past events</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link href="/partners" className="hover:text-white">Partners & sponsorship</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy & data protection</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} {event.organisers.ghana.name}. All rights reserved.</p>
          <p>
            Official rules:{" "}
            <ExternalLink href={event.organisers.international.mrcUrl} className="text-slate-200 underline underline-offset-4">
              he-ro.gr/minoan-robotsports-competition
            </ExternalLink>{" "}
            — the current H.E.R.O. rules always take precedence.
          </p>
        </div>
      </div>
    </footer>
  );
}
