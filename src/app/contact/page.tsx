import Link from "next/link";
import { event } from "@/config/event";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ExternalLink, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact the Organisers",
  description: "Contact The MakersPlace, organisers of MRC Ghana 2027, about registering teams, schools, partnerships, media and volunteering. Email or call +233 249 391 817.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Contact", path: "/contact" }]} eyebrow="Contact" title="Get in touch." intro="We are happy to help schools, coaches, parents, media and partners." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-bold">Organiser</h2>
              <p className="mt-1"><ExternalLink href={event.organisers.ghana.url} className="font-semibold text-navy-700 underline underline-offset-4">{event.organisers.ghana.name}</ExternalLink></p>
              <dl className="mt-4 space-y-3">
                <div><dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Email</dt><dd><a href={`mailto:${event.contact.email}`} className="font-semibold text-navy-700 underline underline-offset-4">{event.contact.email}</a></dd></div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Telephone</dt>
                  {event.contact.phones.map((p) => (
                    <dd key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold text-navy-700 underline underline-offset-4">{p}</a></dd>
                  ))}
                </div>
                {event.contact.whatsapp && (
                  <div><dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">WhatsApp</dt><dd><a href={`https://wa.me/${event.contact.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 underline underline-offset-4">{event.contact.whatsapp}</a></dd></div>
                )}
                <div><dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Partnerships</dt><dd><a href={`mailto:${event.contact.partnershipsEmail}`} className="font-semibold text-navy-700 underline underline-offset-4">{event.contact.partnershipsEmail}</a></dd></div>
                <div><dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Location</dt><dd>{event.city}, {event.country}</dd></div>
              </dl>
            </div>
            {event.contact.social.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-bold">Follow us</h2>
                <ul className="mt-3 space-y-2">{event.contact.social.map((s) => <li key={s.url}><ExternalLink href={s.url} className="font-semibold text-navy-700 underline underline-offset-4">{s.label}</ExternalLink></li>)}</ul>
              </div>
            )}
            <div className="card p-6">
              <h2 className="text-lg font-bold">Quick links</h2>
              <ul className="mt-3 space-y-2">
                <li><Link href="/register" className="font-semibold text-navy-700 underline underline-offset-4">Team registration</Link></li>
                <li><Link href="/partners#enquire" className="font-semibold text-navy-700 underline underline-offset-4">Partnership enquiries</Link></li>
                <li><Link href="/faq" className="font-semibold text-navy-700 underline underline-offset-4">FAQs</Link></li>
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-bold">International rules questions</h2>
              <p className="mt-1 text-muted">Questions about the official MRC rules can also be addressed to H.E.R.O. via <ExternalLink href={event.organisers.international.mrcUrl} className="font-semibold text-navy-700 underline underline-offset-4">he-ro.gr</ExternalLink>.</p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <EnquiryForm kind="contact" fallbackEmail={event.contact.email} />
          </div>
        </div>
      </Section>
    </>
  );
}
