import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

export type ConfirmAlertDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: React.ReactNode
  cancel?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
  onCancel?: () => void
  onAction?: () => void
}

export function ConfirmAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancel,
  action,
  variant = "default",
  onAction,
  onCancel
}: ConfirmAlertDialogProps) {
  const isDestructive = variant === "destructive"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          isDestructive && "border-destructive/50 border"
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            className={cn(
              isDestructive && "text-destructive"
            )}
          >
            {title}
          </AlertDialogTitle>

          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className={cn(!cancel && "justify-end")}>
          {cancel && (
            <AlertDialogCancel onClick={onCancel}>
              {cancel}
            </AlertDialogCancel>
          )}

          {action && (
            <AlertDialogAction variant={variant} onClick={onAction}>
              {action}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

