import type { TableType } from "./table";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export type PaymentMethod = "cash" | "online";

export interface OrderType {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_status: PaymentStatus;
  payment_expired_at: string | null;
  payment_method: PaymentMethod;
  status: OrderStatus;
  total: number;
  created_at: string;
  table: TableType;
}

export interface OrderResponse {
  data: OrderType[];
}

export interface OrderMutationResponse {
  message: string;
  data: OrderType[];
}
