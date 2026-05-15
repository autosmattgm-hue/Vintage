"use client";

import { LockKeyhole, ShieldCheck, TicketPercent } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/components/store/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CheckoutClient() {
  const { lines, subtotal, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          discountCode,
          items: lines.map((line) => ({ productId: line.product.id, quantity: line.quantity }))
        })
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Checkout could not be started.");
      }

      clearCart();
      window.location.href = payload.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout could not be started.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container grid gap-10 luxury-section lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)]">
      <div>
        <p className="editorial-kicker text-xs text-gold-500">Checkout</p>
        <h1 className="luxury-page-title mt-4 font-serif">Secure your piece.</h1>
        <div className="mt-10 rounded-md border bg-card p-6">
          <h2 className="font-serif text-4xl">Customer details</h2>
          <div className="mt-6 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discountCode">Discount code</Label>
              <div className="relative">
                <TicketPercent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="discountCode"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  placeholder="PARIS10"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
              In-store pickup is available at 68 Bd de Port-Royal. Secure card payment and boutique pickup
              details are prepared in one smooth checkout flow.
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              size="lg"
              onClick={handleCheckout}
              disabled={loading || lines.length === 0 || !email}
              className="w-full"
            >
              <LockKeyhole className="mr-2 h-4 w-4" aria-hidden="true" />
              {loading ? "Opening secure checkout..." : "Pay securely"}
            </Button>
          </div>
        </div>
      </div>

      <aside className="h-fit rounded-md border bg-card p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-4xl">Order summary</h2>
        <div className="mt-6 space-y-4">
          {lines.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            lines.map((line) => (
              <div key={line.product.id} className="flex justify-between gap-4 text-sm">
                <span>
                  {line.product.name} × {line.quantity}
                </span>
                <span>{formatCurrency(line.product.price * line.quantity)}</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-serif text-4xl text-gold-500">{formatCurrency(subtotal)}</span>
          </div>
        </div>
        <div className="mt-6 flex gap-3 rounded-md bg-muted p-4 text-sm text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
          Payments are prepared for Stripe with discount codes, secure checkout, and order confirmation support.
        </div>
      </aside>
    </section>
  );
}
