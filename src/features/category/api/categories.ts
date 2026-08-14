import { apiFetch } from "@/lib/client";
import { CategoryResponse } from "@/types/category";

export const getCategories = async () => {
  const res = await apiFetch<CategoryResponse>("/admin/categories", {
    cache: "no-store",
  });

  return res.data;
};
