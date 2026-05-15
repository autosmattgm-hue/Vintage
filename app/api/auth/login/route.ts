import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = loginInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials payload" }, { status: 422 });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "bonjour@parisfashionvintage.fr";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ParisVintage2026!";
  const isAdminEmail = parsed.data.email.toLowerCase() === adminEmail.toLowerCase();

  if (isAdminEmail && parsed.data.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  }

  if (!isAdminEmail && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Customer auth must use Supabase Auth in production." }, { status: 401 });
  }

  const role = isAdminEmail ? "admin" : "customer";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "development-secret-change-before-production");
  const token = await new SignJWT({
    sub: parsed.data.email,
    role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);

  const response = NextResponse.json({
    user: {
      email: parsed.data.email,
      role
    },
    accessToken: token,
    expiresIn: 900
  });

  response.cookies.set("pfv_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 15
  });

  return response;
}
