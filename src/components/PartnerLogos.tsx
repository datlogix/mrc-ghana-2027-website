import Image from "next/image";
import { approvedPartners } from "@/data/partners";
import { asset, isStaticPreview } from "@/lib/asset";

/** Logo wall for approved organisers and partners (hidden when there are none). */
export function PartnerLogos({ className = "" }: { className?: string }) {
  if (approvedPartners.length === 0) return null;
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {approvedPartners.map((p) => {
        const tile = (
          <span
            className={`flex h-36 items-center justify-center rounded-[var(--radius-card)] border p-5 ${
              p.background === "dark" ? "border-ink bg-black" : "border-line bg-white"
            }`}
          >
            <Image
              src={asset(p.logo)}
              alt={p.name}
              width={p.width}
              height={p.height}
              unoptimized={isStaticPreview}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
              className="h-full max-h-28 w-auto object-contain"
            />
          </span>
        );
        return (
          <li key={p.name}>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-90">
                {tile}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              tile
            )}
            <p className="mt-2 text-center text-sm font-semibold text-muted">{p.role}</p>
          </li>
        );
      })}
    </ul>
  );
}
