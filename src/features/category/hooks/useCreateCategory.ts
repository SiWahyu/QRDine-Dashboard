import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../services/category.service";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};
