export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig },
): Promise<T> {
  const isFormData = options?.body instanceof FormData;

  console.log("API REQUEST:", {
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${path}`,
    method: options?.method ?? "GET",
    body: options?.body,
    headers: options?.headers,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api${path}`,
    {
      ...options,
      headers: {
        Accept: "application/json",

        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),

        ...options?.headers,
      },
    },
  );

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
