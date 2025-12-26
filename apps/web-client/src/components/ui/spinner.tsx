import { cn } from "@/lib/utils"
import { IconLoader } from "@tabler/icons-react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import type { ComponentProps } from "react"

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      none: "",
      default: "size-4"
    }
  },
  defaultVariants: {
    size: "default"
  }
})

type SpinnerProps = ComponentProps<"svg"> & VariantProps<typeof loaderVariants> & {
  asChild?: boolean
}

function Spinner({ className, asChild = false, size, ...props }: SpinnerProps) {
  const Elem = asChild ? Slot.Root : IconLoader
  return (
    <Elem role="status" aria-label="Loading" className={cn(loaderVariants({ size }), className)} {...props} />
  )
}

export { Spinner }
