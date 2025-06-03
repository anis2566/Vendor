"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { userProductFilter } from "@/modules/dashboard/product/filter/use-product-filter";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";

export const ProductList = () => {
  const [filter] = userProductFilter();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.product.getManyVendor.queryOptions({
      ...filter,
    })
  );

  return (
    <div>
      <DataTable
        data={data.products}
        columns={columns}
        totalCount={data.totalCount}
      />
    </div>
  );
};
