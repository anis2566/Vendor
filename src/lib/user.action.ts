"use server";

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "./db";

export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session.userId) return null;

  const user = await db.user.findUnique({
    where: {
      clerkId: session.userId,
    },
  });

  if (!user) return null;

  return user;
});

export const getUserOrRedirect = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  return user;
};
