import Link from "next/link";
import { event } from "@/config/event";
import { Notice, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy and Data Protection",
  description: "How the MRC Ghana 2027 website handles personal data, cookies, photography consent and website terms.",
  path: "/privacy",
});

const updated = "14 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Policies" title="Privacy & data protection." intro={`Last updated ${updated}.`} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-12 text-[1.05rem]">
          <Notice tone="pending" title="Draft for organiser and legal review">
            This content is provided for review by the organisers and their legal adviser before final publication. It is written with Ghana&apos;s Data Protection Act, 2012 (Act 843) in mind.
          </Notice>

          <section aria-labelledby="who" className="space-y-3">
            <h2 id="who" className="text-2xl font-bold">Who we are</h2>
            <p>This website is operated by {event.organisers.ghana.name} ({event.city}, {event.country}) for {event.name}. Contact: <a href={`mailto:${event.contact.email}`} className="font-semibold text-navy-700 underline">{event.contact.email}</a>.</p>
          </section>

          <section aria-labelledby="collect" className="space-y-3">
            <h2 id="collect" className="text-2xl font-bold">What this website collects</h2>
            <div className="prose-mrc"><ul>
              <li><strong>Enquiry forms</strong> (contact and partnership): the name, organisation, email, telephone and message you choose to send. We use these only to respond to your enquiry and keep a record of our correspondence.</li>
              <li><strong>Technical data</strong>: our hosting provider processes standard server logs (such as IP address and browser type) for security and reliability.</li>
              <li><strong>Analytics</strong>: if enabled, we use privacy-friendly, cookie-free analytics that do not identify individual visitors.</li>
            </ul></div>
            <p>The public enquiry forms are not intended for children&apos;s personal information. Please do not include it.</p>
          </section>

          <section aria-labelledby="reg" className="space-y-3">
            <h2 id="reg" className="text-2xl font-bold">Team registration</h2>
            <p>Team and participant registration takes place in the separate official MRC Ghana 2027 registration application, which has its own privacy notice. Participant information, including any information about children, is collected and stored only within that authorised system.</p>
          </section>

          <section aria-labelledby="share" className="space-y-3">
            <h2 id="share" className="text-2xl font-bold">Sharing and retention</h2>
            <p>We do not sell personal data. Enquiries are delivered to the organisers through a secure email or form service. Where needed to run the competition, limited information may be shared with the international organiser, H.E.R.O. We keep enquiry records only as long as necessary for the purpose they were collected.</p>
          </section>

          <section aria-labelledby="rights" className="space-y-3">
            <h2 id="rights" className="text-2xl font-bold">Your rights</h2>
            <p>You may ask to access, correct or delete the personal data we hold about you, or object to its use, by emailing <a href={`mailto:${event.contact.email}`} className="font-semibold text-navy-700 underline">{event.contact.email}</a>. You may also contact Ghana&apos;s Data Protection Commission.</p>
          </section>

          <section aria-labelledby="cookies" className="space-y-3">
            <h2 id="cookies" className="text-2xl font-bold">Cookies</h2>
            <p>This website does not set advertising or tracking cookies. YouTube videos use the privacy-enhanced (youtube-nocookie.com) player and load only after you press play; YouTube&apos;s own policies then apply. If spam protection is enabled, Cloudflare Turnstile may process limited technical data to tell people and bots apart.</p>
          </section>

          <section aria-labelledby="photo" className="space-y-3">
            <h2 id="photo" className="text-2xl font-bold">Photography & filming consent</h2>
            <p>Photographs and video may be taken at MRC events. We publish images of identifiable young people only where appropriate consent has been recorded, and we credit photographers where possible. To request removal of an image, email us with the page address and a description of the image.</p>
          </section>

          <section id="terms" aria-labelledby="terms-h" className="scroll-mt-28 space-y-3">
            <h2 id="terms-h" className="text-2xl font-bold">Website terms</h2>
            <p>Information on this website is provided in good faith. Competition summaries are simplified guides; the current official H.E.R.O. rules always take precedence. Dates, venue and arrangements may change, and updates will be published here. Names and logos of other organisations belong to their owners. Content may not be reproduced for commercial purposes without permission.</p>
          </section>

          <p className="text-muted">Questions about this notice? <Link href="/contact" className="font-semibold text-navy-700 underline">Contact us</Link>.</p>
        </div>
      </Section>
    </>
  );
}
