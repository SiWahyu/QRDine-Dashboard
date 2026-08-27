"use client";

import { Clock, Hash } from "lucide-react";

import { cn } from "@/lib/utils";
import { dateFormatter } from "@/utils/dateFormatter";

import type { OrderStatusColumnConfig } from "./orderStatusConfig";
import { OrderStatusType } from "@/types/order-status";

export function OrderStatusCard({
  order,
  column,
  className,
}: {
  order: OrderStatusType;
  column: OrderStatusColumnConfig;
  className?: string;
}) {
  const StatusIcon = column.cardIcon;

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-foreground/10 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-bold text-foreground">
            {order.table}
          </span>

          <div className="min-w-0  flex flex-col justify-evenly h-18">
            <p className="truncate text-base font-medium leading-tight tracking-tight">
              {order.customer_name}
            </p>

            <p className="mt-1 flex items-center gap-1 truncate text-sm text-muted-foreground">
              <Hash className="size-3.5 shrink-0" />
              {order.order_number}
            </p>
          </div>
        </div>

        <span className={cn("shrink-0", column.accent)}>
          <StatusIcon className="size-5" />
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 border-t border-foreground/10 pt-2.5 text-xs text-muted-foreground tabular-nums">
        <Clock className="size-3.5" />
        {dateFormatter(order.created_at)}
      </p>
    </div>
  );
}
