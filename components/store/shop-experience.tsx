"use client";

import { SlidersHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/lib/catalog";
import { categories } from "@/lib/catalog";
import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price low", value: "price-asc" },
  { label: "Price high", value: "price-desc" },
  { label: "Newest", value: "newest" }
] as const;

type SortValue = (typeof sortOptions)[number]["value"];

export function ShopExperience({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [sort, setSort] = useState<SortValue>("featured");

  const filtered = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        lowerQuery.length === 0 ||
        [product.name, product.designer, product.description, product.category, product.color, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(lowerQuery);

      return matchesCategory && matchesQuery;
    });

    return result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "newest") return b.id.localeCompare(a.id);
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, products, query, sort]);

  return (
    <section className="container luxury-section">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-end">
        <div className="min-w-0">
          <p className="editorial-kicker text-xs text-gold-500">Shop</p>
          <h1 className="luxury-page-title mt-4 font-serif">Curated vintage luxury.</h1>
          <p className="luxury-lead mt-6 text-muted-foreground">
            Explore designer bags, jewelry, shoes, tailoring, and Saint Laurent pieces sourced for condition,
            beauty, and modern wearability.
          </p>
        </div>
        <div className="glass-panel min-w-0 rounded-md p-4">
          <div className="grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <label className="relative min-w-0">
              <span className="sr-only">Search products</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Saint Laurent, bags, gold, heels..."
                className="pl-10"
              />
            </label>
            <div className="flex min-w-0 items-center gap-2 rounded-md border bg-background/60 px-3">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortValue)}
                className="h-11 bg-transparent text-sm outline-none"
                aria-label="Sort products"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="hide-scrollbar mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
            {(["All", ...categories] as const).map((item) => (
              <Button
                key={item}
                variant={category === item ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(item)}
                className="shrink-0"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between text-sm text-muted-foreground">
        <p>{filtered.length} pieces available</p>
        <p>In-store pickup in Paris</p>
      </div>

      <div className="mt-8 grid gap-4 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-md border bg-card p-10 text-center">
          <h2 className="font-serif text-4xl">No matching pieces right now.</h2>
          <p className="mt-3 text-muted-foreground">Try a different designer, category, or material.</p>
        </div>
      )}
    </section>
  );
}
