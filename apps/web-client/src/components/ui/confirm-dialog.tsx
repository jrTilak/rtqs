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
import { createRoot } from "react-dom/client";

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
  waitUntilAction?: number;
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
  waitUntilAction,
}: ConfirmAlertDialogProps) {
  const [waitUntil, setWaitUntil] = useState(waitUntilAction || 0);

  useEffect(() => {
    if (waitUntil > 0) {
      const timer = setTimeout(() => {
        setWaitUntil(waitUntil - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [waitUntil]);

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
              className="min-w-28"
              variant={variant}
              onClick={onAction}
              disabled={waitUntil > 0}
            >
              {action} {waitUntil > 0 && `(${waitUntil}s)`}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Helper to mount a React component into body and clean up
function renderToBody(component: React.ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(component);
  return () => {
    root.unmount();
    container.remove();
  };
}

/** Confirm utility returns a Promise<boolean> */
export function confirm(props: ConfirmAlertDialogProps): Promise<boolean> {
  return new Promise((resolve) => {
    function ConfirmWrapper() {
      const [open, setOpen] = useState(true);

      const handleClose = (result: boolean) => {
        setOpen(false);
        resolve(result);
      };

      return (
        <ConfirmAlertDialog
          {...props}
          open={open}
          onOpenChange={(o) => !o && handleClose(false)}
          cancel={props.cancel || "Cancel"}
          action={props.action || "OK"}
          onAction={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      );
    }

    renderToBody(<ConfirmWrapper />);
  });
}

/** Alert utility: just one action button */
export function alert(
  props: Omit<ConfirmAlertDialogProps, "cancel">,
): Promise<void> {
  return new Promise((resolve) => {
    function AlertWrapper() {
      const [open, setOpen] = useState(true);

      const handleClose = () => {
        setOpen(false);
        resolve();
      };

      return (
        <ConfirmAlertDialog
          {...props}
          open={open}
          onOpenChange={(o) => !o && handleClose()}
          cancel={null} // no cancel for alert
          action={props.action || "OK"}
          onAction={handleClose}
        />
      );
    }

    renderToBody(<AlertWrapper />);
  });
}
