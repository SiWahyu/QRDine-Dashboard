import { apiFetch } from "@/lib/client";
import { OrderResponse, OrderType } from "@/types/order";

export async function getOrders(): Promise<OrderType[]> {
  const res = await apiFetch<OrderResponse>("/admin/orders", {
    cache: "no-store",
  });

  return res.data;
}