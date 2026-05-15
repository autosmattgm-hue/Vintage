"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/components/store/cart-provider";

type AddToCartButtonProps = Omit<ButtonProps, "onClick"> & {
  product: Product;
};

export function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button onClick={() => addItem(product)} disabled={product.inventory < 1} {...props}>
      <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
      {children ?? (product.inventory > 0 ? "Add to cart" : "Sold out")}
    </Button>
  );
}
