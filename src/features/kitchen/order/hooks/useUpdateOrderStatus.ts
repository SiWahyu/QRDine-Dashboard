import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { OrderStatus } from "@/types/order";
import { updateOrderStatus } from "../services/order-server.service";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      updateOrderStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
}
