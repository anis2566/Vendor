import { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type GetManyInput = inferRouterInputs<AppRouter>["category"]["getMany"];
export type GetManyOutput =
  inferRouterOutputs<AppRouter>["category"]["getMany"];
