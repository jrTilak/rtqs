import type { ComponentProps } from "react";
import { Badge } from "./ui/badge";
import { colorFromSeed } from "@/lib/color-from-seed";
import { reverseString } from "@/lib/reverse-string";

type Props = ComponentProps<typeof Badge>;

const UniqueBadge = ({ style, variant = "outline", ...props }: Props) => {
  return (
    <Badge
      style={{
        backgroundColor: colorFromSeed(String(props.children), 0.6),
        borderColor: colorFromSeed(reverseString(String(props.children)), 0.3),
        borderWidth: 1,
        ...style,
      }}
      variant={variant}
      {...props}
    />
  );
};

export { UniqueBadge };
