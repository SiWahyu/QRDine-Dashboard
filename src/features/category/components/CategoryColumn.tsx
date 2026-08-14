"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontalIcon, Pencil, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { type DataTableFeatures } from "@/components/data-table/data-table-features";

import { CategoryType } from "@/types/category";
import ActiveBadge from "@/features/login/components/ActiveBadge";
import { dateFormatter } from "@/utils/dateFormatter";

const columnHelper = createColumnHelper<DataTableFeatures, CategoryType>();

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
        <ActiveBadge active={row.original.is_active} />
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
    cell: () => (
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
              <Pencil strokeWidth={1.5} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              {" "}
              <Trash strokeWidth={1} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  }),
]);
