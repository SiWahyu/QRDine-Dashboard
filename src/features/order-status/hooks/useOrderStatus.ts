import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "../services/order-status.service";

export const useOrderStatus = () => {
  return useQuery({
    queryKey: ["orders-status"],
    queryFn: getOrderStatus,
  });
};
