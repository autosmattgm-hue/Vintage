"use client";

import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VivienneMessage = {
  role: "user" | "assistant";
  content: string;
};

const openingMessage: VivienneMessage = {
  role: "assistant",
  content:
    "Bonjour, I am Vivienne. Tell me your occasion, budget, or favorite designer and I will help you find a refined vintage piece."
};

const suggestions = [
  "I need a vintage bag for dinner in Paris.",
  "Style a Saint Laurent-inspired evening look.",
  "I want to book a private boutique visit."
];

export function VivienneConcierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<VivienneMessage[]>([openingMessage]);
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  const askVivienne = async (content: string) => {
    const nextMessages: VivienneMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/vivienne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "concierge",
          messages: nextMessages.filter((message) => message.role !== "assistant" || message.content !== openingMessage.content)
        })
      });
      const payload = (await response.json()) as { reply?: string; error?: string };

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: payload.reply ?? payload.error ?? "Vivienne is unavailable right now. Please contact the boutique on WhatsApp."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Vivienne is unavailable right now. Please contact the boutique on WhatsApp for immediate help."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;
    void askVivienne(content);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setOpen(true);
          window.setTimeout(() => inputRef.current?.focus(), 120);
        }}
        className={cn(
          "fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] right-[max(1rem,env(safe-area-inset-right))] z-40 h-14 rounded-full px-4 shadow-glow",
          open && "hidden"
        )}
        aria-label="Open Vivienne AI style concierge"
      >
        <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
        Vivienne
      </Button>

      {open && (
        <section
          className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex max-h-[min(42rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[25rem] flex-col overflow-hidden rounded-md border bg-background shadow-glass"
          aria-label="Vivienne AI style concierge"
        >
          <div className="flex items-start justify-between gap-4 border-b bg-couture-ink p-4 text-couture-cream">
            <div>
              <p className="editorial-kicker text-[0.65rem] text-gold-300">AI Style Concierge</p>
              <h2 className="mt-1 font-serif text-3xl">Vivienne</h2>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-couture-cream hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close Vivienne"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {visibleMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content.slice(0, 16)}`}
                className={cn(
                  "rounded-md px-4 py-3 text-sm leading-6",
                  message.role === "assistant"
                    ? "border bg-card text-card-foreground"
                    : "ml-auto max-w-[86%] bg-primary text-primary-foreground"
                )}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="inline-flex items-center gap-2 rounded-md border bg-card px-4 py-3 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 animate-pulse text-gold-500" aria-hidden="true" />
                Vivienne is styling...
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void askVivienne(suggestion)}
                  className="shrink-0 rounded-full border bg-background px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Vivienne..."
                className="min-h-11 rounded-md border bg-background/70 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send message to Vivienne">
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
