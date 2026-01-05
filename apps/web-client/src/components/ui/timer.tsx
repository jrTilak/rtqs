"use client";

import { useEffect, useState } from "react";

type Props = {
  futureTime: number; // timestamp in ms
};

export function Timer({ futureTime }: Props) {
  const [time, setTime] = useState({
    hh: "00",
    mm: "00",
    ss: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = futureTime - Date.now();

      if (diff <= 0) {
        setTime({ hh: "00", mm: "00", ss: "00" });
        clearInterval(interval);
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
    }, 1000);

    return () => clearInterval(interval);
  }, [futureTime]);

  return (
    <div>
      {time.hh}:{time.mm}:{time.ss}
    </div>
  );
}
