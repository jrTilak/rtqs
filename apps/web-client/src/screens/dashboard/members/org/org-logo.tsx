import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import type { ComponentProps } from "react";

type Props = {
  src?: string | null;
} & (ComponentProps<"img"> | ComponentProps<"svg">);

export const OrgLogo = ({ src, className, ...rest }: Props) => {
  if (src) {
    return (
      <img
        src={src}
        className={cn(
          "size-4 rounded-md object-cover object-center",
          className,
        )}
        {...(rest as ComponentProps<"img">)}
      />
    );
  }
  return (
    <Icon name={ICONS_ENUM.ORGANIZATION} className={cn("size-4", className)} />
  );
};
