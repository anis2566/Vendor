import { z } from "zod";

import { CATEGORY_STATUS } from "@/constant";

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "required" }),
  description: z.string().optional(),
  image: z.string().optional(),
  status: z
    .nativeEnum(CATEGORY_STATUS)
    .refine((data) => Object.values(CATEGORY_STATUS).includes(data), {
      message: "required",
    }),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
