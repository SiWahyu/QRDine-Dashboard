import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/order";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        red: "bg-red-500/10 text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

const dotVariants = cva("size-1.5 rounded-full", {
  variants: {
    tone: {
      neutral: "bg-current opacity-50",
      amber: "bg-amber-500",
      blue: "bg-blue-500",
      green: "bg-emerald-500",
      red: "bg-red-500",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
});

type Tone = "neutral" | "amber" | "blue" | "green" | "red";

const ORDER_STATUS_TONE: Record<OrderStatus, Tone> = {
  pending: "amber",
  confirmed: "blue",
  preparing: "blue",
  completed: "green",
  cancelled: "red",
};

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  completed: "Completed",
  cancelled: "Cancelled",
};

const PAYMENT_STATUS_TONE: Record<PaymentStatus, Tone> = {
  pending: "amber",
  paid: "green",
  failed: "red",
};

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: "Unpaid",
  paid: "Paid",
  failed: "Failed",
};

function StatusBadge({
  tone,
  label,
  className,
}: {
  tone: Tone;
  label: string;
  className?: string;
}) {
  return (
    <span className={cn(statusBadgeVariants({ tone }), className)}>
      <span className={cn(dotVariants({ tone }))} />
      {label}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <StatusBadge
      tone={ORDER_STATUS_TONE[status]}
      label={ORDER_STATUS_LABEL[status]}
    />
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <StatusBadge
      tone={PAYMENT_STATUS_TONE[status]}
      label={PAYMENT_STATUS_LABEL[status]}
    />
  );
}

export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  return (
    <StatusBadge
      tone={method === "cash" ? "neutral" : "blue"}
      label={method === "cash" ? "Cash" : "Online"}
    />
  );
}
