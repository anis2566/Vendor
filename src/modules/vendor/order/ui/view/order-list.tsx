"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { userOrderFilter } from "../../filter/use-order-filter";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";

export const OrderList = () => {
  const [filter] = userOrderFilter();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.order.vendorGetMany.queryOptions({
      ...filter,
    })
  );

  return (
    <div>
      <DataTable
        data={data.orders}
        columns={columns}
        totalCount={data.totalCount}
      />
    </div>
  );
};
