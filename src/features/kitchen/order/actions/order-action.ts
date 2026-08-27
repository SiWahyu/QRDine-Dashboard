"use server";

import { OrderStatus } from "@/types/order";
import { updateOrderStatus } from "../services/order-server.service";
import { ApiError } from "@/lib/api-error";

export async function updateOrderStatusAction(id: number, status: OrderStatus) {
  try {
    const order = await updateOrderStatus(id, status);

    return {
      success: true,
      message: "Order updated successfully",
      order,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Failed to update order",
    };
  }
}
