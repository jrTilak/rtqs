"use client";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "@tanstack/react-router";
import React, { createContext, useContext, useEffect, useState } from "react";

type BreadcrumbContextType = {
  items: string[] | null;
  setItems: (items: string[] | null) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<string[] | null>(null);
  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function BreadcrumbTitle({ items }: { items: string[] }) {
  const { setItems } = useBreadcrumb();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableItems = React.useMemo(() => items, [JSON.stringify(items)]);

  useEffect(() => {
    setItems(stableItems);
    return () => {
      setItems(null);
    };
  }, [stableItems, setItems]);

  return null;
}

const Breadcrumb = () => {
  const { items } = useBreadcrumb();
  const pathname = useLocation().pathname;
  const segment = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin")
    .pop();

  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">{item}</BreadcrumbPage>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))
        ) : segment ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export { Breadcrumb };
