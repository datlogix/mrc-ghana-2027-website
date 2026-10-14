"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { budgetRanges, partnershipAreas, partnershipTypes } from "@/data/partners";

type Kind = "partner" | "contact";
type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string; fallback?: boolean };

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EnquiryForm({ kind, fallbackEmail, defaultProspectus = false }: { kind: Kind; fallbackEmail: string; defaultProspectus?: boolean }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    // Move focus to the result message, unless a specific field was focused for correction.
    if (status.state === "sent" || (status.state === "error" && Object.keys(errors).length === 0)) statusRef.current?.focus();
  }, [status.state, errors]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(fd.entries());
    data.kind = kind;
    data.startedAt = startedAt.current;
    data.consent = fd.get("consent") ? "yes" : "";
    if (kind === "partner") data.wantsProspectus = fd.get("wantsProspectus") ? "yes" : "no";
    const ts = fd.get("cf-turnstile-response");
    if (ts) data.turnstileToken = String(ts);

    setErrors({});
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; fieldErrors?: Record<string, string>; fallback?: boolean };
      if (json.ok) {
        setStatus({ state: "sent" });
        formRef.current?.reset();
      } else {
        setErrors(json.fieldErrors || {});
        setStatus({ state: "error", message: json.error || "Something went wrong.", fallback: json.fallback });
        const first = json.fieldErrors && Object.keys(json.fieldErrors)[0];
        if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Please check your connection or email us directly.", fallback: true });
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="field-error">{errors[name]}</p>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (status.state === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card p-8 text-center">
        <p className="font-display text-2xl font-bold text-navy-950">Thank you — your enquiry has been sent.</p>
        <p className="mt-3 text-muted">A member of the MRC Ghana 2027 team will reply to the email address you provided.</p>
        <button type="button" className="btn btn-outline mt-6" onClick={() => { startedAt.current = Date.now(); setStatus({ state: "idle" }); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card grid gap-6 p-6 sm:p-8">
      {kind === "partner" && (
        <>
          <div>
            <label htmlFor="organisation" className="field-label">Organisation or individual name *</label>
            <input id="organisation" name="organisation" className="field" required autoComplete="organization" {...aria("organisation")} />
            {err("organisation")}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="field-label">Contact person *</label>
              <input id="name" name="name" className="field" required autoComplete="name" {...aria("name")} />
              {err("name")}
            </div>
            <div>
              <label htmlFor="partnershipType" className="field-label">Type of partnership *</label>
              <select id="partnershipType" name="partnershipType" className="field" required defaultValue="" {...aria("partnershipType")}>
                <option value="" disabled>Choose one</option>
                {partnershipTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {err("partnershipType")}
            </div>
          </div>
        </>
      )}

      {kind === "contact" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">Your name *</label>
            <input id="name" name="name" className="field" required autoComplete="name" {...aria("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor="topic" className="field-label">Topic *</label>
            <select id="topic" name="topic" className="field" required defaultValue="General enquiry">
              {["General enquiry", "Schools & teams", "Media", "Volunteering", "Website feedback"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="field-label">{kind === "partner" ? "Professional email *" : "Email *"}</label>
          <input id="email" name="email" type="email" className="field" required autoComplete="email" {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">Telephone (optional)</label>
          <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" inputMode="tel" {...aria("phone")} />
          {err("phone")}
        </div>
      </div>

      {kind === "partner" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="interest" className="field-label">Area of interest *</label>
            <select id="interest" name="interest" className="field" required defaultValue="" {...aria("interest")}>
              <option value="" disabled>Choose one</option>
              {partnershipAreas.map((a) => <option key={a.title}>{a.title}</option>)}
              <option>Not sure yet — let&apos;s discuss</option>
            </select>
            {err("interest")}
          </div>
          <div>
            <label htmlFor="budget" className="field-label">Indicative budget (optional)</label>
            <select id="budget" name="budget" className="field" defaultValue="">
              <option value="">Choose one</option>
              {budgetRanges.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="field-label">Message *</label>
        <textarea id="message" name="message" rows={5} className="field" required {...aria("message")} />
        {err("message")}
        {kind === "contact" && (
          <p className="mt-2 text-sm text-muted">Please do not include children&apos;s personal details. Team and participant information is collected only through the official registration application.</p>
        )}
      </div>

      {/* Honeypot — hidden from people, tempting for bots */}
      <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3">
        {kind === "partner" && (
          <label className="flex items-start gap-3">
            <input type="checkbox" name="wantsProspectus" defaultChecked={defaultProspectus} className="mt-1.5 h-5 w-5 accent-[#0b1a36]" />
            <span>Please send me the sponsorship prospectus when it is available.</span>
          </label>
        )}
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" required className="mt-1.5 h-5 w-5 accent-[#0b1a36]" {...aria("consent")} />
          <span>
            I agree that MRC Ghana 2027 may use these details to respond to my enquiry, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-navy-700 underline underline-offset-4">privacy notice</Link>. *
          </span>
        </label>
        {err("consent")}
      </div>

      {TURNSTILE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} />
        </>
      )}

      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {status.state === "error" && (
          <div role="alert" className="rounded-md border border-[#b42318]/40 bg-[#fdf2f1] p-4 text-[#7a1a12]">
            <p className="font-semibold">{status.message}</p>
            {status.fallback && (
              <p className="mt-1">
                Email:{" "}
                <a className="font-semibold underline" href={`mailto:${fallbackEmail}?subject=${encodeURIComponent(kind === "partner" ? "MRC Ghana 2027 partnership enquiry" : "MRC Ghana 2027 enquiry")}`}>
                  {fallbackEmail}
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-navy" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : kind === "partner" ? "Send partnership enquiry" : "Send message"}
        </button>
        <p className="text-sm text-muted">* Required</p>
      </div>
    </form>
  );
}
