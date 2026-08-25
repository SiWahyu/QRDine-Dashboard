import {
  CheckCircle2,
  ChefHat,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";
import type { KitchenOrderType } from "@/types/kitchen-order";

export type KitchenStatus = Extract<
  OrderStatus,
  "confirmed" | "preparing" | "completed"
>;

export type Orders = Record<KitchenStatus, KitchenOrderType[]>;

export type ColumnConfig = {
  id: KitchenStatus;
  title: string;
  icon: LucideIcon;
};

export const COLUMNS: ColumnConfig[] = [
  { id: "confirmed", title: "Confirmed", icon: CircleCheck },
  { id: "preparing", title: "Preparing", icon: ChefHat },
  { id: "completed", title: "Completed", icon: CheckCircle2 },
];

export const STATUS_LABEL: Record<KitchenStatus, string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  completed: "Completed",
};

export function groupOrders(orders: KitchenOrderType[]): Orders {
  return {
    confirmed: orders.filter((order) => order.status === "confirmed"),
    preparing: orders.filter((order) => order.status === "preparing"),
    completed: orders.filter((order) => order.status === "completed"),
  };
}