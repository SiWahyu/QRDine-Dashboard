"use client";

import { type RowData, type ReactTable } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { type DataTableFeatures } from "./data-table-features";

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
}

export function DataTablePagination<TData extends RowData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-sm font-medium">
        Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 sm:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to first page"
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Go to next page"
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 sm:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          aria-label="Go to last page"
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}