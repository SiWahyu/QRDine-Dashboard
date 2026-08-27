import { OrderStatusResponse } from "@/types/order-status";

export async function getOrderStatus() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/orders-status",
    {
      cache: "no-store",
    },
  );

  const data: OrderStatusResponse = await res.json();

  return data;
}
