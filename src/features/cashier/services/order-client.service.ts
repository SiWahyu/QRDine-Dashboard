import { clientFetch } from "@/lib/client-fetch";
import { CashierResponse } from "@/types/cashier";

export const searchOrder = async (orderNumber: string) => {
  const res = await clientFetch<CashierResponse>(
    `/cashier/orders/${orderNumber}`,
  );

  return res.data;
};
