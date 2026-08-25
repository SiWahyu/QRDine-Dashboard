import { useDraggable } from "@dnd-kit/react";

import { cn } from "@/lib/utils";
import type { KitchenOrderType } from "@/types/kitchen-order";

import { OrderCard, type OrderData } from "./OrderCard";

export function OrderItem({ order }: { order: KitchenOrderType }) {
  const { ref, isDragging } = useDraggable<OrderData>({
    id: order.id,
    data: { order },
  });

  return (
    <div
      ref={ref}
      className={cn(
        "cursor-grab transition-opacity active:cursor-grabbing",
        isDragging && "opacity-50",
      )}
    >
      <OrderCard order={order} />
    </div>
  );
}