"use client";

import {
  createColumnHelper,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { InboxIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { DataTablePagination } from "./data-table-pagination";

const SEARCH_COLUMN_ID = "_search";

function getByPath(source: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[part];
  }, source);
}

export interface DataTableFilterTab {
  columnId: string;
  options: { label: string; value: unknown }[];
}

export interface DataTableFilterTab {
  columnId: string;
  options: { label: string; value: unknown }[];
}

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  searchKeys?: string[];
  searchPlaceholder?: string;
  filterTabs?: DataTableFilterTab[];
  getRowId?: (row: TData) => string;
  resultLabel?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  emptyFilteredMessage?: string;
  emptyFilteredDescription?: string;
  toolbar?: React.ReactNode;
  hiddenColumns?: string[];
  isLoading?: boolean;
  defaultPageSize?: number;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchKeys = [],
  searchPlaceholder = "Search...",
  filterTabs,
  getRowId,
  resultLabel = "results",
  emptyMessage = "No data",
  emptyDescription,
  emptyFilteredMessage = "No results match your search",
  emptyFilteredDescription = "Try adjusting your search or filter.",
  toolbar,
  hiddenColumns = [],
  isLoading = false,
  defaultPageSize = 10,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = useMemo(
    () => createColumnHelper<DataTableFeatures, TData>(),
    [],
  );

  const searchColumn = useMemo(
    () =>
      columnHelper.display({
        id: SEARCH_COLUMN_ID,
        filterFn: (row, _columnId, filterValue) => {
          const q = String(filterValue ?? "")
            .trim()
            .toLowerCase();
          if (!q) return true;

          return searchKeys.some((key) => {
            const value = getByPath(
              row.original as Record<string, unknown>,
              key,
            );
            return String(value ?? "")
              .toLowerCase()
              .includes(q);
          });
        },
      }),
    [columnHelper, searchKeys],
  );

  const filterableColumnIds = useMemo(
    () => new Set(filterTabs?.map((tab) => tab.columnId) ?? []),
    [filterTabs],
  );

  const allColumns = useMemo(
    () => [
      searchColumn,
      ...columns.map((column) => {
        const id =
          "accessorKey" in column && typeof column.accessorKey === "string"
            ? column.accessorKey
            : column.id;

        if (!id || !filterableColumnIds.has(id) || column.filterFn) {
          return column;
        }

        return { ...column, filterFn: "equalsString" } as ColumnDef<
          DataTableFeatures,
          TData
        >;
      }),
    ],
    [searchColumn, columns, filterableColumnIds],
  );

  const table = useTable({
    features,
    columns: allColumns,
    data,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      columnVisibility: {
        [SEARCH_COLUMN_ID]: false,
        ...Object.fromEntries(hiddenColumns.map((id) => [id, false])),
      },
      pagination: {
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
    },
    getRowId,
  });

  const rows = table.getRowModel().rows;
  const filteredTotal = table.getFilteredRowModel().rows.length;

  const tabCounts = useMemo(() => {
    const counts = new Map<string, number>();

    if (!filterTabs) return counts;

    for (const tab of filterTabs) {
      counts.set(`${tab.columnId}::all`, data.length);

      for (const option of tab.options) {
        counts.set(
          `${tab.columnId}::${String(option.value)}`,
          data.filter(
            (row) =>
              (row as Record<string, unknown>)[tab.columnId] === option.value,
          ).length,
        );
      }
    }

    return counts;
  }, [filterTabs, data]);

  const isFiltered = rows.length === 0 && data.length > 0;

  return (
    <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="flex flex-col gap-3 p-4 border-b sm:flex-row sm:items-center sm:justify-between">
        {searchKeys.length > 0 && (
          <div className="relative w-full sm:max-w-xs">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={
                (table
                  .getColumn(SEARCH_COLUMN_ID)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                table
                  .getColumn(SEARCH_COLUMN_ID)
                  ?.setFilterValue(event.target.value || undefined);
                table.setPageIndex(0);
              }}
              placeholder={searchPlaceholder}
              className="pl-8"
              aria-label={searchPlaceholder}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {filterTabs && (
            <div className="flex flex-wrap gap-1">
              {filterTabs.map((tab) => {
                const activeValue = columnFilters.find(
                  (filter) => filter.id === tab.columnId,
                )?.value as unknown;

                return (
                  <div key={tab.columnId} className="flex flex-wrap gap-1">
                    <Button
                      variant={activeValue === undefined ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        table
                          .getColumn(tab.columnId)
                          ?.setFilterValue(undefined);
                        table.setPageIndex(0);
                      }}
                    >
                      All
                      <span
                        className={
                          activeValue === undefined
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }
                      >
                        {tabCounts.get(`${tab.columnId}::all`)}
                      </span>
                    </Button>

                    {tab.options.map((option) => {
                      const isActive = activeValue === option.value;

                      return (
                        <Button
                          key={String(option.value)}
                          variant={isActive ? "default" : "ghost"}
                          size="sm"
                          onClick={() => {
                            table
                              .getColumn(tab.columnId)
                              ?.setFilterValue(
                                isActive ? undefined : option.value,
                              );
                            table.setPageIndex(0);
                          }}
                        >
                          {option.label}
                          <span
                            className={
                              isActive
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }
                          >
                            {tabCounts.get(
                              `${tab.columnId}::${String(option.value)}`,
                            )}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
          {toolbar}
        </div>
      </div>

      {isLoading ? (
        <div className="w-full min-w-0 overflow-x-auto">
          <Table className="min-w-max">
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {table.getVisibleLeafColumns().map((column) => (
                    <TableCell key={column.id} className="px-4">
                      <Skeleton className="w-full h-4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : rows.length > 0 ? (
        <>
          <div className="w-full min-w-0 overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="px-4">
                        {header.isPlaceholder ? null : (
                          <table.FlexRender header={header} />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4">
                        <table.FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {rows.length} of {filteredTotal} {resultLabel}
            </p>
            <DataTablePagination table={table} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 px-4 py-16 text-center">
          <InboxIcon className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isFiltered ? emptyFilteredMessage : emptyMessage}
          </p>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? emptyFilteredDescription : emptyDescription}
          </p>
        </div>
      )}
    </div>
  );
}

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}
