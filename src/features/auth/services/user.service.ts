import { apiFetch } from "@/lib/client";
import { UserProfileResponse } from "@/types/user";

export async function getCurrentUser() {
  const { user } = await apiFetch<UserProfileResponse>("/me");

  return user;
}
