import { z } from "zod";
export const tableSchema = z.object({
  number: z
    .string()
    .trim()
    .min(3, "Table number must be at least 3 characters long")
    .max(50, "Table number must be at most 50 characters long"),
  restaurant_id: z.number(),
});

export type TableFormValues = z.infer<typeof tableSchema>;
