import { NextResponse } from "next/server";
import { z } from "zod";

const appointmentInput = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  date: z.string().min(8),
  time: z.string().min(2),
  service: z.string().min(2),
  message: z.string().max(800).optional()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = appointmentInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid appointment request", details: parsed.error.flatten() }, { status: 422 });
  }

  return NextResponse.json(
    {
      data: {
        id: crypto.randomUUID(),
        status: "requested",
        ...parsed.data
      },
      message: "Appointment request received. Connect Supabase or email automation for live notifications."
    },
    { status: 201 }
  );
}
