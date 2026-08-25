import { ApiError } from "./api-error";

export async function clientFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options?.headers,
    },
  });

  if (res.status === 401) {
    window.location.href = "/login?reason=session_expired";
    throw new ApiError(401, "Unauthenticated");
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
