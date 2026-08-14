import { apiFetch } from "@/lib/client";
import { TableResponse } from "@/types/table";

export const getTables = async () => {
  const res = await apiFetch<TableResponse>("/admin/tables", {
    cache: "no-store",
  });

  return res.data;
};
