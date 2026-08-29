import { OrderStatus, PaymentStatus } from "./order";

export interface CashierItem {
  name: string;
  price: number;
  quantity: number;
}

export interface CashierType {
  id: number;
  order_number: string;
  customer_name: string;
  payment_method: string;
  payment_status: PaymentStatus;
  subtotal: number;
  tax_amount: number;
  service_amount: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  items: CashierItem[];
}

export interface CashierResponse {
  data: CashierType;
}

export interface CashierMutationResponse {
  message: string;
  data: CashierType[];
}
