import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function OrderBoardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-3">
      <p className="text-sm text-muted-foreground">Failed to load orders.</p>

      <Button variant="outline" onClick={onRetry}>
        <RefreshCw />
        Retry
      </Button>
    </div>
  );
}