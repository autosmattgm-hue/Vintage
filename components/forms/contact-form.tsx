"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        interest: form.get("interest"),
        message: form.get("message")
      })
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="h-fit rounded-md border bg-card p-6 shadow-sm">
      <h2 className="font-serif text-4xl">Boutique inquiry</h2>
      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="interest">Interest</Label>
          <select
            id="interest"
            name="interest"
            className="min-h-11 rounded-md border border-input bg-background/70 px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            defaultValue="Private styling"
          >
            <option>Private styling</option>
            <option>In-store pickup</option>
            <option>Designer bag availability</option>
            <option>Jewelry and accessories</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={6}
            className="rounded-md border border-input bg-background/70 px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            placeholder="Tell us which piece, designer, or visit date you have in mind."
          />
        </div>
        {status === "success" && <p className="text-sm text-gold-500">Merci. Your message has been received.</p>}
        {status === "error" && <p className="text-sm text-destructive">Please check the form and try again.</p>}
        <Button type="submit" size="lg" disabled={status === "loading"}>
          <Send className="mr-2 h-4 w-4" aria-hidden="true" />
          {status === "loading" ? "Sending..." : "Send inquiry"}
        </Button>
      </div>
    </form>
  );
}
