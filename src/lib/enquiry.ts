import { z } from "zod";
import { budgetRanges, partnershipTypes } from "@/data/partners";

const text = (max: number, required = "This field is required.") =>
  z.string({ required_error: required, invalid_type_error: required }).trim().max(max);

/** Minimum time (ms) between rendering the form and submitting — basic bot trap. */
export const MIN_FILL_MS = 2500;

const common = {
  name: text(120, "Please enter your name.").min(2, "Please enter your name."),
  email: z.string({ required_error: "Please enter a valid email address." }).trim().email("Please enter a valid email address.").max(200),
  phone: text(40).regex(/^[+()\d\s-]*$/, "Please enter a valid telephone number.").optional().or(z.literal("")),
  message: text(4000, "Please write a short message (at least 10 characters).").min(10, "Please write a short message (at least 10 characters)."),
  consent: z.literal("yes", { errorMap: () => ({ message: "Please confirm you have read the privacy notice." }) }),
  // Anti-spam fields
  website: z.string().max(0).optional().or(z.literal("")), // honeypot: must stay empty
  startedAt: z.coerce.number(),
  turnstileToken: z.string().optional(),
};

export const partnerSchema = z.object({
  kind: z.literal("partner"),
  organisation: text(200, "Please enter the organisation or individual name.").min(2, "Please enter the organisation or individual name."),
  partnershipType: z.enum(partnershipTypes, { errorMap: () => ({ message: "Please choose a partnership type." }) }),
  interest: text(200, "Please choose an area of interest.").min(2, "Please choose an area of interest."),
  budget: z.enum(budgetRanges).optional().or(z.literal("")),
  wantsProspectus: z.enum(["yes", "no"]).optional(),
  ...common,
});

export const contactSchema = z.object({
  kind: z.literal("contact"),
  topic: z.enum(["General enquiry", "Schools & teams", "Media", "Volunteering", "Website feedback"]),
  ...common,
});

export const enquirySchema = z.discriminatedUnion("kind", [partnerSchema, contactSchema]);
export type Enquiry = z.infer<typeof enquirySchema>;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function enquiryFields(e: Enquiry): [string, string][] {
  const rows: [string, string][] =
    e.kind === "partner"
      ? [
          ["Organisation / individual", e.organisation],
          ["Contact person", e.name],
          ["Email", e.email],
          ["Telephone", e.phone || "—"],
          ["Partnership type", e.partnershipType],
          ["Area of interest", e.interest],
          ["Budget range", e.budget || "Not given"],
          ["Requests prospectus", e.wantsProspectus === "yes" ? "Yes" : "No"],
        ]
      : [
          ["Name", e.name],
          ["Email", e.email],
          ["Telephone", e.phone || "—"],
          ["Topic", e.topic],
        ];
  rows.push(["Message", e.message]);
  return rows;
}

export function enquiryEmail(e: Enquiry) {
  const subject =
    e.kind === "partner"
      ? `[MRC Ghana 2027] Partnership enquiry — ${e.organisation}`
      : `[MRC Ghana 2027] ${e.topic} — ${e.name}`;
  const rows = enquiryFields(e);
  const html = `<h2 style="font-family:sans-serif">${esc(subject)}</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:6px 12px;border-bottom:1px solid #ddd">${esc(k)}</th><td style="padding:6px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table><p style="font-family:sans-serif;color:#666;font-size:12px">Sent from the mrcghana.com enquiry form. The sender consented to the privacy notice.</p>`;
  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject, html, text: textBody };
}

/** Deliver via Resend (preferred) or a webhook. Returns false if no delivery method is configured. */
export async function deliverEnquiry(e: Enquiry): Promise<"sent" | "not-configured"> {
  const { subject, html, text: textBody } = enquiryEmail(e);
  const to = (process.env.ENQUIRY_TO_EMAIL || "").split(",").map((s) => s.trim()).filter(Boolean);

  if (process.env.RESEND_API_KEY && to.length) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || "MRC Ghana Website <no-reply@mrcghana.com>",
        to,
        reply_to: e.email,
        subject,
        html,
        text: textBody,
      }),
    });
    if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
    return "sent";
  }

  if (process.env.FORM_WEBHOOK_URL) {
    const fields = Object.fromEntries(enquiryFields(e));
    const res = await fetch(process.env.FORM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, kind: e.kind, fields, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return "sent";
  }

  return "not-configured";
}

export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // optional layer
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
