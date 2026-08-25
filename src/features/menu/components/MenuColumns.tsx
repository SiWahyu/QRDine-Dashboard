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

import type { MenuType } from "@/types/menu";
import Image from "next/image";
import { AvailableBadge } from "@/components/badges/AvailableBadge";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { getImageUrl } from "@/utils/getImageUrl";
import Link from "next/link";

const columnHelper = createColumnHelper<DataTableFeatures, MenuType>();

const Actions = ({ row }: { row: { original: MenuType } }) => {
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
              href={`/dashboard/menu/${row.original.id}/edit`}
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

export const menuColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Menu" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={getImageUrl(row.original.image)}
          alt={row.original.name}
          width={40}
          height={40}
          className="object-cover rounded-md size-10 ring-1 ring-foreground/10"
        />
        <div className="min-w-0">
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs line-clamp-1 text-muted-foreground">
            {row.original.description}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.category}</span>
    ),
  }),
  columnHelper.accessor("slug", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="font-medium">{row.original.slug}</p>
      </div>
    ),
  }),
  columnHelper.accessor("price", {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="font-semibold text-right">
        {currencyFormatter(row.original.price)}
      </div>
    ),
  }),
  columnHelper.accessor("is_available", {
    header: "Is available",
    cell: ({ row }) => (
      <div className="min-w-0">
        <AvailableBadge available={row.original.is_available} />
      </div>
    ),
  }),
  columnHelper.accessor("created_at", {
    header: "Created at",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.created_at ? (
        <span className="text-muted-foreground">
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
