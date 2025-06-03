"use server";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getUserOrRedirect } from "./user.action";
import { db } from "./db";

export const getStore = cache(async () => {
  const user = await getUserOrRedirect();

  const store = await db.store.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!store) redirect("/vendor/apply");

  return store;
});
