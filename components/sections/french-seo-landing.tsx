import { ArrowRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

type FrenchSeoLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  productCategory?: string;
};

export function FrenchSeoLanding({ eyebrow, title, description, bullets, productCategory }: FrenchSeoLandingProps) {
  const featured = products
    .filter((product) => !productCategory || product.category === productCategory || product.collection === productCategory)
    .slice(0, 3);

  return (
    <main>
      <section className="container grid gap-10 luxury-section lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">{eyebrow}</p>
          <h1 className="luxury-page-title mt-4 font-serif">{title}</h1>
          <p className="luxury-lead mt-6 max-w-2xl text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button asChild size="lg">
              <Link href="/shop">
                Voir la boutique
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-muted">
          <Image
            src="/images/paris-fashion-vintage-shop.png"
            alt="Boutique Paris Fashion Vintage à Paris"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 max-w-sm text-couture-cream">
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
              {siteConfig.address}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-gold-300 text-gold-300" aria-hidden="true" />
              Note boutique {siteConfig.rating}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-couture-ink luxury-section text-couture-cream">
        <div className="container grid gap-5 md:grid-cols-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="rounded-md border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm leading-6 text-couture-cream/72">{bullet}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container luxury-section">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-kicker text-xs text-gold-500">Sélection Boutique</p>
            <h2 className="luxury-section-title mt-4 font-serif">Pièces disponibles à Port-Royal.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Chaque pièce est sélectionnée pour son état, sa silhouette, son potentiel de style et sa rareté.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group overflow-hidden rounded-md border bg-card">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="editorial-kicker text-[0.65rem] text-gold-500">{product.designer}</p>
                <h3 className="mt-3 font-serif text-3xl">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
