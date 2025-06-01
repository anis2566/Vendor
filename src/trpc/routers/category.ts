import { z } from "zod";

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
        .input(
            z.object({
                page: z.number(),
                limit: z.number().min(1).max(100),
                sort: z.string().nullish(),
                search: z.string().nullish(),
            })
        )
        .query(async ({ input }) => {
            const { page, limit, sort, search } = input

            const [categories, totalCount] = await Promise.all([
                db.category.findMany({
                    where: {
                        ...(search && {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        })
                    },
                    orderBy: {
                        createdAt: sort === "desc" ? "desc" : "asc"
                    },
                    take: limit,
                    skip: (page - 1) * limit
                }),
                db.category.count({
                    where: {
                        ...(search && {
                            name: {
                                contains: search,
                                mode: "insensitive"
                            }
                        })
                    },
                }),
            ])
            return { categories, totalCount }
        })
})