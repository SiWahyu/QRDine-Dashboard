import { z } from "zod";

// 1. Schema untuk validasi 1 file (ukuran & tipe)
const singleFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, "Image must not exceed 5MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Only JPG, PNG, and WebP images are allowed",
  );

const createImageSchema = z
  .array(singleFileSchema)
  .min(1, "Image is required")
  .max(1, "Only one image is allowed");

const updateImageSchema = z
  .array(singleFileSchema)
  .max(1, "Only one image is allowed")
  .optional();

const baseMenuSchema = z.object({
  category_id: z
    .number()
    .nullable()
    .refine((value) => value !== null, {
      message: "Please select a category",
    }),
  name: z
    .string()
    .trim()
    .min(3, "Menu name must be at least 3 characters long")
    .max(100, "Menu name must be at most 100 characters long"),
  description: z
    .string()
    .max(200, "Description must be at most 200 characters long")
    .optional(),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => /^\d+$/.test(value), "Price must be a valid number")
    .transform(Number)
    .pipe(z.number().positive("Price must be greater than 0")),
  is_available: z.boolean(),
});

export const createMenuSchema = baseMenuSchema.extend({
  image: createImageSchema,
});

export const updateMenuSchema = baseMenuSchema.extend({
  image: updateImageSchema,
});

export type CreateMenuFormInput = z.input<typeof createMenuSchema>;
export type CreateMenuFormOutput = z.output<typeof createMenuSchema>;

export type UpdateMenuFormInput = z.input<typeof updateMenuSchema>;
export type UpdateMenuFormOutput = z.output<typeof updateMenuSchema>;
