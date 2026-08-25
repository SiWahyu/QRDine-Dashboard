import { apiFetch } from "@/lib/client";
import {
  SingleTableResponse,
  TableMutationResponse,
  TableResponse,
} from "@/types/table";
import { TableFormValues } from "../schemas/tableSchema";

export const getTables = async () => {
  const res = await apiFetch<TableResponse>("/admin/tables", {
    cache: "no-store",
  });

  return res.data;
};

export const createTable = async (data: TableFormValues) => {
  const res = await apiFetch<TableMutationResponse>("/admin/tables", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res.data;
};

export const getTableById = async (id: string) => {
  const res = await apiFetch<SingleTableResponse>(`/admin/tables/${id}`, {
    cache: "no-store",
  });

  return res.data;
};

export const updateTable = async (id: number, data: TableFormValues) => {
  const res = await apiFetch<TableMutationResponse>(`/admin/tables/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return res.data;
};
