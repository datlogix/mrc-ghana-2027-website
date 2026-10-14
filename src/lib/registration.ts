import { event } from "@/config/event";
import type { CategorySlug } from "@/data/categories";

/**
 * Builds the link to the EXISTING Lovable registration application.
 * Category pre-selection is only appended when `event.registration.categoryParam`
 * has been confirmed to work in the Lovable app.
 */
export function registrationHref(category?: CategorySlug): string {
  const base = event.registration.url;
  if (!base) return "/register";
  if (!category || !event.registration.categoryParam) return base;
  try {
    const u = new URL(base);
    u.searchParams.set(event.registration.categoryParam, category);
    return u.toString();
  } catch {
    return base;
  }
}

export const registrationConfigured = () => Boolean(event.registration.url);

/** Where "Register a Team" buttons point: the branded /register landing page. */
export const registerLanding = (category?: CategorySlug) =>
  category ? `/register?category=${category}` : "/register";
