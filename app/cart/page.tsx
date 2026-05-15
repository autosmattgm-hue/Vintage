import type { Metadata } from "next";
import { CartPageClient } from "@/components/store/cart-page-client";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your Paris Fashion Vintage cart before secure checkout.",
  alternates: { canonical: "/cart" }
};

export default function CartPage() {
  return <CartPageClient />;
}
