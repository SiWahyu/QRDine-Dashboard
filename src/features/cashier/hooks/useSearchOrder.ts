import { useMutation } from "@tanstack/react-query";
import { ApiError } from "@/lib/api-error";
import { CashierType } from "@/types/cashier";
import { searchOrder } from "../services/order-client.service";

export const useSearchOrder = () => {
  return useMutation<CashierType, ApiError, string>({
    mutationFn: (orderNumber: string) => searchOrder(orderNumber),
  });
};
