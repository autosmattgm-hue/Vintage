import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("pfv_session")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "development-secret-change-before-production");
    const { payload } = await jwtVerify(token, secret);

    if (payload.role === "admin") {
      return NextResponse.next();
    }
  } catch {
    // Invalid sessions fall through to the login redirect below.
  }

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"]
};
