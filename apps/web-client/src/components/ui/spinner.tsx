import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { Icon } from "../icon";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Spinner = ({
  className,
  ...props
}: Omit<ComponentProps<typeof Icon>, "name">) => {
  return (
    <Icon
      name={ICONS_ENUM.SPINNER}
      className={cn("animate-spin", className)}
      {...props}
    />
  );
};
