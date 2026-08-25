"use client";

import { useOrders } from "../hooks/useOrders";

import { OrderBoardContent } from "./OrderBoardContent";
import { OrderBoardError } from "./OrderBoardError";
import { OrderBoardSkeleton } from "./OrderBoardSkeleton";

export default function OrderBoard() {
  const { data, isLoading, isError, refetch } = useOrders();

  if (isLoading) {
    return <OrderBoardSkeleton />;
  }

  if (isError) {
    return <OrderBoardError onRetry={() => refetch()} />;
  }

  if (!data) {
    return null;
  }

  return <OrderBoardContent data={data} />;
}