"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { echo } from "@/lib/echo";

export function OrderStatusEventListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!echo) {
      console.log("❌ Echo tidak ada");
      return;
    }

    const channel = echo.channel("orders");

    channel.listen(".order.created", () => {
      queryClient.invalidateQueries({
        queryKey: ["orders-status"],
      });
    });

    channel.listen(".order.updated", () => {
      queryClient.invalidateQueries({
        queryKey: ["orders-status"],
      });
    });

    return () => {
      echo?.leave("orders");
    };
  }, [queryClient]);

  return null;
}

export default OrderStatusEventListener;
