/** Chat hand-off helpers. Safe to import in client components (no server-only imports). */
import { event } from "@/config/event";

/** The assistant ends a reply with this when a person should take over; the chat UI shows a WhatsApp button. */
export const HANDOFF_TOKEN = "[[WHATSAPP]]";

/** wa.me link to the organisers' WhatsApp, with the visitor's question pre-typed (they can edit it before sending). */
export function whatsappUrl(question?: string) {
  const number = event.contact.whatsapp?.replace(/[^\d]/g, "");
  if (!number) return null;
  const text = `Hello MRC Ghana team, I have a question from the website chat${question ? `: ${question.slice(0, 500)}` : "."}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
