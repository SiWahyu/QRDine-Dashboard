import { Skeleton } from "@/components/ui/skeleton";

type FormSkeletonProps = {
  pageTitle?: string;
  pageDescription?: string;
  cardTitle?: string;
  cardDescription?: string;
  fields?: number;
};

export function FormSkeleton({
  pageTitle,
  pageDescription,
  cardTitle = "w-36 h-6",
  cardDescription = "w-72 h-4",
  fields = 2,
}: FormSkeletonProps) {
  return (
    <div className="flex flex-col gap-6">
      {pageTitle && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-40 h-8" />
            {pageDescription && <Skeleton className="w-64 h-4" />}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div className="flex flex-col gap-2 p-6 border-b">
          <Skeleton className={cardTitle} />
          <Skeleton className={cardDescription} />
        </div>

        <div className="flex flex-col gap-6 p-6">
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>

        <div className="flex gap-4 p-6 border-t">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-28 h-10" />
        </div>
      </div>
    </div>
  );
}
