import { cache } from 'react';
import { initTRPC, TRPCError } from '@trpc/server';

import { getCurrentUser } from '@/lib/user.action';

export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    const user = await getCurrentUser()

    if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: "Unauthorized" })
    }

    return next({ ctx: { ...ctx, auth: user } })
})