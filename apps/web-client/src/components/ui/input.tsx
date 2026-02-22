import { cn } from "@/lib/utils";
import React, { type ComponentProps, type ReactElement } from "react";

function BaseInput({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-8 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
type InputProps = ComponentProps<typeof BaseInput> & {
  beforeContent?: ReactElement;
  afterContent?: ReactElement;
  containerProps?: ComponentProps<"div">;
};

function Input({
  className,
  type,
  beforeContent,
  afterContent,
  children,
  containerProps: { className: containerClassName, ...containerProps } = {},
  ...props
}: InputProps) {
  if (!beforeContent && !afterContent) {
    return <BaseInput type={type} className={className} {...props} />;
  }

  return (
    <div
      className={cn("flex items-stretch", containerClassName)}
      {...containerProps}
    >
      {beforeContent && (
        <div className="flex items-center px-2 text-muted-foreground border border-input border-r-0 rounded-l-md shadow-xs transition-[color,box-shadow]">
          {React.cloneElement<any>(beforeContent, {
            className: "size-4 ",
          })}
        </div>
      )}

      <BaseInput
        type={type}
        className={cn(
          beforeContent && "rounded-l-none",
          afterContent && "rounded-r-none",
          className,
        )}
        {...props}
      />

      {afterContent && (
        <div className="flex items-center px-2 text-muted-foreground border border-input border-l-0 rounded-r-md shadow-xs transition-[color,box-shadow]">
          {React.cloneElement<any>(afterContent, {
            className: "size-4",
          })}
        </div>
      )}

      {children}
    </div>
  );
}

export { Input };
