import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { protectedProcedure, createTRPCRouter } from "../init";
import { ProductSchema } from "@/schema/product";
import { db } from "@/lib/db";
import { getStore } from "@/lib/vendor.action";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ProductSchema)
    .mutation(async ({ input }) => {
      const { name, description, categoryId, brandId, variants, status } =
        input;
      try {
        const existingProduct = await db.product.findFirst({
          where: {
            name: name,
          },
        });

        if (existingProduct) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Product already exists",
          });
        }

        await db.product.create({
          data: {
            name,
            description,
            categoryId,
            brandId,
            stock: variants.reduce((acc, item) => acc + Number(item.stock), 0),
            variants: {
              createMany: {
                data: variants.map((item) => ({
                  ...item,
                  price: Number(item.price),
                  discount: Number(item.discount),
                  stock: Number(item.stock),
                })),
              },
            },
            status,
          },
        });

        return {
          success: true,
          message: "Product created successfully",
        };
      } catch (error) {
        console.error(`Error creating product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  vendorCreate: protectedProcedure
    .input(ProductSchema)
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx;
      const { name, description, categoryId, brandId, variants, status } =
        input;
      try {
        const store = await db.store.findUnique({
          where: {
            userId: auth.id,
          },
        });

        if (!store) {
          return {
            success: false,
            message: "Store not found",
          };
        }

        const existingProduct = await db.product.findFirst({
          where: {
            name: name,
          },
        });

        if (existingProduct) {
          return {
            success: false,
            message: "Product already exists",
          };
        }

        await db.product.create({
          data: {
            name,
            description,
            categoryId,
            brandId,
            stock: variants.reduce((acc, item) => acc + Number(item.stock), 0),
            storeId: store.id,
            variants: {
              createMany: {
                data: variants.map((item) => ({
                  ...item,
                  price: Number(item.price),
                  discount: Number(item.discount),
                  stock: Number(item.stock),
                })),
              },
            },
            status,
          },
        });

        return {
          success: true,
          message: "Product created successfully",
        };
      } catch (error) {
        console.error(`Error creating product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ...ProductSchema.shape,
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, description, categoryId, brandId, variants, status } =
        input;
      try {
        const existingProduct = await db.product.findUnique({
          where: {
            id,
          },
          include: {
            variants: true,
          },
        });

        if (!existingProduct) {
          return {
            success: false,
            message: "Product not found",
          };
        }

        await db.product.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            categoryId,
            brandId,
            stock: variants.reduce((acc, item) => acc + Number(item.stock), 0),
            variants: {
              updateMany: existingProduct.variants.map((item) => ({
                where: {
                  id: item.id,
                },
                data: {
                  name: item.name,
                  price: Number(item.price),
                  discount: Number(item.discount),
                  stock: Number(item.stock),
                  size: item.size,
                  color: item.color,
                  imageUrl: item.imageUrl,
                },
              })),
            },
            status,
          },
        });

        return {
          success: true,
          message: "Product updated successfully",
        };
      } catch (error) {
        console.error(`Error updating product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  vendorUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ...ProductSchema.shape,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, description, categoryId, brandId, variants, status } =
        input;

      const { id: storeId } = await getStore();
      try {
        const existingProduct = await db.product.findUnique({
          where: {
            id,
            storeId,
          },
          include: {
            variants: true,
          },
        });

        if (!existingProduct) {
          return {
            success: false,
            message: "Product not found",
          };
        }

        await db.product.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            categoryId,
            brandId,
            stock: variants.reduce((acc, item) => acc + Number(item.stock), 0),
            variants: {
              updateMany: existingProduct.variants.map((item) => ({
                where: {
                  id: item.id,
                },
                data: {
                  name: item.name,
                  price: Number(item.price),
                  discount: Number(item.discount),
                  stock: Number(item.stock),
                  size: item.size,
                  color: item.color,
                  imageUrl: item.imageUrl,
                },
              })),
            },
            status,
          },
        });

        return {
          success: true,
          message: "Product updated successfully",
        };
      } catch (error) {
        console.error(`Error updating product: ${error}`);
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
        const existingProduct = await db.product.findUnique({
          where: {
            id,
          },
        });

        if (!existingProduct) {
          return {
            success: false,
            message: "Product not found",
          };
        }

        await db.product.delete({
          where: {
            id,
          },
        });

        return {
          success: true,
          message: "Product deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  VendorDeleteOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const { id: storeId } = await getStore();
      try {
        const existingProduct = await db.product.findUnique({
          where: {
            id,
            storeId,
          },
        });

        if (!existingProduct) {
          return {
            success: false,
            message: "Product not found",
          };
        }

        await db.product.delete({
          where: {
            id,
          },
        });

        return {
          success: true,
          message: "Product deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting product: ${error}`);
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
        await db.product.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });

        return {
          success: true,
          message: "Product deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  vendorDeleteMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { ids } = input;
      const { id: storeId } = await getStore();
      try {
        await db.product.deleteMany({
          where: {
            id: {
              in: ids,
            },
            storeId,
          },
        });

        return {
          success: true,
          message: "Product deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting product: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const product = await db.product.findUnique({
        where: {
          id,
        },
        include: {
          variants: true,
        },
      });
      return product;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number().min(1).max(100),
        sort: z.string().nullish(),
        search: z.string().nullish(),
        status: z.string().nullish(),
        inStock: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { page, limit, sort, search, inStock, status } = input;

      const [products, totalCount] = await Promise.all([
        db.product.findMany({
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
            ...(inStock && {
              stock: inStock === "true" ? { gt: 0 } : 0,
            }),
          },
          include: {
            brand: {
              select: {
                name: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
            variants: {
              select: {
                name: true,
                id: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.product.count({
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
            ...(inStock && {
              stock: inStock === "true" ? { gt: 0 } : 0,
            }),
          },
        }),
      ]);
      return { products, totalCount };
    }),
  getManyVendor: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number().min(1).max(100),
        sort: z.string().nullish(),
        search: z.string().nullish(),
        status: z.string().nullish(),
        inStock: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { auth } = ctx;
      const { page, limit, sort, search, inStock, status } = input;

      const { id } = await getStore();

      const [products, totalCount] = await Promise.all([
        db.product.findMany({
          where: {
            storeId: id,
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
            ...(status && {
              status,
            }),
            ...(inStock && {
              stock: inStock === "true" ? { gt: 0 } : 0,
            }),
          },
          include: {
            brand: {
              select: {
                name: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
            variants: {
              select: {
                name: true,
                id: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.product.count({
          where: {
            storeId: id,
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
            ...(status && {
              status,
            }),
            ...(inStock && {
              stock: inStock === "true" ? { gt: 0 } : 0,
            }),
          },
        }),
      ]);
      return { products, totalCount };
    }),
  forSelect: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { search } = input;
      const products = await db.product.findMany({
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
        take: 10,
      });
      return products;
    }),
});
