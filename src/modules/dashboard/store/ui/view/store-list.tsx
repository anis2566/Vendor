"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { userStoreFilter } from "../../filter/use-store-filter";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";

export const StoreList = () => {
  const [filter] = userStoreFilter();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.store.getMany.queryOptions({
      ...filter,
    })
  );

  return (
    <div>
      <DataTable
        data={data.stores}
        columns={columns}
        totalCount={data.totalCount}
      />
    </div>
  );
};
