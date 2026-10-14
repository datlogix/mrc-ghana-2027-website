"use client";

import { useEffect, useState } from "react";
import { eventEndUtc, eventStartUtc, event } from "@/config/event";

/** Countdown to the Ghana event (GMT). Switches to event-day and post-event messaging automatically. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (now === null) {
    return <p className="text-slate-300">{event.dates.display} · Ghana time (GMT)</p>;
  }

  if (now >= eventEndUtc) {
    return <p className="text-lg font-semibold text-white">Thank you to every team, coach and supporter of {event.shortName}.</p>;
  }
  if (now >= eventStartUtc) {
    return <p className="text-lg font-semibold text-gold-300">{event.shortName} is happening now in {event.city}.</p>;
  }

  const diff = eventStartUtc - now;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);

  return (
    <div role="timer" aria-live="off" aria-label={`${days} days, ${hours} hours and ${mins} minutes until ${event.shortName}`}>
      <dl className="flex gap-3">
        {[
          ["Days", days],
          ["Hours", hours],
          ["Minutes", mins],
        ].map(([label, v]) => (
          <div key={label as string} className="flex min-w-[4.75rem] flex-col-reverse rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-center">
            <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</dt>
            <dd className="font-display text-3xl font-extrabold tabular-nums text-white">{String(v).padStart(2, "0")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
