"use client";

import { useEffect, useState } from "react";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  futureTime: number; // timestamp in ms
  showHH?: boolean;
  onComplete?: () => void;
};

export function Timer({
  futureTime,
  showHH = true,
  className,
  onComplete,
  ...props
}: Props) {
  const [time, setTime] = useState({
    hh: "00",
    mm: "00",
    ss: "00",
  });

  useEffect(() => {
    const updateTime = () => {
      const diff = futureTime - Date.now();

      if (diff <= 0) {
        setTime({ hh: "00", mm: "00", ss: "00" });
        onComplete?.();
        return true; // completed
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hh = Math.floor(totalSeconds / 3600);
      const mm = Math.floor((totalSeconds % 3600) / 60);
      const ss = totalSeconds % 60;

      setTime({
        hh: String(hh).padStart(2, "0"),
        mm: String(mm).padStart(2, "0"),
        ss: String(ss).padStart(2, "0"),
      });
      return false;
    };

    if (updateTime()) return;

    const interval = setInterval(() => {
      if (updateTime()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [futureTime, onComplete]);

  return (
    <div
      className={cn("font-medium tabular-nums font-mono", className)}
      {...props}
    >
      {showHH ? `${time.hh}:${time.mm}:${time.ss}` : `${time.mm}:${time.ss}`}
    </div>
  );
}
