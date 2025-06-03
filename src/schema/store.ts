import { z } from "zod";

import { STORE_STATUS } from "@/constant";

export const StoreSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  phone: z.string().length(11, { message: "invalid phone number" }),
  description: z.string().optional(),
  address: z.string().min(1, { message: "required" }),
  image: z.string().min(1, { message: "required" }),
  userId: z.string().min(1, { message: "required" }),
  status: z
    .nativeEnum(STORE_STATUS)
    .refine((data) => Object.values(STORE_STATUS).includes(data), {
      message: "required",
    }),
});

export type StoreSchemaType = z.infer<typeof StoreSchema>;
