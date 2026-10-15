import type { Metadata } from "next";
import { event, siteUrl } from "@/config/event";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url || siteUrl },
    openGraph: {
      title: `${title} | ${event.shortName}`,
      description,
      url: url || siteUrl,
      siteName: event.shortName,
      locale: "en_GH",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${event.shortName}`, description },
  };
}

/** schema.org structured data for the Ghana event. Venue omitted until confirmed. */
export function eventJsonLd() {
  const location =
    event.venue.status === "confirmed" && event.venue.name
      ? {
          "@type": "Place",
          name: event.venue.name,
          address: { "@type": "PostalAddress", streetAddress: event.venue.address ?? undefined, addressLocality: event.city, addressCountry: "GH" },
        }
      : {
          "@type": "Place",
          name: `${event.city}, ${event.country} (venue to be announced)`,
          address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "Greater Accra", addressCountry: "GH" },
        };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organiser`,
        name: event.organisers.ghana.name,
        url: event.organisers.ghana.url,
        email: event.contact.email,
        telephone: event.contact.phones[0],
        contactPoint: [
          { "@type": "ContactPoint", contactType: "Partnerships", email: event.contact.partnershipsEmail, telephone: event.contact.phones, areaServed: "GH" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: event.shortName,
        publisher: { "@id": `${siteUrl}/#organiser` },
        inLanguage: "en",
      },
      {
        "@type": "SportsEvent",
        "@id": `${siteUrl}/#event`,
        name: event.name,
        description: event.description,
        startDate: event.dates.start,
        endDate: event.dates.end,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location,
        organizer: { "@id": `${siteUrl}/#organiser` },
        url: siteUrl,
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
