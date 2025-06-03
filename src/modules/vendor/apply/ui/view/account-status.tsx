"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, Loader2, Store, User } from "lucide-react";

import StatusBadge from "../components/status-badge";

import { STORE_STATUS } from "@/constant";

interface Props {
  userId: string;
}

export const AccountStatus = ({ userId }: Props) => {
  const trpc = useTRPC();
  const { data: store, isLoading } = useQuery(
    trpc.store.getByUserId.queryOptions({
      userId,
    })
  );

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="h-4 animate-spin w-4" />
      </div>
    );

  if (!store) return null;

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-3">
      <div className="bg-background border p-3 rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md w-full sm:w-[500px]">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Store className="w-5 h-5 text-gray-500" />
              {store.name}
            </h3>
            <StatusBadge status={store.status as STORE_STATUS} size="md" />
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>{store?.user?.name || "User"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              Created on: {format(new Date(store.createdAt), "dd MMM yyyy")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>
              Last updated: {format(new Date(), "dd MMM yyyy")} -{" "}
              {format(new Date(), "hh:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
