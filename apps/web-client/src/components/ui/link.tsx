import { cn } from "@/lib/utils";
import { Link as LinkPrimitive } from "@tanstack/react-router";
import { type ComponentProps } from "react";

export const Link = ({
  className,
  to,
  target,
  ...props
}: ComponentProps<typeof LinkPrimitive>) => {
  return (
    <LinkPrimitive
      to={to}
      target={(target ?? to?.startsWith("http")) ? "_blank" : undefined}
      className={cn("text-primary/80 underline", className)}
      {...props}
    />
  );
};
