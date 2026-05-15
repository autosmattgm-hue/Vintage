import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterInput = z.object({
  email: z.string().email(),
  source: z.string().max(80).default("website")
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = newsletterInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  return NextResponse.json({
    message: "Subscription saved for the boutique newsletter workflow.",
    data: {
      email: parsed.data.email,
      source: parsed.data.source,
      subscribedAt: new Date().toISOString()
    }
  });
}
