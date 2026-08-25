import { useDroppable } from "@dnd-kit/react";
import { PackageOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import type { KitchenOrderType } from "@/types/kitchen-order";

import { OrderItem } from "./OrderItem";
import type { ColumnConfig } from "./orderBoardConfig";

export function OrderColumn({
  column,
  orders,
}: {
  column: ColumnConfig;
  orders: KitchenOrderType[];
}) {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    collisionPriority: 0,
  });

  const Icon = column.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors",
        isDropTarget ? "border-ring bg-muted/60" : "border-border",
      )}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">{column.title}</h2>
        </div>

        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
          {orders.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border dark:[&::-webkit-scrollbar-track]:bg-muted/50 dark:[&::-webkit-scrollbar-thumb]:bg-border">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            <PackageOpen className="size-5" />
            No orders
          </div>
        ) : (
          orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}