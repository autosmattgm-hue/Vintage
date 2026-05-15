import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/catalog";

export function CollectionRail({ collections }: { collections: Collection[] }) {
  return (
    <section className="bg-couture-ink luxury-section text-couture-cream">
      <div className="container">
        <div className="max-w-3xl">
          <p className="editorial-kicker text-xs text-gold-300">Trending Collections</p>
          <h2 className="luxury-section-title mt-4 font-serif">Shop by boutique mood.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.href}
              href={collection.href}
              className="luxury-collection-card group relative overflow-hidden rounded-md border border-white/10"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/86 via-black/22 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="editorial-kicker text-[0.65rem] text-gold-300">{collection.count}</p>
                <h3 className="luxury-card-title mt-3 font-serif">{collection.title}</h3>
                <p className="mt-3 text-sm leading-6 text-couture-cream/70">{collection.description}</p>
                <span className="mt-5 inline-flex items-center text-sm">
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
