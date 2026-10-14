"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import { event } from "@/config/event";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "All seven categories", href: "/categories" },
      ...categories.map((c) => ({ label: c.name, href: `/categories/${c.slug}`, note: c.strapline })),
    ],
  },
  {
    label: "Participate",
    href: "/participate",
    children: [
      { label: "How to participate", href: "/participate" },
      { label: "Programme & venue", href: "/programme" },
      { label: "Global Olympiad pathway", href: "/global-finals" },
      { label: "Resources & downloads", href: "/resources" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Videos & past events", href: "/media" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return item.children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/")) ?? false;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }
        setOpenMenu(null);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || mobileOpen ? "shadow-[0_6px_24px_rgba(10,43,68,.08)]" : ""
      }`}
    >
      <div className="brand-stripe" aria-hidden />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] btn btn-gold">
        Skip to main content
      </a>
      <div className="container-x flex h-[5.25rem] items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${event.shortName} — home`}>
          <Logo />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(pathname, item);
              const base = `relative inline-flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium text-navy-950 transition-colors hover:text-green-700 after:absolute after:inset-x-3 after:-bottom-1.5 after:h-0.5 after:bg-green-700 after:transition-opacity ${
                active ? "after:opacity-100" : "after:opacity-0"
              }`;
              if (!item.children)
                return (
                  <li key={item.label}>
                    <Link href={item.href} className={base} aria-current={pathname === item.href ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              const open = openMenu === item.label;
              const id = `menu-${item.label.toLowerCase()}`;
              return (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    className={base}
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setOpenMenu(open ? null : item.label)}
                  >
                    {item.label}
                    <Chevron open={open} />
                  </button>
                  <div
                    id={id}
                    hidden={!open}
                    className="absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[var(--radius-card)] border border-line bg-white p-2 shadow-[0_16px_40px_rgba(10,43,68,.14)]"
                  >
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block rounded-md px-3.5 py-2.5 transition-colors hover:bg-mist ${
                              pathname === c.href ? "text-green-700" : "text-navy-950"
                            }`}
                            aria-current={pathname === c.href ? "page" : undefined}
                          >
                            <span className="block font-medium">{c.label}</span>
                            {c.note && <span className="block text-sm text-muted">{c.note}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link href="/register" className="btn btn-gold !min-h-11 !px-4 sm:!px-5 text-[0.95rem]">
            <span className="sm:hidden">Register</span>
            <span className="hidden sm:inline">Register a Team</span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-950 hover:bg-mist"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="xl:hidden fixed inset-x-0 top-[calc(5.25rem+4px)] bottom-0 overflow-y-auto bg-white border-t border-line"
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group" open={isActive(pathname, item)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 text-lg font-semibold text-navy-950 hover:bg-mist">
                      {item.label}
                      <span className="text-muted group-open:rotate-180 transition-transform"><Chevron open={false} /></span>
                    </summary>
                    <ul className="mb-2 ml-3 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block rounded-md px-3 py-2.5 ${pathname === c.href ? "text-green-700" : "text-body"} hover:bg-mist`}
                            aria-current={pathname === c.href ? "page" : undefined}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-3 text-lg font-semibold ${pathname === item.href ? "text-green-700" : "text-navy-950"} hover:bg-mist`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/register" className="btn btn-gold w-full">Register a Team</Link>
            <Link href="/partners" className="btn btn-outline w-full">Become a Partner</Link>
          </div>
          <p className="mt-8 text-sm text-muted">
            {event.dates.display} · {event.city}, {event.country}
          </p>
        </nav>
      </div>
    </header>
  );
}
