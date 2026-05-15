-- Paris Fashion Vintage production-ready Supabase schema
-- Enable extensions from the SQL editor before applying in production.
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

create type public.user_role as enum ('customer', 'admin', 'staff');
create type public.order_status as enum ('draft', 'pending_payment', 'paid', 'ready_for_pickup', 'fulfilled', 'cancelled', 'refunded');
create type public.product_status as enum ('draft', 'active', 'archived', 'sold');
create type public.discount_type as enum ('percentage', 'fixed_amount');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  marketing_opt_in boolean not null default false,
  preferred_categories text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  sku text not null unique,
  slug text not null unique,
  name text not null,
  designer text not null,
  description text not null,
  price_cents integer not null check (price_cents > 0),
  compare_at_price_cents integer check (compare_at_price_cents is null or compare_at_price_cents > price_cents),
  currency text not null default 'EUR',
  condition_note text not null,
  era text,
  size_label text,
  material text,
  color text,
  status public.product_status not null default 'draft',
  featured boolean not null default false,
  tags text[] not null default '{}',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.inventory_items (
  product_id uuid primary key references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity >= 0),
  low_stock_threshold integer not null default 1,
  updated_at timestamptz not null default now(),
  check (reserved_quantity <= quantity)
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  delta integer not null,
  reason text not null,
  actor_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type public.discount_type not null,
  amount integer not null check (amount > 0),
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer,
  used_count integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  profile_id uuid references public.profiles(id) on delete set null,
  email text not null,
  status public.order_status not null default 'pending_payment',
  subtotal_cents integer not null default 0,
  discount_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null default 0,
  currency text not null default 'EUR',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  coupon_id uuid references public.coupons(id) on delete set null,
  pickup_name text,
  pickup_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  designer text not null,
  unit_price_cents integer not null,
  quantity integer not null check (quantity > 0),
  total_cents integer not null
);

create table public.wishlist_items (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, product_id)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'website',
  status text not null default 'subscribed',
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index products_status_featured_idx on public.products(status, featured);
create index products_category_idx on public.products(category_id);
create index products_tags_idx on public.products using gin(tags);
create index products_search_idx on public.products using gin(to_tsvector('english', name || ' ' || designer || ' ' || description));
create index product_images_product_sort_idx on public.product_images(product_id, sort_order);
create index orders_profile_created_idx on public.orders(profile_id, created_at desc);
create index orders_status_created_idx on public.orders(status, created_at desc);
create index order_items_product_idx on public.order_items(product_id);
create index appointments_created_idx on public.appointments(created_at desc);
create index appointments_status_date_idx on public.appointments(status, preferred_date);
create index audit_logs_created_idx on public.audit_logs(created_at desc);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.inventory_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.appointments enable row level security;
alter table public.blog_posts enable row level security;
alter table public.audit_logs enable row level security;

create policy "Public can read active products" on public.products
  for select using (status = 'active');

create policy "Public can read product images" on public.product_images
  for select using (
    exists (
      select 1 from public.products
      where products.id = product_images.product_id
      and products.status = 'active'
    )
  );

create policy "Customers can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Customers can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Customers can manage own wishlist" on public.wishlist_items
  for all using (auth.uid() = profile_id);

create policy "Customers can read own orders" on public.orders
  for select using (auth.uid() = profile_id);

create policy "Customers can read own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.profile_id = auth.uid()
    )
  );

create policy "Public can insert newsletter subscribers" on public.newsletter_subscribers
  for insert with check (true);

create policy "Public can request appointments" on public.appointments
  for insert with check (true);

create policy "Public can read published blog posts" on public.blog_posts
  for select using (published_at is not null and published_at <= now());

-- Admin/staff policies should be enforced through service-role API routes and audited writes.
