import { apiFetch } from "@/lib/client";
import { KitchenOrderMutationResponse } from "@/types/kitchen-order";
import { OrderStatus } from "@/types/order";

export async function updateOrderStatus(id: number, status: OrderStatus) {
  const res = await apiFetch<KitchenOrderMutationResponse>(
    `/kitchen/orders/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    },
  );

  return res.data;
}
