"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreVerticalIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { Product } from "@/generated/prisma";
import { DataTableColumnHeader } from "./data-table-column-header";
import { cn } from "@/lib/utils";
import { useVendorDeleteProduct } from "@/hooks/use-product";

type ProductOmit = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  variants: {
    id: string;
    name: string;
    imageUrl: string[];
  }[];
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
};

export const columns: ColumnDef<ProductOmit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={row.getParentRow()?.original.variants[0].imageUrl[0] || ""}
        />
        <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="truncate">{row.original.description || "-"}</p>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <p className="truncate">{row.original.category.name || "-"}</p>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <p className="truncate">{row.original.brand.name || "-"}</p>
    ),
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => <p>{row.original.variants.length || 0}</p>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => <p className="truncate">{row.original.stock || "0"}</p>,
  },
  {
    accessorKey: "totalSold",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Sold" />
    ),
    cell: ({ row }) => (
      <p className="truncate">{row.original.totalSold || "0"}</p>
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => <p className="truncate">{row.original.rating || "0"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "default" : "destructive"}
        className="rounded-full"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ table, row }) => {
      const hasSelected =
        table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();
      const { onOpen } = useVendorDeleteProduct();

      if (hasSelected) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/vendor/product/edit/${row.original.id}`}
                className="flex items-center gap-x-3"
              >
                <Edit className="w-5 h-5" />
                <p>Edit</p>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("flex items-center gap-x-3 text-rose-500 group")}
              onClick={() => onOpen(row.original.id)}
            >
              <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
              <p className="group-hover:text-rose-600">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
