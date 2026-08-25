import { useMutation } from "@tanstack/react-query";
import { updateTable } from "../services/table.service";
import { TableFormValues } from "../schemas/tableSchema";

export const useUpdateTable = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TableFormValues }) =>
      updateTable(id, data),
  });
};
