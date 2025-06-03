import { createTRPCRouter } from "../init";
import { categoryRouter } from "./category";
import { brandRouter } from "./brand";
import { productRouter } from "./product";
import { storeRouter } from "./store";
import { userRouter } from "./user";
import { orderRouter } from "./order";

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  brand: brandRouter,
  product: productRouter,
  store: storeRouter,
  user: userRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
