import { apiFetch } from "@/lib/client";
import { MenuResponse } from "@/types/menu";

export const getMenus = async () => {
  const res = await apiFetch<MenuResponse>("/admin/menus", {
    cache: "no-store",
  });

  return res.data;
};
