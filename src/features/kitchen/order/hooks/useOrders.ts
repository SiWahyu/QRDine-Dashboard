import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/order-client.service";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};
