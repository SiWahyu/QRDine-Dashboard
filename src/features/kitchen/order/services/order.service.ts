import { clientFetch } from "@/lib/client-fetch";
import {
  KitchenOrderMutationResponse,
  KitchenOrderResponse,
  KitchenOrderType,
} from "@/types/kitchen-order";
import type { OrderStatus } from "@/types/order";

export async function getOrders(): Promise<KitchenOrderType[]> {
  const res = await clientFetch<KitchenOrderResponse>("/kitchen/orders", {
    cache: "no-store",
  });

  return res.data;
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  const res = await clientFetch<KitchenOrderMutationResponse>(
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
