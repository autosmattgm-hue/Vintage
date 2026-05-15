"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { useCart } from "@/components/store/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/designer", label: "Designers" },
  { href: "/collections/bags", label: "Bags" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { lineCount, wishlist } = useCart();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition duration-300",
          scrolled ? "border-b bg-background/82 shadow-sm backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="container flex h-[4.5rem] items-center justify-between gap-2 md:h-20 md:gap-4">
          <Link href="/" className="group flex flex-col" aria-label="Paris Fashion Vintage home">
            <span className="font-serif text-[1.35rem] leading-none tracking-normal xs:text-2xl">
              Paris Fashion Vintage
            </span>
            <span className="editorial-kicker mt-1 text-[0.6rem] text-gold-500">Curated Vintage Luxury</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "luxury-link text-sm text-muted-foreground transition hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Open search" className="hidden xs:inline-flex">
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="hidden sm:inline-flex"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Moon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex">
              <Link href="/wishlist" className="relative">
                <Heart className="h-5 w-5" aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[0.6rem] text-couture-ink">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex">
              <Link href="/account">
                <User className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" aria-label="Cart">
              <Link href="/cart" className="relative">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                {lineCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[0.6rem] text-couture-ink">
                    {lineCount}
                  </span>
                )}
              </Link>
            </Button>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
                <Dialog.Content className="fixed right-0 top-0 z-50 flex h-dvh w-full flex-col overflow-y-auto bg-background/94 p-5 shadow-glass backdrop-blur-xl sm:w-[28rem] sm:p-6">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="font-serif text-3xl">Menu</Dialog.Title>
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <nav className="mt-10 grid gap-5" aria-label="Mobile navigation">
                    {navLinks.map((link) => (
                      <Dialog.Close key={link.href} asChild>
                        <Link href={link.href} className="font-serif text-[clamp(2rem,9vw,3rem)] leading-none">
                          {link.label}
                        </Link>
                      </Dialog.Close>
                    ))}
                  </nav>
                  <div className="mt-auto grid gap-3 border-t pt-6">
                    {[
                      ["/wishlist", "Wishlist"],
                      ["/account", "Account"],
                      ["/cart", "Shopping cart"]
                    ].map(([href, label]) => (
                      <Dialog.Close key={href} asChild>
                        <Link href={href} className="rounded-md border bg-card/70 px-4 py-3 text-sm">
                          {label}
                        </Link>
                      </Dialog.Close>
                    ))}
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-couture-ink/90 p-4 backdrop-blur"
          >
            <div className="container flex min-h-dvh items-start justify-center pt-28 md:pt-32">
              <div className="w-full max-w-2xl rounded-md border border-gold-300/20 bg-background p-5 shadow-glass">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-3xl">Search the boutique</h2>
                  <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Close search">
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
                <form action="/shop" className="mt-5">
                  <Input name="q" placeholder="Saint Laurent bag, gold necklace, leather heels..." autoFocus />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
