import type { Metadata } from "next";
import { ShopExperience } from "@/components/store/shop-experience";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Luxury Vintage Fashion",
  description:
    "Browse curated luxury vintage fashion in Paris, including designer bags, Saint Laurent pieces, jewelry, coats, and shoes.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop Paris Vintage Fashion",
    description: "Designer vintage bags, jewelry, shoes, coats, and curated luxury fashion from Paris."
  }
};

export default function ShopPage() {
  return <ShopExperience products={products} />;
}
