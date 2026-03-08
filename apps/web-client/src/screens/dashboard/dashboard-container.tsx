import { H4, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & {
  title: string;
  description?: string;
};

const DashboardContainer = ({
  className,
  title,
  description,
  children,
  ...props
}: Props) => {
  return (
    <main
      className={cn("mx-auto space-y-6 max-w-6xl w-full", className)}
      {...props}
    >
      <div className="space-y-1">
        <H4>{title}</H4>
        {description && <P className="text-sm">{description}</P>}
      </div>
      {children}
    </main>
  );
};

export { DashboardContainer };
