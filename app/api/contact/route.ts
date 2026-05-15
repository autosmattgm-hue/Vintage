import { NextResponse } from "next/server";
import { z } from "zod";

const contactInput = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10).max(1200),
  interest: z.string().max(80)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact message", details: parsed.error.flatten() }, { status: 422 });
  }

  return NextResponse.json({
    message: "Merci. The boutique team will reply soon.",
    data: {
      ...parsed.data,
      receivedAt: new Date().toISOString()
    }
  });
}
