"use client";

import { useSearchParams } from "next/navigation";
import { categories, type CategorySlug } from "@/data/categories";
import { event } from "@/config/event";
import { registrationHref } from "@/lib/registration";
import { ArrowIcon } from "./ui";

/** Reads ?category= from the landing URL and links to the existing Lovable registration app. */
export function RegisterLauncher() {
  const params = useSearchParams();
  const slug = params.get("category");
  const cat = categories.find((c) => c.slug === slug);
  const configured = Boolean(event.registration.url);
  const href = registrationHref(cat?.slug as CategorySlug | undefined);

  if (!configured || event.registration.status !== "open") {
    return (
      <div className="card p-7">
        <p className="font-display text-xl font-bold text-navy-950">
          {event.registration.status === "closed" ? "Registration is now closed." : "The registration link is being finalised."}
        </p>
        <p className="mt-2 text-muted">
          Please check back shortly, or email{" "}
          <a href={`mailto:${event.contact.email}?subject=${encodeURIComponent("MRC Ghana 2027 registration")}`} className="font-semibold text-navy-700 underline underline-offset-4">
            {event.contact.email}
          </a>{" "}
          and we will send you the registration link.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-7">
      {cat && (
        <p className="mb-4 rounded-xl bg-mist px-4 py-3">
          You chose <strong className="text-navy-950">{cat.name}</strong>.
          {event.registration.categoryParam ? " It will be pre-selected in the form." : " Select it in the registration form."}
        </p>
      )}
      <a href={href} className="btn btn-gold w-full sm:w-auto" rel="noopener">
        Continue to registration <ArrowIcon />
      </a>
      <p className="mt-4 text-sm text-muted">
        You will be taken to the official MRC Ghana 2027 registration application ({new URL(event.registration.url).host}). Your team information is stored there, not on this website.
      </p>
    </div>
  );
}
