"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { echo } from "@/lib/echo";

export function OrderEventListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!echo) return;

    const channel = echo.channel("orders");

    channel.listen(".order.created", () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    });

    channel.listen(".order.updated", () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    });

    return () => {
      echo?.leave("orders");
    };
  }, [queryClient]);

  return null;
}

export default OrderEventListener;
