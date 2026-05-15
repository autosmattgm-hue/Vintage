import type { Metadata } from "next";
import { Award, Gem, MapPinned, Sparkles } from "lucide-react";
import Image from "next/image";
import { Newsletter } from "@/components/sections/newsletter";
import { fashionImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "About the Paris Boutique",
  description:
    "Learn about Paris Fashion Vintage, a warm luxury vintage boutique at 68 Bd de Port-Royal, Paris.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <section className="container grid gap-10 luxury-section lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">About Us</p>
          <h1 className="luxury-page-title mt-4 font-serif">Parisian vintage, personally curated.</h1>
          <p className="luxury-lead mt-6 max-w-2xl text-muted-foreground">
            Paris Fashion Vintage is built around the feeling of entering a quiet boutique and finding a piece
            that seems to have been waiting for you. The collection is feminine, artistic, and practical enough
            to become part of real wardrobes.
          </p>
        </div>
        <div className="luxury-feature-media relative overflow-hidden rounded-md">
          <Image
            src="/images/paris-fashion-vintage-shop.png"
            alt="Paris Fashion Vintage boutique storefront in Paris"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 max-w-xs text-couture-cream xs:bottom-8 xs:left-8">
            <p className="editorial-kicker text-xs text-gold-300">Port-Royal Boutique</p>
            <p className="mt-3 font-serif text-[clamp(2rem,7vw,2.5rem)] leading-tight">
              A real Paris address for rare vintage finds.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-couture-ink luxury-section text-couture-cream">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Award, "Luxury sourcing", "Designer vintage pieces are selected for silhouette, material, condition, and emotional value."],
            [Gem, "One-of-one finds", "Bags, jewels, shoes, coats, and Saint Laurent pieces change as soon as they find a new owner."],
            [Sparkles, "Styling warmth", "Visitors praise the owner’s kindness, taste, and ability to make vintage feel personal."],
            [MapPinned, "Paris location", "The boutique welcomes tourists, collectors, and local fashion lovers near Port-Royal."]
          ].map(([Icon, title, body]) => (
            <div key={title as string} className="rounded-md border border-white/10 bg-white/[0.03] p-6">
              <Icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">{title as string}</h2>
              <p className="mt-3 text-sm leading-6 text-couture-cream/70">{body as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container grid gap-10 luxury-section lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md">
          <Image
            src={fashionImage("photo-1496747611176-843222e1e57c")}
            alt="Editorial model wearing vintage luxury fashion"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Curation Philosophy</p>
          <h2 className="luxury-section-title mt-4 font-serif">Timeless pieces, edited for modern life.</h2>
          <p className="luxury-lead mt-6 text-muted-foreground">
            The boutique balances French restraint with fashion drama: a structured blazer, an evening bag, a
            gold necklace, a tailored coat, or heels that can turn a simple dress into a full story.
          </p>
          <p className="luxury-lead mt-5 text-muted-foreground">
            Every product page is designed for customer trust: condition notes, pickup availability, secure
            payment, related styling recommendations, and inventory signals for one-of-one vintage scarcity.
          </p>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
