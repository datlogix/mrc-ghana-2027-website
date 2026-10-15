import Image from "next/image";
import makersplace from "../../public/images/brand/makersplace.png";

/** Site logo: The MakersPlace logo (on white) with the MRC Ghana 2027 wordmark. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const h = size === "lg" ? "h-12" : "h-9 sm:h-10";
  return (
    <span className="flex items-center gap-3 whitespace-nowrap leading-none">
      <Image src={makersplace} alt="The MakersPlace" priority sizes="140px" className={`${h} w-auto`} />
      <span className="hidden h-8 w-px bg-line min-[400px]:block" aria-hidden />
      <span className="hidden min-[400px]:block">
        <span className="block font-display text-[1.05rem] font-extrabold tracking-[-0.01em] text-navy-950 sm:text-[1.2rem]">
          MRC <span className="text-green-700">Ghana</span>
        </span>
        <span className="mt-1 flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.3em] text-navy-950">
          2027
          <span className="flex h-[4px] w-4" aria-hidden>
            <span className="flex-1 bg-green-700" />
            <span className="flex-1 bg-gold-500" />
          </span>
        </span>
      </span>
    </span>
  );
}
