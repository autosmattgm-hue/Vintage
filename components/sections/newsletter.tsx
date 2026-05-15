"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="container luxury-section">
      <div className="glass-panel grid gap-8 rounded-md p-5 xs:p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Private Newsletter</p>
          <h2 className="luxury-section-title mt-4 font-serif">Receive the next Paris drop first.</h2>
        </div>
        <div>
          <p className="luxury-lead text-muted-foreground">
            Join for new arrivals, stylist notes, fair-price luxury finds, and rare one-of-one pieces before
            they reach the public edit.
          </p>
          <div className="mt-6">
            <NewsletterMini source="homepage-newsletter" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterMini({ source = "footer-newsletter" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source })
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="relative">
        <span className="sr-only">Email address</span>
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="pl-10"
        />
      </label>
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Joining..." : "Join"}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
      {status === "success" && <p className="text-sm text-gold-500 sm:col-span-2">You are on the private list.</p>}
      {status === "error" && <p className="text-sm text-destructive sm:col-span-2">Please enter a valid email.</p>}
    </form>
  );
}
