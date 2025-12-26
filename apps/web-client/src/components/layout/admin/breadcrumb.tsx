"use client";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useLocation } from "@tanstack/react-router";

const Breadcrumb = () => {
  const pathname = useLocation().pathname;
  const segment = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin")
    .pop();
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {segment ? (
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
