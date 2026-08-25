import { useMutation } from "@tanstack/react-query";
import { createTable } from "../services/table.service";

export const useCreateTable = () => {
  return useMutation({
    mutationFn: createTable,
  });
};
