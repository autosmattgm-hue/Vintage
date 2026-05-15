import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    revenue: 48260,
    conversionRate: 4.8,
    averageOrderValue: 684,
    orders: 71,
    emailSubscribers: 1428,
    inventoryTurnover: 2.7,
    topCategories: [
      { name: "Bags", revenue: 18300 },
      { name: "Designer Icons", revenue: 12800 },
      { name: "Jewelry", revenue: 9100 },
      { name: "Shoes", revenue: 8060 }
    ]
  });
}
