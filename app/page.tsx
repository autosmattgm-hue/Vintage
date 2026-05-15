import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CollectionRail } from "@/components/sections/collection-rail";
import { HeroVideo } from "@/components/sections/hero-video";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { Newsletter } from "@/components/sections/newsletter";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { Testimonials } from "@/components/sections/testimonials";
import { Button } from "@/components/ui/button";
import { collections, products } from "@/lib/catalog";
import { fashionImage } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = products.filter((product) => product.featured);

  return (
    <>
      <HeroVideo />

      <section className="border-y border-gold-300/20 bg-couture-ink py-5 text-couture-cream">
        <div className="container grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
          {[
            ["4.6", "star boutique rating"],
            ["68", "Bd de Port-Royal, Paris"],
            ["48h", "pickup preparation"],
            ["100%", "curated designer vintage"]
          ].map(([value, label]) => (
            <div key={label} className="flex items-center gap-3">
              <span className="font-serif text-3xl text-gold-300">{value}</span>
              <span className="text-couture-cream/70">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <ProductCarousel products={featured} title="Featured Designer Pieces" eyebrow="Boutique Edit" />

      <CollectionRail collections={collections} />

      <section className="container grid gap-8 luxury-section lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
        <div className="luxury-feature-media relative overflow-hidden rounded-[0.35rem]">
          <Image
            src={fashionImage("photo-1515372039744-b8f02a3ae446")}
            alt="Editorial vintage coat styled in Paris"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 max-w-xs text-couture-cream xs:bottom-8 xs:left-8">
            <p className="editorial-kicker text-xs text-gold-300">Fashion Editorial</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,7vw,2.25rem)] leading-tight">Vintage with a modern Parisian line.</h2>
          </div>
        </div>
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Brand Story</p>
          <h2 className="luxury-section-title mt-4 font-serif">
            An intimate luxury boutique for pieces with history.
          </h2>
          <p className="luxury-lead mt-6 text-muted-foreground">
            Paris Fashion Vintage curates designer bags, jewelry, shoes, coats, and rare Saint Laurent finds
            for women who want elegance with memory. Each piece is selected with an eye for silhouette,
            material integrity, styling potential, and the feeling of discovering something personal.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              [ShieldCheck, "Authenticated designer sourcing"],
              [Sparkles, "Stylist-led collection edits"],
              [CalendarDays, "In-store shopping and pickup"]
            ].map(([Icon, label]) => (
              <div key={label as string} className="glass-panel rounded-md p-4">
                <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium">{label as string}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8">
            <Link href="/about">
              Visit the atelier story
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <Testimonials />

      <BlogPreview />

      <InstagramGallery />

      <section className="bg-couture-ink luxury-section text-couture-cream">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <p className="editorial-kicker text-xs text-gold-300">Paris Boutique</p>
            <h2 className="luxury-section-title mt-4 font-serif">Find us in the 5th arrondissement.</h2>
            <p className="mt-6 max-w-xl text-couture-cream/70">
              Step inside for curated racks, warm guidance, and collectible accessories close to Port-Royal.
            </p>
            <div className="mt-8 space-y-4 text-sm text-couture-cream/80">
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
                {siteConfig.address}
              </p>
              <p className="flex items-center gap-3">
                <Star className="h-4 w-4 fill-gold-300 text-gold-300" aria-hidden="true" />
                Rated {siteConfig.rating} for service, selection, and fair luxury pricing
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button asChild variant="secondary" className="w-full xs:w-auto">
                <Link href="/contact">Plan a visit</Link>
              </Button>
              <Button asChild variant="outline" className="w-full xs:w-auto">
                <Link href="/shop">Shop online</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[0.35rem] border border-gold-300/25">
              <Image
                src="/images/paris-fashion-vintage-shop.png"
                alt="Paris Fashion Vintage boutique storefront at 68 Bd de Port-Royal in Paris"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 max-w-xs">
                <p className="editorial-kicker text-[0.65rem] text-gold-300">The Real Boutique</p>
                <p className="mt-2 font-serif text-3xl">68 Bd de Port-Royal</p>
              </div>
            </div>
            <iframe
              title="Paris Fashion Vintage location on Google Maps"
              src="https://www.google.com/maps?q=68%20Bd%20de%20Port-Royal%2C%2075005%20Paris%2C%20France&output=embed"
              className="h-[clamp(16rem,46vw,20rem)] w-full rounded-[0.35rem] border border-gold-300/25"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
