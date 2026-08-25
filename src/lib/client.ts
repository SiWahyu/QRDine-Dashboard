import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "./api-error";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${path}`,
    {
      ...options,
      headers: {
        Accept: "application/json",
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    },
  );

  if (res.status === 401) {
    redirect("/auth/login?reason=session_expired");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      body.message ?? "Request failed",
      body.errors,
    );
  }

  return res.json() as Promise<T>;
}
