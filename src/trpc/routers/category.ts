import { z } from "zod";

import { CategorySchema } from "@/schema/category";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CategorySchema)
    .mutation(async ({ input }) => {
      const { name, description, image, status } = input;
      try {
        const existingCategory = await db.category.findFirst({
          where: {
            name: name,
          },
        });

        if (existingCategory) {
          return {
            success: false,
            message: "Category already exists",
          };
        }

        await db.category.create({
          data: {
            name,
            description,
            image,
            status,
          },
        });

        return {
          success: true,
          message: "Category created successfully",
        };
      } catch (error) {
        console.error(`Error creating category: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ...CategorySchema.shape,
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, description, image, status } = input;
      try {
        const existingCategory = await db.category.findUnique({
          where: {
            id,
          },
        });

        if (!existingCategory) {
          return {
            success: false,
            message: "Category not found",
          };
        }

        await db.category.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            image,
            status,
          },
        });

        return {
          success: true,
          message: "Category updated successfully",
        };
      } catch (error) {
        console.error(`Error updating category: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  deleteOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const existingCategory = await db.category.findUnique({
          where: {
            id,
          },
        });

        if (!existingCategory) {
          return {
            success: false,
            message: "Category not found",
          };
        }

        await db.category.delete({
          where: {
            id,
          },
        });

        return {
          success: true,
          message: "Category deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting category: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  deleteMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { ids } = input;
      try {
        await db.category.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        return {
          success: true,
          message: "Category deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting category: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  forSelect: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { search } = input;
      const categories = await db.category.findMany({
        where: {
          ...(search && {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }),
        },
        select: {
          id: true,
          name: true,
        },
      });
      console.log(categories);
      return categories;
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const category = await db.category.findUnique({
        where: {
          id,
        },
      });
      return category;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number().min(1).max(100),
        sort: z.string().nullish(),
        search: z.string().nullish(),
        status: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, sort, search, status } = input;

      const [categories, totalCount] = await Promise.all([
        db.category.findMany({
          where: {
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
            ...(status && {
              status,
            }),
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.category.count({
          where: {
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
            ...(status && {
              status,
            }),
          },
        }),
      ]);
      return { categories, totalCount };
    }),
});
