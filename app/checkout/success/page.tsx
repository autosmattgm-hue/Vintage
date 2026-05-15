import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center luxury-section text-center">
      <CheckCircle2 className="h-12 w-12 text-gold-500" aria-hidden="true" />
      <p className="editorial-kicker mt-6 text-xs text-gold-500">Order Reserved</p>
      <h1 className="luxury-section-title mt-4 max-w-2xl font-serif">
        Your vintage piece is being prepared by the boutique.
      </h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        A confirmation email and pickup details will be sent shortly. The boutique team will prepare your
        selected piece for a refined handoff at Port-Royal.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Continue shopping</Link>
      </Button>
    </section>
  );
}
