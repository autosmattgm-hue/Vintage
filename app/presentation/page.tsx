import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Gem,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  PackageCheck,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Wand2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Client Presentation",
  description: "Private project presentation for Paris Fashion Vintage.",
  robots: { index: false, follow: false }
};

const presentationStats = [
  ["17", "client-facing pages"],
  ["46", "optimized routes"],
  ["4.6", "rating trust signal"],
  ["100%", "responsive layout system"]
];

const highlights = [
  {
    icon: Sparkles,
    title: "Luxury brand experience",
    body: "Editorial layouts, refined typography, cinematic visuals, smooth motion, and a Parisian boutique mood."
  },
  {
    icon: ShoppingBag,
    title: "Complete commerce flow",
    body: "Shop, product pages, cart, wishlist, checkout, related products, recently viewed, and pickup-focused order path."
  },
  {
    icon: LayoutDashboard,
    title: "Operational dashboard",
    body: "Admin screens for products, inventory, orders, customers, coupons, analytics, and sales insights."
  },
  {
    icon: Globe2,
    title: "SEO and launch structure",
    body: "Metadata, sitemap, robots, JSON-LD local business schema, journal content, and Vercel-ready deployment."
  }
];

const walkthrough = [
  {
    href: "/",
    title: "Homepage",
    body: "Open with the cinematic luxury impression, boutique trust signals, featured pieces, reviews, real shop photo, and newsletter."
  },
  {
    href: "/shop",
    title: "Shop Experience",
    body: "Show product search, category filters, sorting, responsive product cards, wishlist, and add-to-cart interaction."
  },
  {
    href: "/product/vintage-saint-laurent-bag",
    title: "Product Detail",
    body: "Highlight premium product storytelling, condition notes, secure checkout cues, related pieces, and recently viewed logic."
  },
  {
    href: "/admin",
    title: "Admin Dashboard",
    body: "Demonstrate the business side: analytics, product management, orders, customer management, coupons, and inventory."
  }
];

export default function PresentationPage() {
  const featured = products.slice(0, 3);

  return (
    <main className="bg-couture-ink text-couture-cream">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/paris-fashion-vintage-shop.png"
            alt="Paris Fashion Vintage boutique storefront"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-38"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-couture-ink via-couture-ink/76 to-couture-ink/42" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-couture-ink to-transparent" />
        </div>
        <div className="container relative z-10 flex min-h-[92svh] items-end pb-[clamp(3rem,8vw,5rem)] pt-28">
          <div className="max-w-5xl">
            <p className="editorial-kicker text-xs text-gold-300">Private Client Presentation</p>
            <h1 className="luxury-hero-title mt-5 font-serif">
              A luxury digital boutique for Paris Fashion Vintage.
            </h1>
            <p className="luxury-lead mt-6 max-w-2xl text-couture-cream/74">
              A premium eCommerce experience designed to make visitors trust the boutique instantly, discover
              curated vintage pieces beautifully, and move smoothly from inspiration to purchase.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild size="lg" variant="gold" className="w-full xs:w-auto">
                <Link href="/">
                  Open live website
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-white/5 text-couture-cream hover:bg-white/10 xs:w-auto"
              >
                <Link href="/shop">View shop</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-6">
        <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4">
          {presentationStats.map(([value, label]) => (
            <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
              <p className="font-serif text-5xl text-gold-300">{value}</p>
              <p className="mt-2 text-sm text-couture-cream/62">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container luxury-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="editorial-kicker text-xs text-gold-300">What Was Built</p>
            <h2 className="luxury-section-title mt-4 font-serif">A premium sales asset, not just a website.</h2>
            <p className="luxury-lead mt-6 text-couture-cream/68">
              The experience combines high-fashion visual design with real business infrastructure: product
              discovery, trust-building content, SEO foundations, customer retention flows, and operational tools.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-md border border-white/10 bg-white/[0.04] p-6">
                <item.icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
                <h3 className="mt-5 font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-couture-cream/64">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-couture-cream luxury-section text-couture-ink">
        <div className="container">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-kicker text-xs text-gold-700">Meeting Walkthrough</p>
              <h2 className="luxury-section-title mt-4 font-serif">Present it in this order.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-couture-ink/62">
              This flow moves from emotion, to commerce, to product trust, to business operations.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {walkthrough.map((step, index) => (
              <Link
                key={step.href}
                href={step.href}
                className="group flex min-h-72 flex-col justify-between rounded-md border border-couture-ink/12 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div>
                  <p className="font-serif text-6xl text-gold-500">0{index + 1}</p>
                  <h3 className="mt-5 font-serif text-4xl">{step.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-couture-ink/62">{step.body}</p>
                </div>
                <span className="mt-8 inline-flex items-center text-sm font-medium">
                  Open section
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container luxury-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div>
            <p className="editorial-kicker text-xs text-gold-300">Featured Commerce Moments</p>
            <h2 className="luxury-section-title mt-4 font-serif">Show the products like collectible fashion.</h2>
            <p className="luxury-lead mt-6 text-couture-cream/68">
              Product cards are designed around desire, scarcity, and trust: designer names, condition cues,
              hover motion, wishlist actions, pricing, and immediate cart behavior.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [Search, "Search and filters"],
                [Star, "Trust and reviews"],
                [LockKeyhole, "Secure checkout"]
              ].map(([Icon, label]) => (
                <div key={label as string} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
                  <p className="mt-3 text-sm">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                  <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="editorial-kicker text-[0.62rem] text-gold-300">{product.designer}</p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight">{product.name}</h3>
                  <p className="mt-2 text-sm text-couture-cream/62">{formatCurrency(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/32 luxury-section">
        <div className="container grid gap-8 lg:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "Responsive by default",
              body: "Tested across small phones, large phones, tablet, laptop, and wide desktop dimensions."
            },
            {
              icon: Store,
              title: "Real boutique presence",
              body: "The shop photo, address, phone, rating, map, and local business schema create immediate trust."
            },
            {
              icon: BarChart3,
              title: "Business growth ready",
              body: "Newsletter, journal content, SEO routes, analytics dashboard, coupons, and retention surfaces are included."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <item.icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-4xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-couture-cream/64">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container luxury-section">
        <div className="grid gap-8 rounded-md border border-gold-300/20 bg-white/[0.04] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.5fr)] lg:items-center">
          <div>
            <p className="editorial-kicker text-xs text-gold-300">Recommended Offer</p>
            <h2 className="luxury-section-title mt-4 font-serif">Project investment: $14,500.</h2>
            <p className="luxury-lead mt-6 max-w-2xl text-couture-cream/68">
              Position this as a luxury eCommerce website with responsive design, product experience, cart,
              wishlist, checkout setup, admin dashboard, SEO foundations, deployment, and handoff.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              [Gem, "Premium luxury design"],
              [BadgeCheck, "Production-ready structure"],
              [PackageCheck, "Launch handoff included"],
              [Wand2, "Designed to sell the brand"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 p-4">
                <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
                <span className="text-sm">{label as string}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
