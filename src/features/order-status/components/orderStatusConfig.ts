import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChefHat,
  CircleCheckBig,
  CookingPot,
  type LucideIcon,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";
import { OrderStatusType } from "@/types/order-status";

export type OrderStatusColumn = Extract<
  OrderStatus,
  "confirmed" | "preparing" | "completed"
>;

export type Orders = Record<OrderStatusColumn, OrderStatusType[]>;

export type OrderStatusColumnConfig = {
  id: OrderStatusColumn;
  title: string;
  icon: LucideIcon;
  cardIcon: LucideIcon;
  accent: string;
};

export const ORDER_STATUS_COLUMNS: OrderStatusColumnConfig[] = [
  {
    id: "confirmed",
    title: "Pesanan Diterima",
    icon: Bell,
    cardIcon: Bell,
    accent: "text-blue-500",
  },
  {
    id: "preparing",
    title: "Sedang Diproses",
    icon: ChefHat,
    cardIcon: CookingPot,
    accent: "text-amber-500",
  },
  {
    id: "completed",
    title: "Pesanan Selesai",
    icon: CheckCircle2,
    cardIcon: CircleCheckBig,
    accent: "text-emerald-600",
  },
];

export function groupOrders(orders: OrderStatusType[]): Orders {
  return {
    confirmed: orders.filter((order) => order.status === "confirmed"),
    preparing: orders.filter((order) => order.status === "preparing"),
    completed: orders.filter((order) => order.status === "completed"),
  };
}
