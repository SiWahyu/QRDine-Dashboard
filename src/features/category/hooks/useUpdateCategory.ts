import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../services/category.service";
import { CategoryFormValues } from "../schemas/categorySchema";

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryFormValues }) =>
      updateCategory(id, data),
  });
};
