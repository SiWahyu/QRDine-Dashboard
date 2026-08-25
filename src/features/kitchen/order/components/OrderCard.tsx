import { Clock, NotepadText, Table2, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import type { KitchenOrderType } from "@/types/kitchen-order";
import { PaymentStatusBadge } from "@/features/order/components/StatusBadge";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { dateFormatter } from "@/utils/dateFormatter";

export type OrderData = { order: KitchenOrderType };

export function OrderCard({
  order,
  className,
}: {
  order: KitchenOrderType;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-semibold">{order.order_number}</p>

          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {dateFormatter(order.created_at)}
          </p>
        </div>

        <PaymentStatusBadge status={order.payment_status} />
      </div>

      <div className="mt-3 space-y-1.5 text-sm">
        <p className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-4 shrink-0" />
          <span className="truncate">{order.customer_name}</span>
        </p>

        <p className="flex items-center gap-2 text-muted-foreground">
          <Table2 className="size-4 shrink-0" />
          Meja {order.table}
        </p>
      </div>

      <ul className="mt-3 space-y-2 border-t pt-3">
        {order.items.map((item, index) => (
          <li key={index} className="text-sm">
            <div className="flex items-baseline justify-between gap-2">
              <span className="min-w-0 font-medium">
                {item.name}{" "}
                <span className="text-muted-foreground">×{item.quantity}</span>
              </span>

              <span className="shrink-0 text-muted-foreground">
                {currencyFormatter(item.price * item.quantity)}
              </span>
            </div>

            {item.note && (
              <p className="mt-0.5 flex items-start gap-1.5 text-xs text-muted-foreground italic">
                <NotepadText className="mt-0.5 size-3.5 shrink-0" />
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center justify-between border-t pt-3 font-semibold">
        <span className="text-sm font-medium text-muted-foreground">Total</span>
        {currencyFormatter(order.total)}
      </p>
    </div>
  );
}