"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 size-4 animate-spin" />
        Menyalakan kamera...
      </div>
    ),
  },
);

interface QrScannerProps {
  onScan: (orderNumber: string) => void;
  onError?: (error: unknown) => void;
}

export function QrScanner({ onScan, onError }: QrScannerProps) {
  return (
    <div className="overflow-hidden rounded-lg border max-w-sm mx-auto">
      <Scanner
        formats={["qr_code"]}
        scanDelay={1000}
        onScan={(detectedCodes) => {
          const raw = detectedCodes[0]?.rawValue;

          if (raw) onScan(raw);
        }}
        onError={onError}
        components={{
          onOff: false,
          torch: true,
          zoom: true,
          finder: false,
        }}
        styles={{
          container: { height: "100%" },
          video: { objectFit: "cover" },
        }}
        classNames={{ container: "aspect-square w-full" }}
      >
        <div className="pointer-events-none absolute m-6 inset-x-6 inset-y-6">
          <span className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-white/90 rounded-tl-lg" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-white/90 rounded-tr-lg" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-white/90 rounded-bl-lg" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-white/90 rounded-br-lg" />
        </div>
      </Scanner>
    </div>
  );
}
