import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { event, siteUrl } from "@/config/event";
import { eventJsonLd } from "@/lib/seo";
import { isStaging, isStaticPreview } from "@/lib/asset";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap", weight: ["400", "500", "600", "700"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${event.shortName} | ${event.tagline}`, template: `%s | ${event.shortName}` },
  description: `${event.name}: ${event.dates.display}, ${event.city}, ${event.country}. Seven robot sports, organised in Ghana by ${event.organisers.ghana.name}.`,
  applicationName: event.shortName,
  authors: [{ name: event.organisers.ghana.name, url: event.organisers.ghana.url }],
  openGraph: { siteName: event.shortName, locale: "en_GH", type: "website" },
  twitter: { card: "summary_large_image" },
  verification: { google: "aeYWF4Wfi0rg5uo7gz-FIVtmJDUC1SApqrb_WYHCjMA" },
  formatDetection: { telephone: false },
  ...(isStaticPreview || isStaging ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a2b44",
  width: "device-width",
  initialScale: 1,
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        {(isStaticPreview || isStaging) && (
          <p className="bg-gold-soft px-4 py-2 text-center text-sm font-medium text-navy-950">
            {isStaticPreview
              ? "Test preview for review — not the live mrcghana.com. Online forms are switched off."
              : "Staging site for review — not the live mrcghana.com."}
          </p>
        )}
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd()) }} />
        {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </body>
    </html>
  );
}
