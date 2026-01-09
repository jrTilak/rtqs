import { cn } from "@/lib/utils";
import { IconLoader3 } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      none: "",
      default: "size-4",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SpinnerProps = ComponentProps<"svg"> &
  VariantProps<typeof loaderVariants> & {
    asChild?: boolean;
  };

function Spinner({ className, asChild = false, size, ...props }: SpinnerProps) {
  const Elem = asChild ? Slot.Root : IconLoader3;
  return (
    // @ts-expect-error: todo fix
    <Elem
      role="status"
      aria-label="Loading"
      className={cn(loaderVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner };
