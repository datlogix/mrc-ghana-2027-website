import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { event, siteUrl } from "@/config/event";
import { eventJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
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
};

export const viewport: Viewport = {
  themeColor: "#070f22",
  width: "device-width",
  initialScale: 1,
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${manrope.variable}`}>
      <body>
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
