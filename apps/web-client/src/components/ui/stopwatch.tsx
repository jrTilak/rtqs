"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  startTime: number; // timestamp in ms
  showHH?: boolean;
};

export function Stopwatch({
  startTime,
  showHH = false,
  className,
  ...props
}: Props) {
  const [time, setTime] = useState({
    hh: "00",
    mm: "00",
    ss: "00",
  });

  useEffect(() => {
    const updateTime = () => {
      const diff = Date.now() - startTime;

      if (diff < 0) {
        setTime({ hh: "00", mm: "00", ss: "00" });
        return;
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
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div
      className={cn("font-medium tabular-nums font-mono", className)}
      {...props}
    >
      {showHH ? `${time.hh}:${time.mm}:${time.ss}` : `${time.mm}:${time.ss}`}
    </div>
  );
}
