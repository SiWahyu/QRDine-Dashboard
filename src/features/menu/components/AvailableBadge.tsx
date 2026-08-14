import { Badge } from "@/components/ui/badge";

export default function AvailableBadge({ available }: { available: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={`${available ? "text-blue-600 bg-blue-500/10 dark:text-blue-400" : "text-red-600 bg-red-500/10 dark:text-red-400"}`}
    >
      <div
        className={`size-1.5 rounded-full ${available ? "bg-blue-500" : "bg-red-500"}`}
      />
      {available ? "Tersedia" : "Tidak Tersedia"}
    </Badge>
  );
}
