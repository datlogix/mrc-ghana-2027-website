import Image from "next/image";
import type { PostCover as Cover } from "@/lib/blog";
import { CategoryImage } from "./CategoryImage";
import heroImage from "../../public/images/hero-robotics-lab.jpg";

/** Cover image for a blog post: the site hero photo or an official sport tile. */
export function PostCover({ cover, sizes, priority = false, className = "" }: { cover: Cover; sizes: string; priority?: boolean; className?: string }) {
  if (!cover) {
    return (
      <div className={`flex aspect-[16/9] items-end bg-navy-band p-5 ${className}`} aria-hidden>
        <span className="brand-stripe w-24" />
      </div>
    );
  }
  if (cover.kind === "hero") {
    return (
      <Image src={heroImage} alt="" sizes={sizes} priority={priority} placeholder="blur" className={`aspect-[16/9] h-auto w-full object-cover ${className}`} />
    );
  }
  return (
    <div className={`flex aspect-[16/9] items-center justify-center bg-ink ${className}`}>
      <div className="h-full">
        <CategoryImage slug={cover.slug} name="" decorative sizes={sizes} priority={priority} className="!h-full !w-auto" />
      </div>
    </div>
  );
}
