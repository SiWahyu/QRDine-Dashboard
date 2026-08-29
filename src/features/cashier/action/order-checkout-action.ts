"use server";

import { ApiError } from "@/lib/api-error";
import { checkoutOrder } from "../services/order-server.service";

export async function checkoutOrderAction(orderNumber: string) {
  try {
    const order = await checkoutOrder(orderNumber);

    return {
      success: true,
      message: "Pembayaran berhasil",
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
      message: "Failed to checkout order",
    };
  }
}
