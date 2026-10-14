/** Typographic wordmark in the registration app's style. Replace with the approved official logo when available. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-navy-950" : "text-white";
  return (
    <span className="whitespace-nowrap leading-none">
      <span className={`block font-display text-[1.45rem] font-extrabold tracking-[-0.02em] ${main}`}>
        MRC <span className="text-green-700">Ghana</span>
      </span>
      <span className={`mt-1.5 flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.3em] ${main}`}>
        2027
        <span className="flex h-[5px] w-4" aria-hidden>
          <span className="flex-1 bg-green-700" />
          <span className="flex-1 bg-gold-500" />
        </span>
      </span>
    </span>
  );
}
