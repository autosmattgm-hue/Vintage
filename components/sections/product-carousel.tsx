import type { Product } from "@/lib/catalog";
import { ProductCard } from "@/components/store/product-card";

export function ProductCarousel({ products, title, eyebrow }: { products: Product[]; title: string; eyebrow: string }) {
  return (
    <section className="container luxury-section">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">{eyebrow}</p>
          <h2 className="luxury-section-title mt-3 font-serif">{title}</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          A rotating selection of one-of-one vintage pieces chosen for immediate desirability and long-term wardrobe value.
        </p>
      </div>
      <div className="hide-scrollbar mt-10 grid auto-cols-[86%] grid-flow-col gap-4 overflow-x-auto pb-3 xs:auto-cols-[48%] md:auto-cols-[36%] lg:auto-cols-[24%] 2xl:auto-cols-[22%]">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}
