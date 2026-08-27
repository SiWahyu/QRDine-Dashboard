"use server";

import { cookies } from "next/headers";

export async function loginAction(credentials: {
  email: string;
  password: string;
}) {
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
    return {
      success: false,
      status: res.status,
      message: body.message,
      errors: body.errors,
    };
  }

  const { user, token } = body.data;

  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    user,
  };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  cookieStore.delete("auth_token");

  return {
    success: true,
  };
}
