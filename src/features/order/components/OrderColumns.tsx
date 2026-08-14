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

import {
  OrderStatusBadge,
  PaymentMethodBadge,
  PaymentStatusBadge,
} from "@/features/order/components/StatusBadge";
import type { OrderType } from "@/types/order";
import { dateFormatter } from "@/utils/dateFormatter";
import { currencyFormatter } from "@/utils/currencyFormatter";

const columnHelper = createColumnHelper<DataTableFeatures, OrderType>();

export const orderColumns = columnHelper.columns([
  columnHelper.accessor("order_number", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="font-medium">{row.original.order_number}</p>
        <p className="text-xs text-muted-foreground">
          {dateFormatter(row.original.created_at)}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("table.number", {
    header: "Table",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.table.number}</span>
    ),
  }),
  columnHelper.accessor("customer_name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="font-medium">{row.original.customer_name}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.customer_email || row.original.customer_phone || "—"}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("payment_method", {
    header: "Payment",
    cell: ({ row }) => (
      <PaymentMethodBadge method={row.original.payment_method} />
    ),
  }),
  columnHelper.accessor("payment_status", {
    header: "Payment Status",
    cell: ({ row }) => (
      <PaymentStatusBadge status={row.original.payment_status} />
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: "equalsString",
    cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
  }),
  columnHelper.accessor("total", {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="font-semibold text-right">
        {currencyFormatter(row.original.total)}
      </div>
    ),
  }),
  columnHelper.accessor("payment_expired_at", {
    header: "Payment Expiry",
    enableSorting: false,
    cell: ({ row }) =>
      row.original.payment_expired_at ? (
        <span className="text-muted-foreground">
          {dateFormatter(row.original.payment_expired_at)}
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
              <Trash strokeWidth={1.5} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  }),
]);
