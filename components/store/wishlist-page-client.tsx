"use client";

import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { useCart } from "@/components/store/cart-provider";
import { Button } from "@/components/ui/button";

export function WishlistPageClient() {
  const { wishlist } = useCart();

  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">Wishlist</p>
        <h1 className="luxury-page-title mt-4 font-serif">Your private vintage edit.</h1>
        <p className="luxury-lead mt-6 text-muted-foreground">
          Saved pieces remain in your browser and can be moved into cart when you are ready.
        </p>
      </div>
      {wishlist.length > 0 ? (
        <div className="mt-12 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-md border bg-card p-10 text-center">
          <h2 className="font-serif text-4xl">No saved pieces yet.</h2>
          <p className="mt-3 text-muted-foreground">Collect your favorite bags, jewels, shoes, and coats here.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Discover pieces</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
