import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("auth_token");
      return response;
    }

    const { user } = await res.json();

    if (!user?.role) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname.startsWith("/kitchen") && user.role !== "kitchen") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    if (pathname.startsWith("/dashboard") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/kitchen/:path*", "/dashboard/:path*"],
};
