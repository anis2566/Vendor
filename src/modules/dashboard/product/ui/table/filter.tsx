"use client";

import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { CircleX, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { DataTableViewOptions } from "./data-table-view-options";
import {
  CATEGORY_STATUS,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_OPTIONS,
  STOCK_OPTIONS,
} from "@/constant";
import { useDeleteManyProduct } from "@/hooks/use-product";
import { useDebounce } from "@/hooks/use-debounce";
import { userProductFilter } from "../../filter/use-product-filter";

interface HasId {
  id: string;
}

interface FilterProps<TData extends HasId> {
  table: Table<TData>;
}

export const Filter = <TData extends HasId>({ table }: FilterProps<TData>) => {
  const [search, setSearch] = useState<string>("");

  const { onOpen } = useDeleteManyProduct();
  const [filter, setFilter] = userProductFilter();
  const debounceSearchValue = useDebounce(search, 500);

  useEffect(() => {
    setFilter({ search: debounceSearchValue });
  }, [debounceSearchValue]);

  const handleSortChange = (value: string) => {
    setFilter({ sort: value });
  };

  const handleStatusChange = (value: string) => {
    setFilter({ status: value });
  };

  const handleInStockChange = (value: string) => {
    setFilter({ inStock: value });
  };

  const handleClear = () => {
    setSearch("");
    setFilter({
      search: "",
      limit: DEFAULT_PAGE_SIZE,
      page: DEFAULT_PAGE,
      sort: "",
      status: "",
      inStock: "",
    });
  };

  const isAnyModified =
    !!filter.search ||
    filter.limit !== 5 ||
    filter.page !== 1 ||
    filter.sort !== "" ||
    filter.status !== "" ||
    filter.inStock !== "";

  const isMultipleSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  const onClick = () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id || "");

    onOpen(selectedIds);
  };

  const isPending = false;

  return (
    <div className="w-full flex items-center justify-between">
      <div className="hidden md:flex items-center gap-4">
        <Input
          type="search"
          placeholder="search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filter.inStock}
          onValueChange={(value) => handleInStockChange(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            {STOCK_OPTIONS.map((v, i) => (
              <SelectItem value={v.value} key={i}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filter.status}
          onValueChange={(value) => handleStatusChange(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(CATEGORY_STATUS).map((v, i) => (
              <SelectItem value={v} key={i}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filter.sort}
          onValueChange={(value) => handleSortChange(value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_SORT_OPTIONS.map((v, i) => (
              <SelectItem value={v.value} key={i}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isAnyModified && (
          <Button
            variant="outline"
            className="text-red-500"
            onClick={handleClear}
          >
            <CircleX />
            Clear
          </Button>
        )}
        {isMultipleSelected && (
          <Button
            variant="outline"
            className="text-red-500"
            onClick={onClick}
            disabled={isPending}
          >
            <Trash2 />
            Delete
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};
