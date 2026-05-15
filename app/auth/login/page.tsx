import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Paris Fashion Vintage customer account.",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <section className="container grid min-h-screen place-items-center luxury-section">
      <div className="w-full max-w-md">
        <p className="editorial-kicker text-center text-xs text-gold-500">Customer Login</p>
        <h1 className="mt-4 text-center font-serif text-[clamp(3rem,10vw,4rem)] leading-none">Welcome back</h1>
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to the boutique?{" "}
          <Link href="/auth/register" className="luxury-link text-foreground">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
