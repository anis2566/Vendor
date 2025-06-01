"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/category-table/data-table";
import { columns } from "../components/category-table/columns";
import { userCategoryFilter } from "../../filter/use-category-filter";

export const CategoryList = () => {
    const [filter] = userCategoryFilter()

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.category.getMany.queryOptions({
        ...filter
    }))

    return (
        <div>
            <DataTable data={data.categories} columns={columns} totalCount={data.totalCount} />
        </div>
    )
}