import type { CategorySlug } from "@/data/categories";

/** Original line illustrations for each sport (no third-party marks). */
export function CategoryIcon({ slug, className = "h-10 w-10" }: { slug: CategorySlug; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (slug) {
    case "drones":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" /><circle cx="37" cy="11" r="6" />
          <circle cx="11" cy="37" r="6" /><circle cx="37" cy="37" r="6" />
          <path d="M15.5 15.5 20 20M32.5 15.5 28 20M15.5 32.5 20 28M32.5 32.5 28 28" />
          <rect x="19" y="19" width="10" height="10" rx="3" />
        </svg>
      );
    case "drone-soccer":
      return (
        <svg {...common}>
          <circle cx="17" cy="27" r="11" />
          <path d="M6 27h22M17 16c-4 3.5-4 18.5 0 22M17 16c4 3.5 4 18.5 0 22" />
          <circle cx="38" cy="15" r="7" />
          <path d="M38 22v20" />
        </svg>
      );
    case "marathon":
      return (
        <svg {...common}>
          <path d="M4 38c8 0 8-14 16-14s8 10 16 10 8-12 8-12" strokeDasharray="0" />
          <rect x="16" y="10" width="14" height="9" rx="2.5" />
          <circle cx="19" cy="21" r="2" /><circle cx="27" cy="21" r="2" />
          <path d="M30 13h4" />
        </svg>
      );
    case "football":
      return (
        <svg {...common}>
          <circle cx="18" cy="28" r="10" />
          <path d="m18 22 4 3-1.5 5h-5L14 25z" />
          <path d="M32 12h12v24H32" />
          <path d="M38 12v24" opacity=".5" />
        </svg>
      );
    case "shooting":
      return (
        <svg {...common}>
          <circle cx="28" cy="24" r="14" /><circle cx="28" cy="24" r="8.5" /><circle cx="28" cy="24" r="3" />
          <path d="M3 24h13" /><path d="m12 20 4 4-4 4" />
        </svg>
      );
    case "archery":
      return (
        <svg {...common}>
          <path d="M12 6c10 6 10 30 0 36" />
          <path d="M12 6v36" opacity=".55" />
          <path d="M8 24h34" /><path d="m36 19 6 5-6 5" />
          <path d="M8 21v6" />
        </svg>
      );
    case "exhibition":
      return (
        <svg {...common}>
          <rect x="7" y="7" width="34" height="22" rx="2.5" />
          <path d="M24 29v6M16 42l8-7 8 7" />
          <path d="M14 22l6-6 5 4 9-8" />
        </svg>
      );
  }
}

/** Soft tinted tile colour for each category (cycles green · gold · blue, as on the registration app). */
export const tileClass = (index: number) => ["tile-green", "tile-gold", "tile-blue"][index % 3];
