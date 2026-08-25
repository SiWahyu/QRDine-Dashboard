import type { OrderType } from "./order";

export interface KitchenOrderItemType {
  name: string;
  price: number;
  quantity: number;
  note: string | null;
}

export interface KitchenOrderType
  extends Omit<
    OrderType,
    "table" | "customer_email" | "customer_phone" | "payment_expired_at"
  > {
  table: string;
  items: KitchenOrderItemType[];
}

export interface KitchenOrderResponse {
  data: KitchenOrderType[];
}

export interface KitchenOrderMutationResponse {
  message: string;
  data: KitchenOrderType;
}