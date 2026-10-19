"use client";

import { useEffect, useRef, useState } from "react";
import { HANDOFF_TOKEN, whatsappUrl } from "@/lib/whatsapp";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "mrc-chat-v1";
const MAX_CHARS = 1200;
const SUGGESTIONS = ["When and where is MRC Ghana 2027?", "Which sport suits a new team?", "How do we register?", "What are the age rules?"];

/** Turns URLs in assistant text into links (site links open in the same tab). */
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+[^\s).,;:!?])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return <span key={i}>{part}</span>;
        const internal = /^https?:\/\/(www\.)?mrcghana\.com/.test(part);
        const href = internal ? part.replace(/^https?:\/\/(www\.)?mrcghana\.com/, "") || "/" : part;
        return (
          <a key={i} href={href} className="font-semibold text-green-700 underline underline-offset-2 break-words" {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
            {internal ? `mrcghana.com${href === "/" ? "" : href}` : part.replace(/^https?:\/\//, "")}
          </a>
        );
      })}
    </>
  );
}

function AssistantText({ text }: { text: string }) {
  const lines = text.trim().split("\n");
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
        if (bullet) return <p key={i} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold-500" /><span><Linkified text={bullet[1].replace(/\*\*/g, "")} /></span></p>;
        if (!line.trim()) return null;
        return <p key={i}><Linkified text={line.replace(/\*\*/g, "")} /></p>;
      })}
    </div>
  );
}

function WhatsAppButton({ question, compact = false }: { question?: string; compact?: boolean }) {
  const href = whatsappUrl(question);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={compact ? "inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline" : "mt-2 inline-flex items-center gap-2 rounded-lg bg-green-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-green-600"}>
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></svg>
      {compact ? "Talk to a person on WhatsApp" : "Ask the MakersPlace team on WhatsApp"}
    </a>
  );
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); launcherRef.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: question }];
    // Keep the request small: the last 15 turns, always starting with a visitor message.
    let trimmed = history.slice(-15);
    while (trimmed.length && trimmed[0].role !== "user") trimmed = trimmed.slice(1);
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: trimmed.map((m) => ({ role: m.role, content: m.content.replace(HANDOFF_TOKEN, "").trim() || "…" })) }),
      });
      if (!res.ok || !res.body) {
        const msg = (await res.text().catch(() => "")) || "Sorry, the assistant isn't available right now.";
        setMessages([...history, { role: "assistant", content: `${msg}\n${HANDOFF_TOKEN}` }]);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: `Sorry, the connection dropped. Please try again.\n${HANDOFF_TOKEN}` }]);
    } finally {
      setBusy(false);
    }
  }

  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.content;

  return (
    <>
      {!open && (
        <button ref={launcherRef} type="button" onClick={() => setOpen(true)}
          className="fixed z-50 inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-3 text-sm font-semibold text-white shadow-lg ring-2 ring-gold-500/70 hover:bg-navy-700"
          style={{ right: "max(16px, env(safe-area-inset-right, 0px))", bottom: "max(16px, env(safe-area-inset-bottom, 0px))" }}
          aria-haspopup="dialog">
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-gold-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12Z" /><path d="M8.5 10.5h7M8.5 14h4.5" /></svg>
          Ask a question
        </button>
      )}

      {open && (
        <div role="dialog" aria-modal="false" aria-labelledby="chat-title"
          className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl sm:inset-auto sm:bottom-4 sm:right-4 sm:h-[min(640px,calc(100vh-2rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-line"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <div className="flex items-start justify-between gap-3 border-b border-line bg-navy-950 px-4 py-3 text-white sm:rounded-t-2xl" style={{ paddingTop: "max(12px, env(safe-area-inset-top, 0px))" }}>
            <div>
              <p id="chat-title" className="font-display text-base font-bold">MRC Ghana assistant</p>
              <p className="text-xs text-gold-300">Answers come from this website. Check key details with the organisers.</p>
            </div>
            <button type="button" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} className="rounded-md p-1.5 text-white/80 hover:bg-white/10 hover:text-white" aria-label="Close the assistant">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-relaxed" aria-live="polite">
            <div className="rounded-xl bg-mist px-3.5 py-3 text-body">
              <p>Hello! I can answer questions about MRC Ghana 2027: the dates, the seven robot sports, age rules, registration and the route to the Global Olympiad.</p>
              <p className="mt-1.5 text-sm text-muted">Please don't share personal details here. Team details go in the official registration form.</p>
            </div>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-input bg-white px-3 py-1.5 text-sm text-navy-950 hover:border-navy-950">{s}</button>
                ))}
              </div>
            )}
            {messages.map((m, i) => {
              if (m.role === "user") return <div key={i} className="ml-8 rounded-xl bg-navy-950 px-3.5 py-2.5 text-white">{m.content}</div>;
              const handoff = m.content.includes(HANDOFF_TOKEN);
              const text = m.content.replace(HANDOFF_TOKEN, "").trim();
              const question = messages.slice(0, i).reverse().find((x) => x.role === "user")?.content;
              return (
                <div key={i} className="mr-6 rounded-xl border border-line bg-white px-3.5 py-2.5 text-body">
                  {text ? <AssistantText text={text} /> : <p className="text-muted">Thinking…</p>}
                  {handoff && !busy && <WhatsAppButton question={question} />}
                </div>
              );
            })}
          </div>

          <form className="border-t border-line px-3 pb-3 pt-2" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <label htmlFor="chat-input" className="sr-only">Your question</label>
            <div className="flex items-end gap-2">
              <textarea id="chat-input" ref={inputRef} value={input} rows={1} maxLength={MAX_CHARS}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                placeholder="Type your question…"
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-lg border border-input px-3 py-2.5 text-[15px] text-navy-950 focus:border-navy-950 focus:outline-none" />
              <button type="submit" disabled={busy || !input.trim()} className="btn btn-gold h-11 px-4 disabled:opacity-50">{busy ? "…" : "Send"}</button>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
              <WhatsAppButton question={lastQuestion} compact />
              <a href="/privacy#assistant" className="hover:underline">How this chat uses your messages</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
