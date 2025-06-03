"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { userCategoryFilter } from "../../filter/use-category-filter";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";

export const CategoryList = () => {
  const [filter] = userCategoryFilter();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.category.getMany.queryOptions({
      ...filter,
    })
  );

  return (
    <div>
      <DataTable
        data={data.categories}
        columns={columns}
        totalCount={data.totalCount}
      />
    </div>
  );
};
