import { z } from 'zod'

export const CategorySchema = z.object({
    name: z.string().min(1, { message: "required" }),
    description: z.string().optional(),
    image: z.string().optional(),
    slug: z.array(z.string()).optional(),
    isActive: z.boolean().default(false).optional()
})

export type CategorySchemaType = z.infer<typeof CategorySchema>