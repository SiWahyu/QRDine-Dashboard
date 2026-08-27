import { useState } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { toast } from "sonner";

import type { KitchenOrderType } from "@/types/kitchen-order";

import { OrderCard, type OrderData } from "./OrderCard";
import { OrderColumn } from "./OrderColumn";
import {
  COLUMNS,
  STATUS_LABEL,
  groupOrders,
  type KitchenStatus,
  type Orders,
} from "./orderBoardConfig";
import { updateOrderStatusAction } from "../actions/order-action";

export function OrderBoardContent({ data }: { data: KitchenOrderType[] }) {
  const [orders, setOrders] = useState<Orders>(() => groupOrders(data));
  const [prevData, setPrevData] = useState(data);

  if (prevData !== data) {
    setPrevData(data);
    setOrders(groupOrders(data));
  }

  return (
    <DragDropProvider<OrderData>
      onDragEnd={async (event) => {
        const { source, target } = event.operation;

        if (!source || !target) return;

        const sourceId = Number(source.id);

        if (Number.isNaN(sourceId)) return;

        const newStatus = target.id as KitchenStatus;

        setOrders((prev) => {
          const sourceColumn = COLUMNS.find((column) =>
            prev[column.id].some((order) => order.id === sourceId),
          )?.id;

          if (!sourceColumn || sourceColumn === newStatus) return prev;

          const order = prev[sourceColumn].find(
            (order) => order.id === sourceId,
          );

          if (!order) return prev;

          return {
            ...prev,
            [sourceColumn]: prev[sourceColumn].filter(
              (order) => order.id !== sourceId,
            ),
            [newStatus]: [...prev[newStatus], order],
          };
        });

        const order = data.find((order) => order.id === sourceId);

        if (!order || order.status === newStatus) return;

        const result = await updateOrderStatusAction(order.id, newStatus);

        if (!result.success) {
          toast.error(result.message, { position: "top-right" });
          return;
        }

        toast.success(
          `${order.order_number} moved to ${STATUS_LABEL[newStatus]}`,
          { position: "top-right" },
        );
      }}
    >
      <div className="grid h-[calc(100dvh-4rem)] grid-cols-1 gap-4 py-4 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <OrderColumn
            key={column.id}
            column={column}
            orders={orders[column.id]}
          />
        ))}
      </div>

      <DragOverlay>
        {(source) => (
          <OrderCard
            order={source.data.order}
            className=" scale-[1.02] cursor-grabbing shadow-xl"
          />
        )}
      </DragOverlay>
    </DragDropProvider>
  );
}
