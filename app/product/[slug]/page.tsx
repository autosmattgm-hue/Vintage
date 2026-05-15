import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, Heart, PackageCheck, ShieldCheck, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductCard } from "@/components/store/product-card";
import { RecentlyViewed } from "@/components/store/recently-viewed";
import { WishlistButton } from "@/components/store/wishlist-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInventoryStatus, products } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Vintage Piece Not Found"
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      url: absoluteUrl(`/product/${product.slug}`),
      images: [{ url: product.images[0], alt: product.name }]
    }
  };
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
  const inventoryStatus = getInventoryStatus(product);

  return (
    <article className="container luxury-section">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to collection
        </Link>
      </Button>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <div className="grid gap-4 md:grid-cols-[0.22fr_0.78fr]">
          <div className="order-2 grid grid-cols-3 gap-2 xs:gap-3 md:order-1 md:grid-cols-1">
            {product.images.slice(1).map((image) => (
              <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-md border bg-muted">
                <Image src={image} alt={`${product.name} detail`} fill sizes="12vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-md border bg-muted md:order-2">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-4 top-4 flex gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="editorial-kicker text-xs text-gold-500">{product.designer}</p>
          <h1 className="luxury-product-title mt-4 font-serif">{product.name}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="font-serif text-4xl text-gold-500">{formatCurrency(product.price)}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-gold-300 text-gold-300"
                  aria-hidden="true"
                />
              ))}
              <span className="ml-2">Boutique inspected</span>
            </div>
          </div>
          <p className="luxury-lead mt-6 text-muted-foreground">{product.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <AddToCartButton product={product} size="lg" />
            <WishlistButton product={product} label="Save to wishlist" variant="outline" size="lg" />
          </div>
          <dl className="mt-8 grid gap-3 rounded-md border bg-card/70 p-5 text-sm">
            {[
              ["Condition", product.condition],
              ["Era", product.era],
              ["Status", inventoryStatus],
              ...(product.size ? [["Size", product.size]] : []),
              ["Material", product.material],
              ["Pickup", "Available in-store at Port-Royal"]
            ].map(([term, detail]) => (
              <div key={term} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
                <dt className="text-muted-foreground">{term}</dt>
                <dd className="text-right font-medium">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 grid gap-4 xs:grid-cols-3">
            {[
              [ShieldCheck, "Secure Stripe checkout"],
              [PackageCheck, "Pickup ready inventory"],
              [BadgeCheck, "Authenticity reviewed"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="rounded-md border bg-background/60 p-4">
                <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                <p className="mt-3 text-sm">{label as string}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-md bg-couture-wine/10 p-4 text-sm">
            <Heart className="h-4 w-4 text-couture-wine" aria-hidden="true" />
            <span>Only one available. Vintage inventory is one-of-one and updated by the boutique team.</span>
          </div>
        </div>
      </div>

      <RecentlyViewed product={product} />

      <section className="mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="editorial-kicker text-xs text-gold-500">Stylist Recommends</p>
            <h2 className="luxury-card-title mt-3 font-serif">Related pieces</h2>
          </div>
          <Sparkles className="hidden h-10 w-10 text-gold-500 md:block" aria-hidden="true" />
        </div>
        <div className="mt-8 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
