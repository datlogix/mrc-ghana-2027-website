import Image, { type StaticImageData } from "next/image";
import type { CategorySlug } from "@/data/categories";
import drones from "../../public/images/categories/drones.png";
import droneSoccer from "../../public/images/categories/drone-soccer.png";
import marathon from "../../public/images/categories/marathon.png";
import football from "../../public/images/categories/football.png";
import shooting from "../../public/images/categories/shooting.png";
import archery from "../../public/images/categories/archery.png";
import exhibition from "../../public/images/categories/exhibition.png";

/**
 * Official MRC sport tiles from H.E.R.O. (https://www.he-ro.gr/minoan-robotsports-competition).
 * Images © H.E.R.O. — use is subject to H.E.R.O.'s permission (see docs/SOURCE_VERIFICATION.md).
 */
const images: Record<CategorySlug, StaticImageData> = {
  drones,
  "drone-soccer": droneSoccer,
  marathon,
  football,
  shooting,
  archery,
  exhibition,
};

export function CategoryImage({
  slug,
  name,
  sizes,
  className = "",
  decorative = false,
  priority = false,
}: {
  slug: CategorySlug;
  name: string;
  sizes: string;
  className?: string;
  /** Use when the sport name is already shown next to the image. */
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={images[slug]}
      alt={decorative ? "" : `Official MRC ${name} sport tile`}
      sizes={sizes}
      placeholder="blur"
      priority={priority}
      className={`aspect-square h-auto w-full object-cover ${className}`}
    />
  );
}
