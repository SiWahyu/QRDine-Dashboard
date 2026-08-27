"use server";

import { ApiError } from "@/lib/api-error";
import {
  CreateMenuFormOutput,
  UpdateMenuFormOutput,
} from "../schemas/menuSchema";
import { createMenu, updateMenu } from "../services/menu.service";

export async function createMenuAction(data: CreateMenuFormOutput) {
  try {
    const menu = await createMenu(data);

    return {
      success: true,
      message: "Menu created successfully",
      menu,
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
      message: "Failed to create menu",
    };
  }
}
export async function updateMenuAction(id: number, data: UpdateMenuFormOutput) {
  try {
    const menu = await updateMenu(id, data);

    return {
      success: true,
      message: "Menu created successfully",
      data: menu,
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
      message: "Failed to create menu",
    };
  }
}
