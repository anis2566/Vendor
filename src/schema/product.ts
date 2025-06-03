import { z } from "zod";

import { CATEGORY_STATUS } from "@/constant";

const Variant = z.object({
  name: z.string().min(1, { message: "required" }),
  price: z.string().min(1, { message: "required" }),
  discount: z.string().optional(),
  stock: z.string().min(1, { message: "required" }),
  size: z.string().optional(),
  color: z.string().optional(),
  imageUrl: z.array(z.string()).min(1, { message: "required" }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  description: z.string().optional(),
  categoryId: z.string().min(1, { message: "required" }),
  brandId: z.string().min(1, { message: "required" }),
  variants: Variant.array().min(1, { message: "required" }),
  status: z
    .nativeEnum(CATEGORY_STATUS)
    .refine((data) => Object.values(CATEGORY_STATUS).includes(data), {
      message: "required",
    }),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
