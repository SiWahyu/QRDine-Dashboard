"use server";
import { ApiError } from "@/lib/api-error";
import { CategoryFormValues } from "../schemas/categorySchema";
import { createCategory, updateCategory } from "../services/category.service";

export async function createCategoryAction(data: CategoryFormValues) {
  try {
    const category = await createCategory(data);

    return {
      success: true,
      message: "Category created successfully",
      category,
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
      message: "Failed to create category",
    };
  }
}

export async function updateCategoryAction(
  id: number,
  data: CategoryFormValues,
) {
  try {
    const category = await updateCategory(id, data);

    return {
      success: true,
      message: "Category created successfully",
      category,
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
      message: "Failed to create category",
    };
  }
}
