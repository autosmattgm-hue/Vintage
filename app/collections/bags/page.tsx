import type { Metadata } from "next";
import { CollectionPage } from "@/components/store/collection-page";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Vintage Bags Collection",
  description: "Shop designer vintage bags in Paris, including structured leather and evening pieces.",
  alternates: { canonical: "/collections/bags" }
};

export default function BagsCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Vintage Bags"
      title="Designer bags with Parisian restraint."
      description="Collectible leather bags, evening minis, and everyday investment pieces with one-of-one availability."
      products={products.filter((product) => product.category === "Bags")}
    />
  );
}
