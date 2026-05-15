"use client";

import { CalendarCheck, Heart, PackageCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { useCart } from "@/components/store/cart-provider";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "PFV-1048",
    date: "May 12, 2026",
    status: "Ready for pickup",
    total: "€1,280",
    item: "Vintage Saint Laurent Bag"
  },
  {
    id: "PFV-1019",
    date: "April 28, 2026",
    status: "Completed",
    total: "€220",
    item: "Gold Luxe Necklace"
  }
];

export function AccountDashboard() {
  const { wishlist } = useCart();

  return (
    <section className="container luxury-section">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
        <div>
          <p className="editorial-kicker text-xs text-gold-500">Customer Account</p>
          <h1 className="luxury-page-title mt-4 font-serif">Your private wardrobe.</h1>
          <p className="luxury-lead mt-6 text-muted-foreground">
            Track orders, pickup reservations, saved pieces, and styling preferences in one place.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [PackageCheck, "2", "Orders"],
            [Heart, String(wishlist.length), "Saved"],
            [CalendarCheck, "1", "Pickup"],
            [UserRound, "VIP", "Tier"]
          ].map(([Icon, value, label]) => (
            <div key={label as string} className="rounded-md border bg-card p-5">
              <Icon className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <p className="mt-4 font-serif text-4xl">{value as string}</p>
              <p className="text-sm text-muted-foreground">{label as string}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
        <div className="rounded-md border bg-card p-6">
          <h2 className="font-serif text-4xl">Recent orders</h2>
          <div className="mt-6">
            <table className="responsive-table-card text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 font-medium">Order</th>
                  <th className="py-3 font-medium">Piece</th>
                  <th className="py-3 font-medium">Date</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td data-label="Order" className="py-4 font-medium">{order.id}</td>
                    <td data-label="Piece" className="py-4">{order.item}</td>
                    <td data-label="Date" className="py-4 text-muted-foreground">{order.date}</td>
                    <td data-label="Status" className="py-4">{order.status}</td>
                    <td data-label="Total" className="py-4 text-right">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="rounded-md border bg-card p-6">
          <h2 className="font-serif text-4xl">Styling profile</h2>
          <div className="mt-5 space-y-4 text-sm">
            {[
              ["Favorite designers", "Saint Laurent, French vintage"],
              ["Preferred pieces", "Bags, jewelry, tailoring"],
              ["Pickup location", "Port-Royal boutique"],
              ["Newsletter", "Private drop alerts"]
            ].map(([term, detail]) => (
              <div key={term} className="flex justify-between gap-4 border-b pb-3 last:border-0">
                <span className="text-muted-foreground">{term}</span>
                <span className="text-right font-medium">{detail}</span>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/contact">Request styling help</Link>
          </Button>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="luxury-card-title font-serif">Saved pieces</h2>
        {wishlist.length > 0 ? (
          <div className="mt-8 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
            {wishlist.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-md border bg-card p-8 text-center">
            <p className="text-muted-foreground">Save favorite pieces to build your private boutique edit.</p>
            <Button asChild className="mt-5">
              <Link href="/shop">Browse new arrivals</Link>
            </Button>
          </div>
        )}
      </section>
    </section>
  );
}
