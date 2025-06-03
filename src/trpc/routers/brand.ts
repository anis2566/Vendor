import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../init";
import { BrandSchema } from "@/schema/brand";
import { db } from "@/lib/db";

export const brandRouter = createTRPCRouter({
  create: protectedProcedure.input(BrandSchema).mutation(async ({ input }) => {
    const { name, description, image, status } = input;
    try {
      const existingBrand = await db.brand.findFirst({
        where: {
          name: name,
        },
      });

      if (existingBrand) {
        return {
          success: false,
          message: "Brand already exists",
        };
      }
      await db.brand.create({
        data: {
          name,
          description,
          image,
          status,
        },
      });

      return {
        success: true,
        message: "Brand created successfully",
      };
    } catch (error) {
      console.error(`Error creating brand: ${error}`);
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
        ...BrandSchema.shape,
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, description, image, status } = input;
      try {
        const existingBrand = await db.brand.findUnique({
          where: {
            id,
          },
        });

        if (!existingBrand) {
          return {
            success: false,
            message: "Brand not found",
          };
        }

        await db.brand.update({
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
          message: "Brand updated successfully",
        };
      } catch (error) {
        console.error(`Error updating brand: ${error}`);
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
        const existingBrand = await db.brand.findUnique({
          where: {
            id,
          },
        });

        if (!existingBrand) {
          return {
            success: false,
            message: "Brand not found",
          };
        }

        await db.brand.delete({
          where: {
            id,
          },
        });

        return {
          success: true,
          message: "Brand deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting brand: ${error}`);
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
        await db.brand.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        return {
          success: true,
          message: "Brand deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting brand: ${error}`);
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
      const brands = await db.brand.findMany({
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
      return brands;
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const brand = await db.brand.findUnique({
        where: {
          id,
        },
      });
      return brand;
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
      const { page, limit, sort, search } = input;

      const [brands, totalCount] = await Promise.all([
        db.brand.findMany({
          where: {
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.brand.count({
          where: {
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
          },
        }),
      ]);
      return { brands, totalCount };
    }),
});
