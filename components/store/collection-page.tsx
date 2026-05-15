import type { Product } from "@/lib/catalog";
import { ProductCard } from "@/components/store/product-card";

export function CollectionPage({
  eyebrow,
  title,
  description,
  products
}: {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}) {
  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">{eyebrow}</p>
        <h1 className="luxury-page-title mt-4 font-serif">{title}</h1>
        <p className="luxury-lead mt-6 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-12 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
