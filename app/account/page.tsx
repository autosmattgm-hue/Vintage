import type { Metadata } from "next";
import { AccountDashboard } from "@/components/dashboard/account-dashboard";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Manage Paris Fashion Vintage orders, saved pieces, pickup reservations, and profile details.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: false }
};

export default function AccountPage() {
  return <AccountDashboard />;
}
