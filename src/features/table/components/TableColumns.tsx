"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  ArrowDownToLine,
  MoreHorizontalIcon,
  Pencil,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { type DataTableFeatures } from "@/components/data-table/data-table-features";

import { TableType } from "@/types/table";
import { ReactQRCode, ReactQRCodeRef } from "@lglab/react-qr-code";
import { useRef, useState } from "react";
import Link from "next/link";

const columnHelper = createColumnHelper<DataTableFeatures, TableType>();

const ActionCell = ({ row }: { row: { original: TableType } }) => {
  const qrRef = useRef<ReactQRCodeRef>(null);
  const [open, setOpen] = useState(false);

  const handleDownloadQRCode = () => {
    qrRef.current?.download({
      name: `qr-table-${row.original.number}`,
      format: "png",
      size: 1000,
    });
  };

  return (
    <div className="flex items-center justify-between">
      {open && (
        <div className="hidden" aria-hidden="true">
          <ReactQRCode
            ref={qrRef}
            value={row.original.qr_url}
            size={100}
            background={"#ffffff"}
          />
        </div>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
              href={`/dashboard/table/${row.original.id}/edit`}
              className="flex gap-1.5 justify-start items-center w-full"
            >
              <Pencil strokeWidth={1.5} />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownloadQRCode}>
            <ArrowDownToLine strokeWidth={1.5} /> Download
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
