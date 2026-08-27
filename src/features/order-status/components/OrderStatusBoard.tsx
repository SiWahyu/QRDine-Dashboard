"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OrderStatusBoardContent } from "./OrderStatusBoardContent";
import { OrderStatusBoardSkeleton } from "./OrderStatusBoardSkeleton";
import { useOrderStatus } from "../hooks/useOrderStatus";
import OrderStatusEventListener from "./OrderStatusEventListener";

export default function OrderStatusBoard() {
  const { data, isLoading, isError, refetch } = useOrderStatus();

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-muted/40">
      <OrderStatusEventListener />
      <header className="shrink-0 border-b border-foreground/10 bg-background px-4 py-3 sm:px-6">
        <h1 className="text-lg font-bold tracking-tight">Order Status</h1>
        <p className="text-sm text-muted-foreground">
          Pantau status pesanan pelanggan secara langsung
        </p>
      </header>

      <main className="min-h-0 flex-1">
        {isLoading ? (
          <OrderStatusBoardSkeleton />
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <p className="text-sm text-muted-foreground">
              Gagal memuat pesanan.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw />
              Muat Ulang
            </Button>
          </div>
        ) : data ? (
          <OrderStatusBoardContent data={data.data} />
        ) : null}
      </main>
    </div>
  );
}
