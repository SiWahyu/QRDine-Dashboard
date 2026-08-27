"use server";

import { ApiError } from "@/lib/api-error";
import { TableFormValues } from "../schemas/tableSchema";
import { createTable, updateTable } from "../services/table.service";

export async function createTableAction(data: TableFormValues) {
  try {
    const table = await createTable(data);

    return {
      success: true,
      message: "Table created successfully",
      table,
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
      message: "Failed to create table",
    };
  }
}
export async function updateTableAction(id: number, data: TableFormValues) {
  try {
    const table = await updateTable(id, data);

    return {
      success: true,
      message: "Table created successfully",
      table,
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
      message: "Failed to create table",
    };
  }
}
