import type { Metadata } from "next";
import { CollectionPage } from "@/components/store/collection-page";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shoes Collection",
  description: "Shop Parisian leather heels and vintage designer shoes from Paris Fashion Vintage.",
  alternates: { canonical: "/collections/shoes" }
};

export default function ShoesCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Shoes Collection"
      title="Vintage shoes with sculpted elegance."
      description="Parisian leather heels, occasion shoes, and polished silhouettes selected for comfort and drama."
      products={products.filter((product) => product.category === "Shoes")}
    />
  );
}
