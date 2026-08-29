import { apiFetch } from "@/lib/client";
import { CashierMutationResponse } from "@/types/cashier";

export async function checkoutOrder(orderNumber: string) {
  const res = await apiFetch<CashierMutationResponse>(
    `/cashier/orders/${orderNumber}/checkout`,
    {
      method: "PATCH",
    },
  );

  return res.data;
}
