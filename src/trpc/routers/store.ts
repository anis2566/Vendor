import { z } from "zod";

import { StoreSchema } from "@/schema/store";
import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import { ROLE, STORE_STATUS, USER_STATUS } from "@/constant";

export const storeRouter = createTRPCRouter({
  create: protectedProcedure.input(StoreSchema).mutation(async ({ input }) => {
    const { name, description, address, image, phone, userId, status } = input;
    try {
      const existingStore = await db.store.findUnique({
        where: {
          userId,
        },
      });

      if (existingStore) {
        return {
          success: false,
          message: "Store already exists",
        };
      }

      await db.$transaction([
        db.store.create({
          data: {
            name,
            description,
            address,
            image,
            phone,
            userId,
            status,
          },
        }),
        db.user.update({
          where: {
            id: userId,
          },
          data: {
            role: ROLE.VENDOR,
            status: USER_STATUS.PENDING,
          },
        }),
      ]);

      return {
        success: true,
        message: "Store created successfully",
      };
    } catch (error) {
      console.error(`Error creating store: ${error}`);
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
        ...StoreSchema.shape,
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, description, address, image, phone, userId, status } =
        input;
      try {
        const existingStore = await db.store.findUnique({
          where: {
            id,
          },
        });

        if (!existingStore) {
          return {
            success: false,
            message: "Store not found",
          };
        }

        await db.store.update({
          where: {
            id,
          },
          data: {
            name,
            description,
            address,
            image,
            phone,
            userId,
            status,
          },
        });

        return {
          success: true,
          message: "Store updated successfully",
        };
      } catch (error) {
        console.error(`Error updating store: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),
  changeStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(STORE_STATUS),
      })
    )
    .mutation(async ({ input }) => {
      const { id, status } = input;
      try {
        const existingStore = await db.store.findUnique({
          where: {
            id,
          },
        });

        if (!existingStore) {
          return {
            success: false,
            message: "Store not found",
          };
        }

        if (status === STORE_STATUS.REJECTED) {
          await db.$transaction([
            db.store.update({
              where: {
                id,
              },
              data: {
                status,
              },
            }),
            db.user.update({
              where: {
                id: existingStore.userId,
              },
              data: {
                role: ROLE.USER,
                status: USER_STATUS.REJECTED,
              },
            }),
          ]);
        } else {
          await db.$transaction([
            db.store.update({
              where: {
                id,
              },
              data: {
                status,
              },
            }),
            db.user.update({
              where: {
                id: existingStore.userId,
              },
              data: {
                role: ROLE.VENDOR,
                status: USER_STATUS.APPROVED,
              },
            }),
          ]);
        }

        return {
          success: true,
          message: "Store updated successfully",
        };
      } catch (error) {
        console.error(`Error updating store: ${error}`);
        return {
          success: false,
          message: "Internal Server Error",
        };
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const existingStore = await db.store.findUnique({
          where: {
            id,
          },
        });

        if (!existingStore) {
          return {
            success: false,
            message: "Store not found",
          };
        }

        await db.$transaction([
          db.store.delete({
            where: {
              id,
            },
          }),
          db.user.update({
            where: {
              id: existingStore.userId,
            },
            data: {
              role: ROLE.USER,
              status: USER_STATUS.REJECTED,
            },
          }),
        ]);

        return {
          success: true,
          message: "Store deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting store: ${error}`);
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
        for (const id of ids) {
          const existingStore = await db.store.findUnique({
            where: {
              id,
            },
          });

          if (!existingStore) {
            continue;
          }

          await db.$transaction([
            db.store.delete({
              where: {
                id,
              },
            }),
            db.user.update({
              where: {
                id: existingStore.userId,
              },
              data: {
                role: ROLE.USER,
                status: USER_STATUS.REJECTED,
              },
            }),
          ]);
        }

        return {
          success: true,
          message: "Store deleted successfully",
        };
      } catch (error) {
        console.error(`Error deleting store: ${error}`);
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
      const stores = await db.store.findMany({
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
      return stores;
    }),
  getByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;
      const store = await db.store.findUnique({
        where: {
          userId,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      return store;
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const store = await db.store.findUnique({
        where: {
          id,
        },
      });
      return store;
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

      const [stores, totalCount] = await Promise.all([
        db.store.findMany({
          where: {
            status: {
              not: STORE_STATUS.PENDING,
            },
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
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.store.count({
          where: {
            status: {
              not: STORE_STATUS.PENDING,
            },
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
      return { stores, totalCount };
    }),
  applications: protectedProcedure
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

      const [applications, totalCount] = await Promise.all([
        db.store.findMany({
          where: {
            status: STORE_STATUS.PENDING,
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
          },
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.store.count({
          where: {
            status: STORE_STATUS.PENDING,
            ...(search && {
              name: {
                contains: search,
                mode: "insensitive",
              },
            }),
          },
        }),
      ]);
      return { applications, totalCount };
    }),
});
