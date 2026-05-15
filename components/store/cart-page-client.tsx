"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/store/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartPageClient() {
  const { lines, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <section className="container luxury-section">
      <div className="max-w-3xl">
        <p className="editorial-kicker text-xs text-gold-500">Cart</p>
        <h1 className="luxury-page-title mt-4 font-serif">Review your selection.</h1>
      </div>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-md border bg-card p-10 text-center">
          <h2 className="font-serif text-4xl">Your cart is empty.</h2>
          <p className="mt-3 text-muted-foreground">Start with the latest Paris boutique arrivals.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Shop now</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
          <div className="space-y-5">
            {lines.map((line) => (
              <div key={line.product.id} className="grid gap-4 rounded-md border bg-card p-4 sm:grid-cols-[130px_1fr_auto]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                  <Image src={line.product.images[0]} alt={line.product.name} fill sizes="130px" className="object-cover" />
                </div>
                <div>
                  <p className="editorial-kicker text-[0.65rem] text-gold-500">{line.product.designer}</p>
                  <Link href={`/product/${line.product.slug}`} className="mt-2 block font-serif text-3xl">
                    {line.product.name}
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground">{line.product.condition}</p>
                  <div className="mt-5 inline-flex items-center rounded-md border">
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                      className="grid h-10 w-10 place-items-center"
                      aria-label={`Decrease ${line.product.name} quantity`}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="grid h-10 w-11 place-items-center text-sm">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                      className="grid h-10 w-10 place-items-center"
                      aria-label={`Increase ${line.product.name} quantity`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="font-serif text-3xl text-gold-500">{formatCurrency(line.product.price * line.quantity)}</p>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(line.product.id)} aria-label="Remove item">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-md border bg-card p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-4xl">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paris pickup</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-serif text-3xl">
                <span>Total</span>
                <span className="text-gold-500">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </aside>
        </div>
      )}
    </section>
  );
}
