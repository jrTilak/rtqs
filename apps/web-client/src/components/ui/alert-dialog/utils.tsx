import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ConfirmAlertDialog,
  type ConfirmAlertDialogProps,
} from "./confirm-dialog.tsx";

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
  props: Omit<ConfirmAlertDialogProps, "cancel">
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
