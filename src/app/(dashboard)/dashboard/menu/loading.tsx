import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 h-7" />
          <Skeleton className="w-64 h-4" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-8 w-60" />
        </div>

        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
