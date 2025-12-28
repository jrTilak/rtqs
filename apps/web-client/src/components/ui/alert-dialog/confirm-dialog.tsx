import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type ConfirmAlertDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  cancel?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  onCancel?: () => void;
  onAction?: () => void;
  /**
   * Number of seconds to wait for untill the action button is enabled
   */
  waitUntillAction?: number;
};

export function ConfirmAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancel,
  action,
  variant = "default",
  onAction,
  onCancel,
  waitUntillAction,
}: ConfirmAlertDialogProps) {
  const [waitUntill, setWaitUntill] = useState(waitUntillAction || 0);

  useEffect(() => {
    if (waitUntill > 0) {
      const timer = setTimeout(() => {
        setWaitUntill(waitUntill - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [waitUntill]);

  const isDestructive = variant === "destructive";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(isDestructive && "border-destructive/50 border")}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className={cn(isDestructive && "text-destructive")}>
            {title}
          </AlertDialogTitle>

          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className={cn(!cancel && "justify-end")}>
          {cancel && (
            <AlertDialogCancel onClick={onCancel}>{cancel}</AlertDialogCancel>
          )}

          {action && (
            <AlertDialogAction
              variant={variant}
              onClick={onAction}
              disabled={waitUntill > 0}
            >
              {action} {waitUntill > 0 && `(${waitUntill}s)`}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
