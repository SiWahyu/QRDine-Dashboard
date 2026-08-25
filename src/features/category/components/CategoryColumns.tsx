"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontalIcon, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { type DataTableFeatures } from "@/components/data-table/data-table-features";

import { CategoryType } from "@/types/category";
import { AvailableBadge } from "@/components/badges/AvailableBadge";
import { dateFormatter } from "@/utils/dateFormatter";
import Link from "next/link";

const columnHelper = createColumnHelper<DataTableFeatures, CategoryType>();

const Actions = ({ row }: { row: { original: CategoryType } }) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link
              href={`/dashboard/category/${row.original.id}/edit`}
              className="flex gap-1.5 justify-start items-center w-full"
            >
              <Pencil strokeWidth={1.5} />
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const categoryColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="font-medium">{row.original.name}</p>
      </div>
    ),
  }),
  columnHelper.accessor("is_active", {
    header: "Is active",
    cell: ({ row }) => (
      <div className="min-w-0">
        <AvailableBadge available={row.original.is_active} />
      </div>
    ),
  }),
  columnHelper.accessor("created_at", {
    header: "Created at",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.created_at ? (
        <span className="text-muted-foreground ">
          {dateFormatter(row.original.created_at)}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableSorting: false,
    cell: ({ row }) => <Actions row={row} />,
  }),
]);