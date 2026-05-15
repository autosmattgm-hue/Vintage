import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerInput = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = registerInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration payload" }, { status: 422 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "development-secret-change-before-production");
  const token = await new SignJWT({
    sub: parsed.data.email,
    role: "customer",
    hashPreview: passwordHash.slice(0, 12)
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);

  const response = NextResponse.json(
    {
      user: {
        email: parsed.data.email,
        role: "customer"
      },
      accessToken: token,
      message: "Registration accepted. Connect Supabase Auth for persistent users."
    },
    { status: 201 }
  );

  response.cookies.set("pfv_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15
  });

  return response;
}
