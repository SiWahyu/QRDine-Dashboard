import { Skeleton } from "@/components/ui/skeleton";

import { COLUMNS } from "./orderBoardConfig";

export function OrderBoardSkeleton() {
  return (
    <div className="grid h-[calc(100dvh-4rem)] grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {COLUMNS.map((column) => (
        <div key={column.id} className="rounded-xl border bg-card p-3">
          <div className="flex items-center gap-2 px-1 py-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="mt-2 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}