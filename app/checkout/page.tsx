import type { Metadata } from "next";
import { CheckoutClient } from "@/components/store/checkout-client";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete a secure checkout for curated luxury vintage fashion with Stripe-ready payments.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false }
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
