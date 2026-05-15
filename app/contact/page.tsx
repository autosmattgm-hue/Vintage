import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Paris Fashion Vintage",
  description:
    "Contact Paris Fashion Vintage for in-store shopping, pickup, luxury vintage fashion questions, and private styling.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <section className="container grid gap-10 luxury-section lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <p className="editorial-kicker text-xs text-gold-500">Contact</p>
        <h1 className="luxury-page-title mt-4 font-serif">Plan your boutique visit.</h1>
        <p className="luxury-lead mt-6 max-w-xl text-muted-foreground">
          Ask about availability, reserve a piece for pickup, or plan a personal edit before your Paris visit.
        </p>
        <div className="mt-10 space-y-4">
          {[
            [MapPin, siteConfig.address],
            [Phone, siteConfig.phone],
            [Mail, siteConfig.email],
            [Clock, "In-store shopping and pickup available"]
          ].map(([Icon, text]) => (
            <div key={text as string} className="glass-panel flex items-center gap-4 rounded-md p-4">
              <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <span>{text as string}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-muted">
            <Image
              src="/images/paris-fashion-vintage-shop.png"
              alt="Paris Fashion Vintage shop exterior in Paris"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <iframe
            title="Paris Fashion Vintage map"
            src="https://www.google.com/maps?q=68%20Bd%20de%20Port-Royal%2C%2075005%20Paris%2C%20France&output=embed"
            className="h-[clamp(16rem,54vw,20rem)] w-full rounded-md border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="grid h-fit gap-6">
        <ContactForm />
        <AppointmentForm />
      </div>
    </section>
  );
}
