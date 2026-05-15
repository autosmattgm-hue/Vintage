import type { Metadata } from "next";
import { WishlistPageClient } from "@/components/store/wishlist-page-client";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Review your saved designer vintage fashion pieces from Paris Fashion Vintage.",
  alternates: { canonical: "/wishlist" }
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
