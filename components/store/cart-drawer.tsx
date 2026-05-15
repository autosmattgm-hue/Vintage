"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/store/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, subtotal, lineCount, updateQuantity, removeItem, openDrawer } = useCart();

  return (
    <>
      <Button
        onClick={openDrawer}
        className="safe-floating-cart fixed z-40 h-14 w-14 rounded-full shadow-glow"
        size="icon"
        aria-label="Open shopping cart"
      >
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
        {lineCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-xs text-couture-ink">
            {lineCount}
          </span>
        )}
      </Button>

      <Dialog.Root open={drawerOpen} onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
          <Dialog.Content className="fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-background shadow-glass sm:w-[28rem]">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <Dialog.Title className="font-serif text-3xl">Shopping cart</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  {lineCount} {lineCount === 1 ? "piece" : "pieces"} selected
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label="Close cart">
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Dialog.Close>
            </div>

            <div className="flex-1 overflow-auto p-5">
              {lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="font-serif text-3xl">Your cart is waiting.</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Add a one-of-one vintage piece before it leaves the boutique.
                    </p>
                    <Button asChild className="mt-5">
                      <Link href="/shop" onClick={closeDrawer}>
                        Shop the edit
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {lines.map((line) => (
                    <div key={line.product.id} className="grid grid-cols-[78px_1fr] gap-3 xs:grid-cols-[86px_1fr] xs:gap-4">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                        <Image src={line.product.images[0]} alt={line.product.name} fill sizes="86px" className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link href={`/product/${line.product.slug}`} onClick={closeDrawer} className="font-medium">
                              {line.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(line.product.price)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(line.product.id)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-4 inline-flex items-center rounded-md border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.product.id, line.quantity - 1)}
                            className="grid h-9 w-9 place-items-center"
                            aria-label={`Decrease ${line.product.name} quantity`}
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="grid h-9 w-10 place-items-center text-sm">{line.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(line.product.id, line.quantity + 1)}
                            className="grid h-9 w-9 place-items-center"
                            aria-label={`Increase ${line.product.name} quantity`}
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-3xl text-gold-500">{formatCurrency(subtotal)}</span>
                </div>
                <div className="mt-5 grid gap-3">
                  <Button asChild size="lg" onClick={closeDrawer}>
                    <Link href="/checkout">Secure checkout</Link>
                  </Button>
                  <Button asChild variant="outline" onClick={closeDrawer}>
                    <Link href="/cart">View cart</Link>
                  </Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
