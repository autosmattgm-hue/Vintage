"use client";

import { CalendarCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("appointmentName"),
        email: form.get("appointmentEmail"),
        phone: form.get("phone"),
        date: form.get("date"),
        time: form.get("time"),
        service: form.get("service"),
        message: form.get("appointmentMessage")
      })
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="rounded-md border bg-card p-6 shadow-sm">
      <h2 className="font-serif text-4xl">Private appointment</h2>
      <div className="mt-6 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="appointmentName">Name</Label>
          <Input id="appointmentName" name="appointmentName" required autoComplete="name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="appointmentEmail">Email</Label>
          <Input id="appointmentEmail" name="appointmentEmail" type="email" required autoComplete="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone or WhatsApp</Label>
          <Input id="phone" name="phone" required autoComplete="tel" placeholder="+33 6..." />
        </div>
        <div className="grid gap-3 xs:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="date">Preferred date</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Preferred time</Label>
            <Input id="time" name="time" type="time" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            name="service"
            className="min-h-11 rounded-md border border-input bg-background/70 px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            defaultValue="Private styling appointment"
          >
            <option>Private styling appointment</option>
            <option>Designer bag viewing</option>
            <option>Saint Laurent vintage edit</option>
            <option>In-store pickup appointment</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="appointmentMessage">Notes</Label>
          <textarea
            id="appointmentMessage"
            name="appointmentMessage"
            rows={4}
            className="rounded-md border border-input bg-background/70 px-4 py-3 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            placeholder="Tell us what you would like to see during your visit."
          />
        </div>
        {status === "success" && <p className="text-sm text-gold-500">Appointment request received.</p>}
        {status === "error" && <p className="text-sm text-destructive">Please check your appointment details.</p>}
        <Button type="submit" size="lg" disabled={status === "loading"}>
          <CalendarCheck className="mr-2 h-4 w-4" aria-hidden="true" />
          {status === "loading" ? "Requesting appointment..." : "Request appointment"}
        </Button>
      </div>
    </form>
  );
}
