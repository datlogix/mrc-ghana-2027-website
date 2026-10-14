/** Original typographic wordmark. Replace with the approved official logo when permission is confirmed. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="10" fill="#c9a24a" />
        <path d="M20 8.5l2.9 8.1h8.6l-6.9 5 2.6 8.2L20 24.8l-7.2 5 2.6-8.2-6.9-5h8.6z" fill="#070f22" />
      </svg>
      {!compact && (
        <span className="whitespace-nowrap leading-none">
          <span className="block font-display text-[1.05rem] font-extrabold tracking-[0.08em] text-white">MRC GHANA</span>
          <span className="mt-1 block text-[0.7rem] font-semibold tracking-[0.32em] text-gold-400">2027</span>
        </span>
      )}
    </span>
  );
}
