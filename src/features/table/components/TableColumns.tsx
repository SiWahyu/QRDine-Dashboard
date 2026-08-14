"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  ArrowDownToLine,
  MoreHorizontalIcon,
  Pencil,
  Trash,
} from "lucide-react";

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

import { TableType } from "@/types/table";
import { ReactQRCode, ReactQRCodeRef } from "@lglab/react-qr-code";
import { useRef } from "react";

const columnHelper = createColumnHelper<DataTableFeatures, TableType>();

const ActionCell = ({ row }: { row: { original: TableType } }) => {
  const qrRef = useRef<ReactQRCodeRef>(null);

  const handleDownloadQRCode = () => {
    qrRef.current?.download({
      name: `qr-table-${row.original.number}`,
      format: "png",
      size: 1000,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="hidden" aria-hidden="true">
        <ReactQRCode
          ref={qrRef}
          value={row.original.qr_url}
          size={100}
          background={"#ffffff"}
        />
      </div>
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
          <DropdownMenuItem onClick={handleDownloadQRCode}>
            <ArrowDownToLine strokeWidth={1.5} /> Download
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
  );
};

export const tableColumns = columnHelper.columns([
  columnHelper.accessor("number", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Table" />
    ),
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="font-medium">{row.original.number}</p>
      </div>
    ),
  }),
  columnHelper.accessor("qr_url", {
    header: "QRCode",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="min-w-0 ">
        <div className="bg-white w-fit rounded-xl">
          <ReactQRCode value={row.original.qr_url} size={50} />
        </div>
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <ActionCell row={row} />
      </div>
    ),
  }),
]);
