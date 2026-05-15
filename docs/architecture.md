# Architecture Notes

Paris Fashion Vintage is structured as a scalable commerce app:

- `app/` contains App Router pages, SEO metadata, route handlers, sitemap, robots, and middleware.
- `components/sections/` contains editorial homepage and marketing sections.
- `components/store/` contains commerce UI, cart persistence, wishlist, checkout, product grids, and collections.
- `components/dashboard/` contains customer and admin dashboards.
- `components/forms/` contains validated contact and auth form surfaces.
- `components/ui/` contains local ShadCN-style primitives.
- `lib/` contains catalog data, formatting, site config, Cloudinary helpers, and Supabase clients.
- `supabase/schema.sql` contains the normalized production database schema.

The current build uses a static catalog for instant preview. Supabase-ready route handlers are included for
products, auth, newsletter, contact, checkout, and analytics. Live persistence should be introduced through
repository modules that sit between route handlers and Supabase.

Security posture:

- Secure headers are configured in `next.config.mjs`.
- Admin route middleware blocks unauthenticated production access.
- JWT sessions are issued from `/api/auth/login` for demo auth flow.
- Mutation routes validate input with Zod.
- Stripe checkout uses server-created sessions only.
- Supabase row-level security policies are included in the schema.

Revenue posture:

- One-of-one inventory cues support urgency.
- Wishlist and recently selected cart persistence reduce abandonment.
- Newsletter and journal content support retention and organic discovery.
- Admin analytics expose revenue, AOV, customer, inventory, and coupon surfaces.
