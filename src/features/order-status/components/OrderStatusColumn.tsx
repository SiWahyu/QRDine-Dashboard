import { PackageOpen } from "lucide-react";

import { OrderStatusCard } from "./OrderStatusCard";
import type { OrderStatusColumnConfig } from "./orderStatusConfig";
import { OrderStatusType } from "@/types/order-status";

export function OrderStatusColumn({
  column,
  orders,
}: {
  column: OrderStatusColumnConfig;
  orders: OrderStatusType[];
}) {
  const Icon = column.icon;

  return (
    <section className="flex h-full min-h-[60vh] flex-col overflow-hidden rounded-2xl border-2 border-foreground/15 bg-card shadow-sm md:min-h-0">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-foreground/10 bg-muted/40 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-4" />
          </span>
          <h2 className="text-sm font-semibold text-foreground">
            {column.title}
          </h2>
        </div>

        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-semibold tabular-nums text-muted-foreground">
          {orders.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-foreground/20 p-8 text-center text-sm text-muted-foreground">
            <PackageOpen className="size-5" />
            Belum ada pesanan
          </div>
        ) : (
          orders.map((order) => (
            <OrderStatusCard key={order.id} order={order} column={column} />
          ))
        )}
      </div>
    </section>
  );
}
