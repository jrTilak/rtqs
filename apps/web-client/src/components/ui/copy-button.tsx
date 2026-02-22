import { useCallback, useState } from "react";
import { Button } from "./button";
import { ICONS_ENUM } from "@rtqs/plugin-loader";
import { Icon } from "../icon";

type Props = {
  children: string;
};

export const CopyButton = (props: Props) => {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const onCopy = useCallback(async () => {
    if (!props.children) return;
    try {
      await navigator.clipboard.writeText(props.children);
      setStatus("copied");
    } catch (error) {
      setStatus("failed");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }
  }, [props.children]);

  const IconComp = useCallback(() => {
    if (status === "copied") {
      return <Icon name={ICONS_ENUM.CHECK} className="text-success" />;
    } else if (status === "failed") {
      return <Icon name={ICONS_ENUM.X} className="text-destructive" />;
    }
    return <Icon name={ICONS_ENUM.COPY} />;
  }, [status]);

  return (
    <Button
      onClick={onCopy}
      variant={"ghost"}
      className="h-auto w-auto px-0 py-0"
    >
      <IconComp />
    </Button>
  );
};
