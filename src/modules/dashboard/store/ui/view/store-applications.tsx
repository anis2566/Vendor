"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { userStoreApplicationFilter } from "../../filter/use-store-filter";
import { DataTable } from "../application-table/data-table";
import { columns } from "../application-table/columns";

export const StoreApplications = () => {
  const [filter] = userStoreApplicationFilter();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.store.applications.queryOptions({
      ...filter,
    })
  );

  return (
    <div>
      <DataTable
        data={data.applications}
        columns={columns}
        totalCount={data.totalCount}
      />
    </div>
  );
};
