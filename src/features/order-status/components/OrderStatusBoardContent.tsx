import { useState } from "react";

import { OrderStatusColumn } from "./OrderStatusColumn";
import {
  ORDER_STATUS_COLUMNS,
  groupOrders,
  type Orders,
} from "./orderStatusConfig";
import { OrderStatusType } from "@/types/order-status";

export function OrderStatusBoardContent({ data }: { data: OrderStatusType[] }) {
  const [orders, setOrders] = useState<Orders>(() => groupOrders(data));
  const [prevData, setPrevData] = useState(data);

  if (prevData !== data) {
    setPrevData(data);
    setOrders(groupOrders(data));
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-3 md:overflow-hidden">
      {ORDER_STATUS_COLUMNS.map((column) => (
        <OrderStatusColumn
          key={column.id}
          column={column}
          orders={orders[column.id]}
        />
      ))}
    </div>
  );
}
