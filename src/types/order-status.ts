export interface OrderStatusType {
  id: number;
  order_number: string;
  table: string;
  customer_name: string;
  status: string;
  created_at: string;
}

export interface OrderStatusResponse {
  data: OrderStatusType[];
}
