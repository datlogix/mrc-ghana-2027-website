import Image, { type StaticImageData } from "next/image";
import saveTheDate from "../../public/images/announcements/mrc-ghana-2027-save-the-date.jpg";
import categoriesFlyer from "../../public/images/announcements/mrc-ghana-2027-categories.jpg";
import callForPartnership from "../../public/images/announcements/mrc-ghana-2027-call-for-partnership.jpg";
import { asset } from "@/lib/asset";
import { DownloadIcon } from "./ui";

/** Official MRC Ghana 2027 announcement flyers (supplied by the organiser, 15 Oct 2026). */
export const flyers = {
  "save-the-date": {
    image: saveTheDate,
    file: "/images/announcements/mrc-ghana-2027-save-the-date.jpg",
    title: "Save the date",
    alt: "Save the date flyer: MRC Ghana, Minoan RoboSports Competition, January 29–30, 2027. The MakersPlace and the Hellenic Educational Robotics Organization. Contact +233 249 391 817, +233 556 310 034, partnerships@makersplacegh.com, www.mrcghana.com.",
  },
  categories: {
    image: categoriesFlyer,
    file: "/images/announcements/mrc-ghana-2027-categories.jpg",
    title: "Competition categories",
    alt: "MRC Ghana flyer: Accra, January 29th–30th 2027. Categories: 1. MRC Drones, 2. Drone Soccer 3x3, 3. MRC Marathon, 4. MRC Football 3x3, 5. MRC Archery, 6. MRC Exhibition, 7. MRC Shooting. Contact +233 249 391 817, +233 556 310 034, partnerships@makersplacegh.com.",
  },
  "call-for-partnership": {
    image: callForPartnership,
    file: "/images/announcements/mrc-ghana-2027-call-for-partnership.jpg",
    title: "Call for partnership",
    alt: "Call for partnership flyer: Partner with us for an exciting robotics competition in Accra. Let's empower young innovators, promote STEM education and inspire the next generation of tech leaders. Contact +233 249 391 817, +233 556 310 034, partnerships@makersplacegh.com. Logos of MRC Global Olympiad, The MakersPlace and the Hellenic Educational Robotics Organization.",
  },
} satisfies Record<string, { image: StaticImageData; file: string; title: string; alt: string }>;

export type FlyerId = keyof typeof flyers;

export function Flyer({ id, sizes = "(min-width: 1024px) 420px, 90vw", priority = false, download = true, className = "" }: { id: FlyerId; sizes?: string; priority?: boolean; download?: boolean; className?: string }) {
  const f = flyers[id];
  return (
    <figure className={className}>
      <a href={asset(f.file)} target="_blank" rel="noopener" className="block overflow-hidden rounded-[var(--radius-card)] shadow-[0_12px_36px_rgba(10,43,68,.16)] transition-transform hover:-translate-y-0.5">
        <Image src={f.image} alt={f.alt} sizes={sizes} priority={priority} placeholder="blur" className="h-auto w-full" />
        <span className="sr-only"> (opens the full-size flyer)</span>
      </a>
      {download && (
        <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-navy-950">{f.title} flyer</span>
          <a href={asset(f.file)} download className="inline-flex items-center gap-1.5 font-semibold text-green-700 underline underline-offset-4">
            <DownloadIcon /> Download
          </a>
        </figcaption>
      )}
    </figure>
  );
}
