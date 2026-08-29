import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  const { orderNumber } = await params;

  const token = (await cookies()).get("auth_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cashier/orders/${orderNumber}`,
    {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  const body = await res.json();

  if (res.status === 401) {
    const response = NextResponse.json(body, {
      status: 401,
    });

    response.cookies.delete("auth_token");

    return response;
  }

  return NextResponse.json(body, {
    status: res.status,
  });
}
