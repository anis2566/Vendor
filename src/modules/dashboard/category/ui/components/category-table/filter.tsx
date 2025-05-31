"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterProps<TData> {
    table: Table<TData>;
}

export const Filter = <TData,>({ table }: FilterProps<TData>) => {
    const isMobile = useIsMobile();

    return (
        <div>
            <DataTableViewOptions table={table} />
        </div>
    );
};