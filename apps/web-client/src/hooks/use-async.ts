import { useCallback, useEffect, useState } from "react";

// Define and export an enum representing different states of the asynchronous operation
export enum AsyncStatus {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

// Define an interface for the object returned from the `useAsync` hook
interface AsyncState<T> {
  status: AsyncStatus;
  value: T | null;
  error: Error | null;
  execute: (...args: unknown[]) => Promise<void>;
}

const useAsync = <T>(
  asyncFunction: (...args: unknown[]) => Promise<T>,
  immediate = true,
): AsyncState<T> => {
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.IDLE);

  const [value, setValue] = useState<T | null>(null);

  const [error, setError] = useState<Error | null>(null);

  // The `execute` function wraps `asyncFunction` with the provided
  // arguments and handles setting state;
  // `useCallback` prevents `useEffect` from being called on every render,
  // so the `useEffect` is triggered only when `asyncFunction` changes (its reference)
  const execute = useCallback(
    async (...args: unknown[]) => {
      setStatus(AsyncStatus.PENDING);

      setValue(null);

      setError(null);

      try {
        const response = await asyncFunction(...args);

        setValue(response);

        setStatus(AsyncStatus.SUCCESS);
      } catch (error) {
        setError(error as Error);

        setStatus(AsyncStatus.ERROR);
      }
    },
    [asyncFunction],
  );

  // Automatically run `execute` if `immediate` is `true` on component mount,
  // alternatively, `execute` can be triggered manually (e.g., via a button click)
  useEffect(() => {
    if (immediate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      execute();
    }
  }, [execute, immediate]); // Re-run `useEffect` only when any of these values change

  return { execute, status, value, error };
};

export { useAsync };
