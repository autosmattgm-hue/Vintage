import type { Metadata } from "next";
import Image from "next/image";
import { lookbookImages } from "@/lib/lookbook";

export const metadata: Metadata = {
  title: "Lookbook Gallery",
  description: "Explore the Paris Fashion Vintage lookbook with editorial vintage fashion styling.",
  alternates: { canonical: "/lookbook" }
};

export default function LookbookPage() {
  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">Lookbook Gallery</p>
        <h1 className="luxury-page-title mt-4 font-serif">The Paris edit, in motion.</h1>
        <p className="luxury-lead mt-6 text-muted-foreground">
          Editorial styling moments designed for discovery, social sharing, and high-intent collection browsing.
        </p>
      </div>
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {lookbookImages.map((image) => (
          <figure key={image.src} className="group mb-5 break-inside-avoid overflow-hidden rounded-md border bg-card">
            <div className={`relative ${image.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-4 text-sm text-muted-foreground">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
