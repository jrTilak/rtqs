import { useEffect } from "react";

type Options = {
  enabled?: boolean;
  message?: string;
};

export function usePreventNavigation({ enabled = true }: Options = {}) {
  useEffect(() => {
    if (!enabled) return;

    // 🔒 Prevent refresh / tab close / browser close
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = true; // Required for some legacy browsers
      return true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [enabled]);
}
