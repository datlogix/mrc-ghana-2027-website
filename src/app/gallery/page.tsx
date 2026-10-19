import Link from "next/link";
import { publishedGallery } from "@/data/gallery";
import { Gallery } from "@/components/Gallery";
import { CategoryImage } from "@/components/CategoryImage";
import { categories } from "@/data/categories";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photo Gallery",
  description: "Photos from the MRC Global Olympiad in Crete, where Team Ghana took part in 2025: the parade of nations, robot racing, drones, Football 3×3 and the trophies.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        eyebrow="Gallery"
        title="Moments from the arena."
        intro="Photographs from MRC competitions, including Team Ghana at the 2025 Global Olympiad in Crete. Every image is labelled with its real event, year and location."
      />
      <Section>
        {publishedGallery.length > 0 ? (
          <Gallery images={publishedGallery} />
        ) : (
          <div>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-extrabold">Our photo library is being curated.</h2>
              <p className="mt-4 text-lg text-muted">
                We publish only genuine competition photographs with the photographer&apos;s permission and, where young people can be identified, the appropriate consent. Approved images will appear here soon.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/media" className="btn btn-navy">Watch competition videos</Link>
                <Link href="/contact" className="btn btn-outline">Share authorised photos</Link>
              </div>
            </div>
            <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Gallery collections coming soon">
              {categories.map((c) => (
                <li key={c.slug} className="card overflow-hidden">
                  <CategoryImage slug={c.slug} name={c.name} decorative sizes="(min-width: 768px) 25vw, 50vw" className="opacity-90" />
                  <div className="p-4">
                    <p className="font-display text-lg font-bold text-navy-950">{c.name}</p>
                    <p className="text-sm text-muted">Collection coming soon</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
