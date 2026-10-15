import Link from "next/link";
import { event } from "@/config/event";
import { categories } from "@/data/categories";
import { Logo } from "./Logo";
import { ExternalLink } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white text-body">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-5 max-w-sm">
            {event.name}. {event.dates.display}, {event.city}, {event.country}.
          </p>
          <p className="mt-4 text-sm">
            Organised in Ghana by{" "}
            <ExternalLink href={event.organisers.ghana.url} className="font-medium text-navy-950 underline underline-offset-4">
              {event.organisers.ghana.name}
            </ExternalLink>
            . International programme of the{" "}
            <ExternalLink href={event.organisers.international.url} className="font-medium text-navy-950 underline underline-offset-4">
              {event.organisers.international.name} ({event.organisers.international.abbreviation})
            </ExternalLink>
            .
          </p>
          <p className="mt-4 text-sm">
            {event.contact.phones.map((p, i) => (
              <span key={p}>
                {i > 0 && " / "}
                <a href={`tel:${p.replace(/\s/g, "")}`} className="font-medium text-navy-950 underline underline-offset-4">{p}</a>
              </span>
            ))}
          </p>
          <p className="mt-2">
            <a href={`mailto:${event.contact.email}`} className="font-semibold text-green-700 underline underline-offset-4">
              {event.contact.email}
            </a>
          </p>
        </div>

        <nav aria-labelledby="f-cats">
          <h2 id="f-cats" className="eyebrow">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="hover:text-green-700">{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="f-take">
          <h2 id="f-take" className="eyebrow">Take part</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/participate" className="hover:text-green-700">How to participate</Link></li>
            <li><Link href="/register" className="hover:text-green-700">Register a team</Link></li>
            <li><Link href="/programme" className="hover:text-green-700">Programme & venue</Link></li>
            <li><Link href="/global-finals" className="hover:text-green-700">Global Olympiad pathway</Link></li>
            <li><Link href="/resources" className="hover:text-green-700">Resources & downloads</Link></li>
            <li><Link href="/faq" className="hover:text-green-700">FAQs</Link></li>
          </ul>
        </nav>

        <nav aria-labelledby="f-more">
          <h2 id="f-more" className="eyebrow">More</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/about" className="hover:text-green-700">About MRC</Link></li>
            <li><Link href="/blog" className="hover:text-green-700">News & blog</Link></li>
            <li><Link href="/media" className="hover:text-green-700">Videos & past events</Link></li>
            <li><Link href="/gallery" className="hover:text-green-700">Gallery</Link></li>
            <li><Link href="/partners" className="hover:text-green-700">Partners & sponsorship</Link></li>
            <li><Link href="/contact" className="hover:text-green-700">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-green-700">Privacy & data protection</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} {event.organisers.ghana.name}. All rights reserved.</p>
          <p>
            Official rules:{" "}
            <ExternalLink href={event.organisers.international.mrcUrl} className="font-medium text-navy-950 underline underline-offset-4">
              he-ro.gr/minoan-robotsports-competition
            </ExternalLink>{" "}
            — the current H.E.R.O. rules always take precedence.
          </p>
        </div>
      </div>
    </footer>
  );
}
