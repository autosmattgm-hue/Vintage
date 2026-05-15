import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "outline" | "gold";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium transition",
        variant === "default" && "border-transparent bg-couture-ink text-couture-cream dark:bg-couture-cream dark:text-couture-ink",
        variant === "outline" && "border-gold-300/40 text-foreground",
        variant === "gold" && "border-gold-300 bg-gold-300 text-couture-ink",
        className
      )}
      {...props}
    />
  );
}
