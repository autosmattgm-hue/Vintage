"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/components/store/cart-provider";
import { cn } from "@/lib/utils";

type WishlistButtonProps = Omit<ButtonProps, "onClick"> & {
  product: Product;
  label?: string;
};

export function WishlistButton({ product, label, className, size, ...props }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useCart();
  const active = isWishlisted(product.id);
  const iconOnly = size === "icon";

  return (
    <Button
      aria-pressed={active}
      onClick={() => toggleWishlist(product)}
      className={cn(active && "border-gold-300 text-gold-500", className)}
      size={size}
      {...props}
    >
      <Heart className={cn("h-4 w-4", !iconOnly && "mr-2", active && "fill-gold-500")} aria-hidden="true" />
      {!iconOnly && (label ?? (active ? "Saved" : "Wishlist"))}
    </Button>
  );
}
