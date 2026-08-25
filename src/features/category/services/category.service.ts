import { apiFetch } from "@/lib/client";
import {
  CategoryMutationResponse,
  CategoryResponse,
  SingleCategoryResponse,
} from "@/types/category";
import { CategoryFormValues } from "../schemas/categorySchema";

export const getCategories = async () => {
  const res = await apiFetch<CategoryResponse>("/admin/categories", {
    cache: "no-store",
  });

  return res.data;
};

export const createCategory = async (data: CategoryFormValues) => {
  const res = await apiFetch<CategoryMutationResponse>("/admin/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res.data;
};

export const getCategoryById = async (id: string) => {
  const res = await apiFetch<SingleCategoryResponse>(
    `/admin/categories/${id}`,
    {
      cache: "no-store",
    },
  );

  return res.data;
};

export const updateCategory = async (id: number, data: CategoryFormValues) => {
  const res = await apiFetch<CategoryMutationResponse>(
    `/admin/categories/${id}`,
    {
      body: JSON.stringify(data),
      method: "PUT",
    },
  );

  return res.data;
};
