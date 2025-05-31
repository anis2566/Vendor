"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/category-table/data-table";
import { columns } from "../components/category-table/columns";
import { useState } from "react";

export const CategoryList = () => {
    const [multipleSelect, setMultipleSelect] = useState<boolean>(false)

    const handleMultipleSelect = (value: boolean) => {
        setMultipleSelect(value)
    }

    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.category.getMany.queryOptions())

    return (
        <div>
            <DataTable data={data} columns={columns} />
        </div>
    )
}