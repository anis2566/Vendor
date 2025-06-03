import { z } from "zod";

import { db } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const userRouter = createTRPCRouter({
  forSelect: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { search } = input;
      const users = await db.user.findMany({
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
      return users;
    }),
});
