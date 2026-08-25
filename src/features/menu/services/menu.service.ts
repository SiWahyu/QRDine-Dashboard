import { apiFetch } from "@/lib/client";
import {
  MenuMutationResponse,
  MenuResponse,
  SingleMenuResponse,
} from "@/types/menu";
import {
  CreateMenuFormOutput,
  UpdateMenuFormOutput,
} from "../schemas/menuSchema";

export const getMenus = async () => {
  const res = await apiFetch<MenuResponse>("/admin/menus", {
    cache: "no-store",
  });

  return res.data;
};

export const createMenu = async (data: CreateMenuFormOutput) => {
  const formData = new FormData();

  formData.append("category_id", String(data.category_id));
  formData.append("name", data.name);
  formData.append("description", String(data.description) ?? "");
  formData.append("price", String(data.price));
  formData.append("is_available", data.is_available ? "1" : "0");

  if (data.image[0]) {
    formData.append("image", data.image[0]);
  }

  const res = await apiFetch<MenuMutationResponse>("/admin/menus", {
    method: "POST",
    body: formData,
  });

  return res.data;
};

export const getMenuById = async (id: string) => {
  const res = await apiFetch<SingleMenuResponse>(`/admin/menus/${id}`, {
    cache: "no-store",
  });

  return res.data;
};

export const updateMenu = async (id: number, data: UpdateMenuFormOutput) => {
  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("category_id", String(data.category_id));
  formData.append("name", data.name);
  formData.append("description", data.description ?? "");
  formData.append("price", String(data.price));
  formData.append("is_available", data.is_available ? "1" : "0");

  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }

  const res = await apiFetch<MenuMutationResponse>(`/admin/menus/${id}`, {
    method: "POST",
    body: formData,
  });

  return res.data;
};
