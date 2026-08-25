import { getOrders } from "@/features/order/services/order.service";
import OrderList from "@/features/order/components/OrderList";

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Order</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer orders, payments, and statuses.
          </p>
        </div>
      </div>

      <OrderList orders={orders} />
    </div>
  );
}
