import { useMutation } from "@tanstack/react-query";
import { createMenu } from "../services/menu.service";

export const useCreateMenu = () => {
  return useMutation({
    mutationFn: createMenu,
  });
};
