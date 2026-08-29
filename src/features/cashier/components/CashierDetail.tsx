"use client";

import { useState } from "react";
import { Clock, ShoppingBasket } from "lucide-react";

import { OrderStatusBadge } from "@/features/order/components/StatusBadge";
import { CashierType } from "@/types/cashier";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CashierDetail({
  order,
  onPaid,
}: {
  order: CashierType | null;
  onPaid: () => void;
}) {
  const [received, setReceived] = useState("");

  if (!order) {
    return (
      <Card className="flex min-h-full flex-col items-center justify-center text-center text-muted-foreground">
        <ShoppingBasket className="mb-3 size-10" />
        <p className="font-medium text-foreground">Belum ada order</p>
        <p className="mt-1 max-w-55 text-sm">
          Masukan nomor order atau scan QR code untuk memproses pembayaran
        </p>
      </Card>
    );
  }

  const receivedValue = Number(received.replace(/\D/g, "")) || 0;
  const change = receivedValue - order.total;
  const isEnough = change >= 0 && receivedValue > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="truncate">{order.order_number}</CardTitle>

            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {dateFormatter(order.created_at)}
            </p>
          </div>

          <div className="shrink-0">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      </CardHeader>

      <div className="flex-1 space-y-4 px-(--card-spacing)">
        <ul className="space-y-2.5">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="flex items-baseline justify-between gap-2 text-sm"
            >
              <span className="min-w-0 font-medium">
                {item.name}{" "}
                <span className="text-muted-foreground">×{item.quantity}</span>
              </span>

              <span className="shrink-0 text-muted-foreground">
                {currencyFormatter(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator />

        <dl className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{currencyFormatter(order.subtotal)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Pajak</dt>
            <dd>{currencyFormatter(order.tax_amount)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Service</dt>
            <dd>{currencyFormatter(order.service_amount)}</dd>
          </div>
        </dl>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-lg font-semibold">
            {currencyFormatter(order.total)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="received">Uang diterima</Label>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0"
            id="received"
            value={
              received
                ? currencyFormatter(receivedValue).replace(/\s/g, " ")
                : ""
            }
            onChange={(e) => setReceived(e.target.value)}
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            <Button
              type="button"
              size="sm"
              variant={"outline"}
              className={"w-fit border border-red-500 text-red-500"}
              onClick={() => setReceived("10000")}
            >
              Rp 10.000
            </Button>
            <Button
              type="button"
              size="sm"
              variant={"outline"}
              className={"w-fit border border-red-500 text-red-500"}
              onClick={() => setReceived("20000")}
            >
              Rp 20.000
            </Button>
            <Button
              type="button"
              size="sm"
              variant={"outline"}
              className={"w-fit border border-red-500 text-red-500"}
              onClick={() => setReceived("50000")}
            >
              Rp 50.000
            </Button>
            <Button
              type="button"
              size="sm"
              variant={"outline"}
              className={"w-fit border border-red-500 text-red-500"}
              onClick={() => setReceived("100000")}
            >
              Rp 100.000
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2.5">
          <span className="text-sm font-medium">Kembalian</span>
          <span
            className={
              isEnough
                ? "font-semibold text-emerald-600 dark:text-emerald-400"
                : "font-semibold text-destructive"
            }
          >
            {isEnough
              ? currencyFormatter(change)
              : receivedValue > 0
                ? "- " + currencyFormatter(Math.abs(change))
                : currencyFormatter(0)}
          </span>
        </div>

        <Button
          type="button"
          disabled={!isEnough || order.status !== "pending"}
          className="w-full py-5 bg-red-500 hover:bg-red-600 hover:scale hover:scale-[0.98] active:scale-100"
          size="lg"
          onClick={onPaid}
        >
          Bayar
        </Button>
      </div>
    </Card>
  );
}
