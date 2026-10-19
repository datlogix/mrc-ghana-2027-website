import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { assistantSystem, ASSISTANT_LIMITS } from "@/lib/assistant";
import { answerFromWebsite } from "@/lib/faq-match";
import { HANDOFF_TOKEN } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const maxDuration = 60;

// Best-effort in-memory rate limit (per server instance), like /api/enquiry.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 30;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(ASSISTANT_LIMITS.maxMessageChars),
      }),
    )
    .min(1)
    .max(ASSISTANT_LIMITS.maxMessages)
    .refine((m) => m[0].role === "user" && m[m.length - 1].role === "user", "Conversation must start and end with a visitor message."),
});

const plainHeaders = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" };
const errorText = (status: number, text: string) => new Response(text, { status, headers: plainHeaders });

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return errorText(403, "Invalid request origin.");

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return errorText(429, "You've asked a lot of questions in a short time. Please wait a few minutes and try again.");

  let parsed;
  try {
    parsed = chatSchema.safeParse(await req.json());
  } catch {
    return errorText(400, "Invalid request.");
  }
  if (!parsed.success) return errorText(400, "Please keep messages under 1,200 characters.");

  const latest = parsed.data.messages[parsed.data.messages.length - 1].content;

  // No Claude key set: answer from the website's own content, with no third-party service.
  if (!process.env.ANTHROPIC_API_KEY) {
    const { text, handoff } = answerFromWebsite(latest);
    return new Response(handoff ? `${text}\n${HANDOFF_TOKEN}` : text, { headers: plainHeaders });
  }

  // Claude key set: answers come from Claude Haiku 5.5, grounded in the site's content.
  const client = new Anthropic();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        // Claude Haiku 5.5 is fast and low-cost for site Q&A. It has no server-side refusal fallback,
        // so a decline is answered below with the WhatsApp hand-off.
        const stream = client.messages.stream({
          model: "claude-haiku-5-5",
          max_tokens: 4000,
          output_config: { effort: "low" },
          system: [{ type: "text", text: assistantSystem, cache_control: { type: "ephemeral" } }],
          messages: parsed.data.messages,
        });
        stream.on("text", (text) => controller.enqueue(encoder.encode(text)));
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode(`\n\nSorry, I can't help with that here. The MakersPlace team can help on WhatsApp.\n${HANDOFF_TOKEN}`));
        }
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
          controller.enqueue(encoder.encode("The assistant is busy right now. Please try again in a minute."));
        } else {
          console.error("[chat] request failed", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
          controller.enqueue(encoder.encode(`Sorry, something went wrong. Please try again, or contact the MakersPlace team.\n${HANDOFF_TOKEN}`));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, { headers: plainHeaders });
}
