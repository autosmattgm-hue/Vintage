import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="editorial-kicker text-xs text-gold-300">Paris Fashion Vintage</p>
      <h1 className="luxury-section-title mt-5 max-w-2xl font-serif text-foreground">
        This piece has already found a new wardrobe.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Explore the current collection of curated designer vintage pieces in the Paris boutique.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Return to the shop</Link>
      </Button>
    </section>
  );
}
