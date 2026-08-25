import { LoginFormValues } from "../schemas/loginSchema";

export async function loginUser(data: LoginFormValues) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? "Login gagal");
  }

  return result;
}

export async function logoutUser() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message ?? "Logout gagal");
  }

  return result;
}
