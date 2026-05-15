"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getInventoryStatus, type Product } from "@/lib/catalog";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { WishlistButton } from "@/components/store/wishlist-button";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const inventoryStatus = getInventoryStatus(product);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-md border bg-card shadow-sm"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} variant="gold" className="text-[0.65rem]">
                {badge}
              </Badge>
            ))}
          </div>
          <Badge className="absolute bottom-3 left-3 bg-background/85 text-[0.65rem] text-foreground backdrop-blur">
            {inventoryStatus}
          </Badge>
          <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-4 place-items-center rounded-full bg-couture-cream text-couture-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
      <div className="p-4 xs:p-5">
        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="editorial-kicker text-[0.65rem] text-gold-500">{product.designer}</p>
            <Link href={`/product/${product.slug}`} className="mt-2 block font-serif text-[1.55rem] leading-tight xs:text-2xl">
              {product.name}
            </Link>
          </div>
          <p className="shrink-0 font-serif text-2xl text-gold-500">{formatCurrency(product.price)}</p>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
          <AddToCartButton product={product} variant="secondary" className="px-3 text-xs xs:text-sm" />
          <WishlistButton product={product} variant="outline" size="icon" aria-label={`Save ${product.name}`} />
        </div>
      </div>
    </motion.article>
  );
}
