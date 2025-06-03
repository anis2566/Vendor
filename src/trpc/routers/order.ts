import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { getStore } from "@/lib/vendor.action";

export const orderRouter = createTRPCRouter({
  vendorRecent: protectedProcedure.query(async () => {
    const { id } = await getStore();

    const orders = await db.order.findMany({
      where: {
        storeId: id,
      },
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return orders;
  }),

  vendorGetMany: protectedProcedure
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

      const { id } = await getStore();

      const [orders, totalCount] = await Promise.all([
        db.order.findMany({
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
          },
          include: {
            variants: {
              select: {
                id: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc",
          },
          take: limit,
          skip: (page - 1) * limit,
        }),
        db.order.count({
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
          },
        }),
      ]);
      return { orders, totalCount };
    }),
});
