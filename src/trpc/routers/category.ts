import { CategorySchema } from "@/schema/category";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const categoryRouter = createTRPCRouter({
    create: protectedProcedure
        .input(CategorySchema)
        .mutation(async ({ input }) => {
            const { name, description, image, slug, isActive } = input
            try {
                const existingCategory = await db.category.findFirst({
                    where: {
                        name: name
                    }
                })

                if (existingCategory) {
                    throw new TRPCError({ code: "CONFLICT", message: "Category already exists" })
                }

                await db.category.create({
                    data: {
                        name,
                        description,
                        image,
                        slug,
                        isActive,
                    }
                })

                return {
                    success: true,
                    message: "Category created successfully",
                }
            } catch (error) {
                console.error(`Error creating category: ${error}`)
                return {
                    success: false,
                    message: "Internal Server Error"
                }
            }
        }),
    getMany: protectedProcedure
        .query(async () => {
            const categories = await db.category.findMany()
            console.log(categories)
            return categories
        })
})