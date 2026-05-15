import { NextResponse } from "next/server";
import { z } from "zod";

const updateProductInput = z.object({
  name: z.string().min(2).optional(),
  price: z.number().positive().optional(),
  inventory: z.number().int().min(0).optional(),
  imageUrl: z.string().min(1).optional(),
  size: z.string().max(80).optional(),
  status: z.enum(["Available", "Reserved", "Sold", "In boutique only", "draft", "active", "archived"]).optional()
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const payload = await request.json();
  const parsed = updateProductInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product update", details: parsed.error.flatten() }, { status: 422 });
  }

  return NextResponse.json({
    data: { id, ...parsed.data },
    message: "Product update validated. Wire to Supabase repository for live persistence."
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return NextResponse.json({
    data: { id, deletedAt: new Date().toISOString() },
    message: "Product delete validated. Use soft deletes in production."
  });
}
