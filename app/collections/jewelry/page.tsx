import type { Metadata } from "next";
import { CollectionPage } from "@/components/store/collection-page";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Jewelry Collection",
  description: "Shop vintage jewelry, gold necklaces, earrings, and statement accessories in Paris.",
  alternates: { canonical: "/collections/jewelry" }
};

export default function JewelryCollectionPage() {
  return (
    <CollectionPage
      eyebrow="Jewelry Collection"
      title="Gold details for modern vintage wardrobes."
      description="Elegant vintage necklaces, earrings, and sculptural accessories curated for gifting and occasion styling."
      products={products.filter((product) => product.category === "Jewelry")}
    />
  );
}
