# Paris Fashion Vintage

A full luxury vintage fashion eCommerce website for **Paris Fashion Vintage**, a Paris-based boutique at
68 Bd de Port-Royal, 75005 Paris, France.

## Features

- Next.js 15 App Router, React, TypeScript, TailwindCSS
- Luxury homepage with cinematic video hero, product features, testimonials, journal, gallery, boutique map
- Shop page with search, category filtering, sorting, hover interactions, and responsive product cards
- Product detail pages with SEO metadata, related products, condition notes, and cart/wishlist actions
- Wishlist, cart persistence, checkout page, Stripe-ready checkout API, and in-store pickup flow
- Customer account dashboard
- Protected admin dashboard for analytics, product uploads, inventory status, orders, appointments, customers, and coupons
- Auth pages with JWT session route
- Cloudinary-ready image upload API with safe demo fallback
- WhatsApp contact button and private styling appointment booking
- Vivienne AI style concierge for customer guidance and admin product copy generation
- French SEO landing pages for boutique vintage Paris, sacs vintage, bijoux vintage, and Saint Laurent vintage
- Fashion journal, lookbook, designer, bags, jewelry, and shoes collection pages
- Supabase-ready schema and API route structure
- Cloudinary helper for production image optimization
- Sitemap, robots, OpenGraph image, JSON-LD local business schema, secure headers

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run typecheck
npm run build
npm run start
```

## Environment

Copy `.env.example` to `.env.local` and fill in the required Supabase, Stripe, Cloudinary, and JWT variables.

## Deployment

See [docs/deployment.md](docs/deployment.md).
