import { useState, useEffect, useRef } from "react";

/**
 * Returns a debounced value that updates only after `delay` ms of no changes.
 */
function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const valueRef = useRef(value);
  const isMountedRef = useRef(true);

  valueRef.current = value;

  useEffect(() => {
    isMountedRef.current = true;
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        setDebouncedValue(valueRef.current);
      }
    }, delay);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export { useDebouncedValue };
