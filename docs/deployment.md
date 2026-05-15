# Deployment Guide

## Environment Variables

Copy `.env.example` to `.env.local` for local development and configure these values in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://www.parisfashionvintage.fr
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_FOLDER=paris-fashion-vintage
ADMIN_EMAIL=bonjour@parisfashionvintage.fr
ADMIN_PASSWORD=replace-with-a-private-admin-password
NVIDIA_API_KEY=
NVIDIA_AI_MODEL=meta/llama-4-maverick-17b-128e-instruct
```

## Supabase

1. Create a Supabase project in the EU region.
2. Run `supabase/schema.sql` from the SQL editor.
3. Create storage buckets for `products`, `lookbook`, and `journal`.
4. Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
5. Use service-role writes from protected API routes for admin product, inventory, and order workflows.

## Stripe

1. Create products dynamically through `/api/checkout`.
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
3. Configure webhook endpoint `/api/stripe/webhook` when adding live fulfillment.
4. Verify webhook signatures with `STRIPE_WEBHOOK_SECRET`.
5. Use idempotency keys when converting checkout sessions to orders.

## Cloudinary

Use Cloudinary for production image storage and transformations. The helper in `lib/cloudinary.ts` supports
`f_auto,q_auto,c_fill` transforms and the configured folder.
The admin upload route `/api/uploads` uses `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` for signed server-side uploads.

## Admin Access

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a strong `JWT_SECRET` in Vercel. The `/admin` route requires a valid admin JWT cookie.
For local demos, `.env.example` includes a presentation password; replace it before production.

## Vivienne AI

Vivienne is the boutique AI style concierge. Add `NVIDIA_API_KEY` in Vercel to enable live AI responses through
`/api/ai/vivienne`. Keep the key server-side only and never commit it to GitHub. Without the key, Vivienne uses
safe demo fallback replies so the UI still works during presentations.

## Vercel

```bash
npm install
npm run typecheck
npm run build
vercel
```

Recommended Vercel settings:

- Framework preset: Next.js
- Node.js runtime: 22.x or newer
- Image optimization: enabled
- Analytics: enabled
- Speed Insights: enabled
- Environment variables: production, preview, development scoped

## Production Hardening

- Move admin/customer auth to Supabase Auth or OAuth before handling real customer accounts at scale.
- Add CSRF protection to mutation routes that use cookies.
- Add Stripe webhook route for order lifecycle updates.
- Add rate limiting with Upstash Redis or Vercel KV.
- Add structured logging and audit writes for all admin mutations.
- Add Playwright smoke tests for checkout, cart, wishlist, search, and admin product edits.
