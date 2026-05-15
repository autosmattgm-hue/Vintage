import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Paris Fashion Vintage customer account for wishlist, cart, and order history.",
  robots: { index: false, follow: false }
};

export default function RegisterPage() {
  return (
    <section className="container grid min-h-screen place-items-center luxury-section">
      <div className="w-full max-w-md">
        <p className="editorial-kicker text-center text-xs text-gold-500">Private Wardrobe</p>
        <h1 className="mt-4 text-center font-serif text-[clamp(3rem,10vw,4rem)] leading-none">Create your account</h1>
        <AuthForm mode="register" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/auth/login" className="luxury-link text-foreground">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
