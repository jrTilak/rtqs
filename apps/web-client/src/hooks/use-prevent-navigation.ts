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

    // 🔒 Prevent back/forward navigation
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Push initial state so back button gets trapped
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [enabled]);
}
