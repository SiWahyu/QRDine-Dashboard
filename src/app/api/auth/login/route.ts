import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const credentials = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  const body = await res.json();

  if (!res.ok) {
    return NextResponse.json(body, {
      status: res.status,
    });
  }

  const { user, token } = body.data;

  const response = NextResponse.json({ user });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
