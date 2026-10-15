import { event } from "@/config/event";
import { approvedPartners, partnershipAreas } from "@/data/partners";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero, Section, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { PartnerLogos } from "@/components/PartnerLogos";
import { Flyer } from "@/components/Flyer";

export const metadata = pageMetadata({
  title: "Partnerships and Sponsorship",
  description: "Partner with MRC Ghana 2027 to build Ghana's next generation of innovators through robotics, engineering and digital skills.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Partners", path: "/partners" }]}
        eyebrow="Partnerships & sponsorship"
        title="Partner With Us to Build Ghana's Next Generation of Innovators"
        intro="MRC Ghana 2027 gives young people hands-on experience in robotics, engineering and digital skills — and a route to international competition. Partners make that possible."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#enquire" className="btn btn-gold">Become a Sponsor</a>
          <a href="#opportunities" className="btn btn-outline">Explore Partnership Opportunities</a>
          <a href="#enquire" className="btn btn-outline">Request the Sponsorship Prospectus</a>
        </div>
      </PageHero>

      <Section className="bg-mist" labelledBy="call-title">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <Flyer id="call-for-partnership" priority className="mx-auto w-full max-w-sm lg:max-w-none" />
          <div>
            <SectionHeading
              id="call-title"
              eyebrow="Announcement"
              title="Call for partnership"
              intro="Partner with us for an exciting robotics competition in Accra. Together, let's empower young innovators, promote STEM education and inspire the next generation of tech leaders."
            />
            <p className="mt-6 text-lg font-semibold text-navy-950">Interested in partnering with us? Get in touch today.</p>
            <ul className="mt-4 space-y-2 text-lg">
              {event.contact.phones.map((p) => (
                <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold text-navy-700 underline underline-offset-4">{p}</a></li>
              ))}
              <li><a href={`mailto:${event.contact.partnershipsEmail}`} className="font-semibold text-navy-700 underline underline-offset-4">{event.contact.partnershipsEmail}</a></li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className="btn btn-gold">Send a partnership enquiry</a>
              <a href="#opportunities" className="btn btn-outline">See partnership areas</a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="opportunities" labelledBy="opp-title">
        <SectionHeading id="opp-title" eyebrow="Where you can help" title="Partnership opportunity areas" intro="Every partnership is shaped with you. These are the areas where support makes the greatest difference." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipAreas.map((a, i) => (
            <li key={a.title} className="card p-6">
              <span className="font-display text-sm font-extrabold tracking-[0.2em] text-green-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-[0.98rem] text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-mist" labelledBy="why-title">
        <div className="grid gap-10 lg:grid-cols-3">
          <SectionHeading id="why-title" eyebrow="Why partner" title="Visible impact, measurable skills." />
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {[
              ["Young talent", "Connect with students, coaches and schools building practical engineering and coding skills."],
              ["National visibility", "Be associated with a national robotics championship in Accra."],
              ["International connection", "Support a programme linked to the international MRC Global Olympiad."],
              ["Purposeful engagement", "Offer staff volunteering, mentoring and technical expertise."],
            ].map(([t, b]) => (
              <div key={t} className="card p-6"><h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-muted">{b}</p></div>
            ))}
          </div>
        </div>
      </Section>

      {approvedPartners.length > 0 && (
        <Section labelledBy="our-partners">
          <SectionHeading id="our-partners" eyebrow="Organisers & partners" title="Working together" />
          <PartnerLogos className="mt-10" />
        </Section>
      )}

      <Section id="enquire" labelledBy="enq-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHeading id="enq-title" eyebrow="Start a conversation" title="Partnership enquiry" intro="Tell us about your organisation and interests. We will reply with current partnership information and, on request, the sponsorship prospectus once available." />
            <dl className="mt-6 space-y-3">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Email</dt>
                <dd><a href={`mailto:${event.contact.partnershipsEmail}?subject=${encodeURIComponent("MRC Ghana 2027 partnership enquiry")}`} className="font-semibold text-navy-700 underline underline-offset-4">{event.contact.partnershipsEmail}</a></dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">Telephone</dt>
                {event.contact.phones.map((p) => (
                  <dd key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold text-navy-700 underline underline-offset-4">{p}</a></dd>
                ))}
              </div>
            </dl>
          </div>
          <EnquiryForm kind="partner" fallbackEmail={event.contact.partnershipsEmail} />
        </div>
      </Section>
    </>
  );
}
