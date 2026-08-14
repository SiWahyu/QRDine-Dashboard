"use client";

import { DataTable } from "@/components/data-table/data-table";
import { orderColumns } from "@/features/order/components/OrderColumns";
import type { OrderStatus, OrderType } from "@/types/order";

const STATUS_TABS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const OrderList = ({ orders }: { orders: OrderType[] }) => {
  return (
    <DataTable
      data={orders}
      columns={orderColumns}
      getRowId={(order) => String(order.id)}
      searchKeys={[
        "order_number",
        "customer_name",
        "customer_email",
        "customer_phone",
      ]}
      searchPlaceholder="Search order, customer..."
      filterTabs={[{ columnId: "status", options: STATUS_TABS }]}
      resultLabel="orders"
      emptyMessage="No orders yet"
      emptyDescription="Orders placed by customers will appear here."
      emptyFilteredMessage="No orders match your filters"
      emptyFilteredDescription="Try adjusting your search or filter."
      defaultPageSize={10}
    />
  );
};

export default OrderList;
