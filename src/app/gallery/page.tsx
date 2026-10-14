import Link from "next/link";
import { publishedGallery } from "@/data/gallery";
import { Gallery } from "@/components/Gallery";
import { CategoryIcon } from "@/components/CategoryIcon";
import { categories } from "@/data/categories";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photographs from MRC international competitions and MRC Ghana 2027, published with the appropriate permissions.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        eyebrow="Gallery"
        title="Moments from the arena."
        intro="Authorised photographs from MRC competitions. Every image is labelled with its real event, year and location."
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
              {categories.map((c, i) => (
                <li key={c.slug} className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-5 ${i % 3 === 0 ? "bg-navy-950 text-white" : "bg-mist text-navy-950"} ${i === 0 ? "md:col-span-2 md:aspect-auto" : ""}`}>
                  <CategoryIcon slug={c.slug} className={`h-12 w-12 ${i % 3 === 0 ? "text-gold-400" : "text-green-700"}`} />
                  <div>
                    <p className="font-display text-lg font-bold">{c.name}</p>
                    <p className={`text-sm ${i % 3 === 0 ? "text-slate-400" : "text-muted"}`}>Collection coming soon</p>
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
