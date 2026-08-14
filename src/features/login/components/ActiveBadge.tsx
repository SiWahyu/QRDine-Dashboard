import { Badge } from "@/components/ui/badge";

export default function ActiveBadge({ active }: { active: boolean }) {
  return (
    <Badge
      variant="secondary"
      className={`${active ? "text-blue-600 bg-blue-500/10 dark:text-blue-400" : "text-red-600 bg-red-500/10 dark:text-red-400"}`}
    >
      <div
        className={`size-1.5 rounded-full ${active ? "bg-blue-500" : "bg-red-500"}`}
      />
      {active ? "Tersedia" : "Tidak Tersedia"}
    </Badge>
  );
}
