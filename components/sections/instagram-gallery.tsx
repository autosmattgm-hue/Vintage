import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { lookbookImages } from "@/lib/lookbook";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function InstagramGallery() {
  return (
    <section className="container luxury-section">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Gallery</p>
          <h2 className="luxury-section-title mt-4 font-serif">Seen in the boutique.</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Editorial styling moments for bags, jewelry, shoes, coats, and collected Parisian details.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
        {lookbookImages.map((image, index) => (
          <div
            key={image.src}
            className={`group relative overflow-hidden rounded-md ${
              index === 0 || index === 5 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 17vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">
            <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
            View latest drops
          </Link>
        </Button>
      </div>
    </section>
  );
}
