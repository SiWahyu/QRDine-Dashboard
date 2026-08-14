"use client";

import { type Column, type RowData } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { type DataTableFeatures } from "./data-table-features";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData extends RowData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="sm" className="-ml-2 h-7 px-2">
              <span>{title}</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon />
              ) : (
                <ChevronsUpDownIcon className="text-muted-foreground" />
              )}
            </Button>
          }
        />
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}