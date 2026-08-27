import { clientFetch } from "@/lib/client-fetch";
import { KitchenOrderResponse, KitchenOrderType } from "@/types/kitchen-order";

export async function getOrders(): Promise<KitchenOrderType[]> {
  const res = await clientFetch<KitchenOrderResponse>("/kitchen/orders", {
    cache: "no-store",
  });

  return res.data;
}
