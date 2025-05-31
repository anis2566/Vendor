import { createTRPCRouter } from '../init';
import { categoryRouter } from './category';

export const appRouter = createTRPCRouter({
    category: categoryRouter
});

export type AppRouter = typeof appRouter;