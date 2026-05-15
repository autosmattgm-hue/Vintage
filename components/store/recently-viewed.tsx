"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/product-card";

const STORAGE_KEY = "pfv_recently_viewed";

export function RecentlyViewed({ product }: { product: Product }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const current = stored ? (JSON.parse(stored) as string[]) : [];
    const next = [product.id, ...current.filter((id) => id !== product.id)].slice(0, 8);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIds(next);
  }, [product.id]);

  const viewedProducts = useMemo(
    () =>
      ids
        .filter((id) => id !== product.id)
        .map((id) => products.find((item) => item.id === id))
        .filter((item): item is Product => Boolean(item))
        .slice(0, 4),
    [ids, product.id]
  );

  if (viewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div>
        <p className="editorial-kicker text-xs text-gold-500">Recently Viewed</p>
        <h2 className="luxury-card-title mt-3 font-serif">Continue your private edit</h2>
      </div>
      <div className="mt-8 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
        {viewedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
