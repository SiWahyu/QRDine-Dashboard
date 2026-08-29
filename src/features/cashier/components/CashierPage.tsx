"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashierType } from "@/types/cashier";
import { CashierDetail } from "./CashierDetail";
import { QrScanner } from "./QrScanner";
import { SearchOrder } from "./SearchOrder";
import { useSearchOrder } from "../hooks/useSearchOrder";
import { checkoutOrderAction } from "../action/order-checkout-action";
import { toast } from "sonner";

export function CashierPage() {
  const [order, setOrder] = useState<CashierType | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const { mutate: searchOrder, isPending, isError, error } = useSearchOrder();

  const handleScan = (orderNumber: string) => {
    const value = orderNumber.trim();

    if (!value) return;

    setIsScanning(false);

    searchOrder(value, {
      onSuccess: (found) => {
        setOrder(found);
      },
    });
  };

  const handlePaid = async () => {
    const result = await checkoutOrderAction(order?.order_number || "");

    if (!result.success) {
      toast.error(result.message, {
        position: "top-right",
      });

      return;
    }

    setOrder((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        status: "confirmed",
        payment_status: "paid",
      };
    });

    toast.success(result.message, {
      position: "top-right",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cashier</h1>

        <p className="text-sm text-muted-foreground">
          Cari order untuk memproses pembayaran pelanggan.
        </p>
      </div>

      <div className="grid grid-cols-3 items-start gap-6 h-full">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cari Order</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <SearchOrder
                onOrderFound={setOrder}
                onSearchStart={() => setOrder(null)}
              />

              <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span>atau</span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setIsScanning((prev) => !prev)}
              >
                <QrCode />
                {isScanning ? "Tutup Scanner" : "Scan QR"}
              </Button>

              {isScanning && <QrScanner onScan={handleScan} />}

              {isPending && (
                <p className="text-sm text-muted-foreground">Memuat order...</p>
              )}

              {isError && (
                <p className="text-sm text-destructive">
                  {error?.status === 404
                    ? "Order tidak ditemukan"
                    : "Terjadi kesalahan"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="min-w-0 h-full">
          <CashierDetail order={order} onPaid={handlePaid} />
        </div>
      </div>
    </div>
  );
}
