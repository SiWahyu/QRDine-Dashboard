import { Skeleton } from "@/components/ui/skeleton";

import { ORDER_STATUS_COLUMNS } from "./orderStatusConfig";

export function OrderStatusBoardSkeleton() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-3 md:overflow-hidden">
      {ORDER_STATUS_COLUMNS.map((column) => (
        <div key={column.id} className="rounded-2xl border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-2.5 px-1 py-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="mt-2 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-[100px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
