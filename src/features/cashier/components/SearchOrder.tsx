"use client";
import { Search } from "lucide-react";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useSearchOrder } from "../hooks/useSearchOrder";
import { CashierType } from "@/types/cashier";

interface SearchOrderProps {
  onOrderFound: (order: CashierType) => void;
  onSearchStart: () => void;
}

export function SearchOrder({ onOrderFound, onSearchStart }: SearchOrderProps) {
  const [orderNumber, setOrderNumber] = useState("");

  const { mutate: searchOrder, isPending, isError, error } = useSearchOrder();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = orderNumber.trim();

    if (!value) return;

    onSearchStart();

    searchOrder(value, {
      onSuccess: (order) => {
        onOrderFound(order);
      },
    });
  };

  return (
    <form onSubmit={handleSearch} className="space-y-2">
      <InputGroup className="h-10">
        <InputGroupInput
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Masukan nomor order"
        />

        <InputGroupAddon align="inline-end">
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={isPending}
          >
            {isPending ? "Mencari..." : "Cari"}
          </Button>
        </InputGroupAddon>
      </InputGroup>

      {isError && (
        <p className="text-sm text-destructive">
          {error?.status === 404
            ? "Order tidak ditemukan"
            : "Terjadi kesalahan"}
        </p>
      )}
    </form>
  );
}
