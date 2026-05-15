import type { Metadata } from "next";
import { CollectionPage } from "@/components/store/collection-page";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Designer Collections",
  description:
    "Shop curated designer vintage fashion and Saint Laurent vintage pieces from Paris Fashion Vintage.",
  alternates: { canonical: "/collections/designer" }
};

export default function DesignerCollectionsPage() {
  return (
    <CollectionPage
      eyebrow="Designer Collections"
      title="Iconic vintage designers, edited in Paris."
      description="Saint Laurent-inspired tailoring, collectible bags, evening pieces, and refined wardrobe anchors."
      products={products.filter((product) => product.collection === "Designer Icons")}
    />
  );
}
