import { useMutation } from "@tanstack/react-query";
import { updateMenu } from "../services/menu.service";
import { UpdateMenuFormOutput } from "../schemas/menuSchema";

export const useUpdateMenu = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuFormOutput }) =>
      updateMenu(id, data),
  });
};
