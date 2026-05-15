import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";

const productInput = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  category: z.string().min(2),
  designer: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  imageUrl: z.string().min(1).optional(),
  inventory: z.number().int().min(0).default(1),
  size: z.string().max(80).optional(),
  status: z.enum(["Available", "Reserved", "Sold", "In boutique only"]).default("Available")
});

export async function GET() {
  return NextResponse.json({
    data: products,
    meta: {
      total: products.length,
      source: "static-demo",
      backend: "Supabase-ready"
    }
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = productInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product payload", details: parsed.error.flatten() }, { status: 422 });
  }

  return NextResponse.json(
    {
      data: {
        id: crypto.randomUUID(),
        ...parsed.data
      },
      message: "Product accepted. Connect Supabase service role for persistent writes and Cloudinary image URLs."
    },
    { status: 201 }
  );
}
