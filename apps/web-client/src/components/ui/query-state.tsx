import type { UseQueryResult } from "@tanstack/react-query";
import React, { createContext, Fragment, useContext } from "react";
import { Spinner } from "./spinner";
import { P } from "./typography";
import { Button } from "./button";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type QueryStateContext<TData = unknown> = UseQueryResult<TData> & {
  isEmpty: boolean;
};

const Context = createContext<QueryStateContext | null>(null);

function useQueryState<TData>() {
  const ctx = useContext(Context) as QueryStateContext<TData> | null;
  if (!ctx) {
    throw new Error("QueryState components must be used inside <QueryState />");
  }
  return ctx;
}

type QueryStateProps<TData> = {
  children: React.ReactNode;
} & QueryStateContext<TData>;

function QueryState<TData>({ children, ...query }: QueryStateProps<TData>) {
  return <Context.Provider value={query}>{children}</Context.Provider>;
}

type QueryStateLoadingProps = {
  children?: React.ReactNode;
  map?: boolean;
  mapLength?: number;
  className?: string;
};

function QueryStateLoading({
  children,
  map = true,
  mapLength = 4,
  className,
}: QueryStateLoadingProps) {
  const { isLoading } = useQueryState();

  if (!isLoading) return null;

  if (!children) {
    return (
      <div
        className={cn(
          "flex items-center flex-col justify-center py-12 gap-4",
          className
        )}
      >
        <Spinner />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {!map
        ? children
        : Array.from({ length: mapLength }).map((_, i) => (
            <Fragment key={i}>{children}</Fragment>
          ))}
    </div>
  );
}

type QueryStateDataProps<TData> = {
  children: ((data: TData) => React.ReactNode) | React.ReactNode;
};

function QueryStateData<TData>({ children }: QueryStateDataProps<TData>) {
  const { isLoading, isError, data, isEmpty } = useQueryState<TData>();

  if (isLoading || isError || isEmpty) return null;

  return typeof children === "function" ? children(data as TData) : children;
}

type QueryStateErrorProps = {
  children?: React.ReactNode;
};

function QueryStateError({ children }: QueryStateErrorProps) {
  const { isError, isLoading, error, refetch, isRefetching } = useQueryState();

  if (isLoading || !isError) return null;
  if (children) return children;

  return (
    <div className={"flex flex-col items-center gap-3 py-12"}>
      <P className="text-destructive">
        {error?.message ?? "Failed to load data"}
      </P>
      <Button
        variant={"destructive-outline"}
        onClick={() => refetch()}
        isLoading={isRefetching}
      >
        Retry <RotateCcw />
      </Button>
    </div>
  );
}

type QueryStateEmptyProps = {
  children?: React.ReactNode;
};

function QueryStateEmpty({ children }: QueryStateEmptyProps) {
  const { isLoading, isError, isEmpty } = useQueryState();

  if (isLoading || isError || !isEmpty) return null;

  if (children && typeof children !== "string") return children;

  return (
    <div className={"flex flex-col items-center py-12"}>
      <P className="text-muted-foreground">{children ?? "No data found"}</P>
    </div>
  );
}

QueryState.Loading = QueryStateLoading;
QueryState.Data = QueryStateData;
QueryState.Error = QueryStateError;
QueryState.Empty = QueryStateEmpty;

export { QueryState, useQueryState };
