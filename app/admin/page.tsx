import type { Metadata } from "next";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage Paris Fashion Vintage products, inventory, orders, customers, coupons, and analytics.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return <AdminDashboard />;
}
