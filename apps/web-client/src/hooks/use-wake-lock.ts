import { useEffect, useRef } from "react";

export function useWakeLock(enabled: boolean = true) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!("wakeLock" in navigator)) {
      console.warn("Screen Wake Lock API not supported");
      return;
    }

    let isActive = true;

    const requestWakeLock = async () => {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");

        wakeLockRef.current.addEventListener("release", () => {
          if (isActive) requestWakeLock();
        });
      } catch (err) {
        console.error("Failed to acquire wake lock:", err);
      }
    };

    requestWakeLock();

    return () => {
      isActive = false;
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, [enabled]);
}
