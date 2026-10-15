/**
 * Prefix for files in /public when the site is served under a sub-path
 * (only the static test preview on GitHub Pages sets NEXT_PUBLIC_BASE_PATH).
 * next/link and statically imported images handle this automatically; raw
 * <a href> / <img src> to public files must use asset().
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

/** True for the static test preview build (no server: forms disabled, noindex, banner). */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

/** Staging deployment (e.g. *.vercel.app before go-live): banner + noindex, forms still work. */
export const isStaging = process.env.NEXT_PUBLIC_SITE_STAGE === "staging";
