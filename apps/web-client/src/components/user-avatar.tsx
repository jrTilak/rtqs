import type { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("rounded-full object-center object-cover", {
  variants: {
    size: {
      default: "size-8",
      sm: "size-6",
      lg: "size-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Props = ComponentProps<typeof Avatar> & {
  name: string;
  src?: string | null;
} & VariantProps<typeof avatarVariants>;

export const UserAvatar = ({ src, className, ...props }: Props) => {
  return (
    <Avatar
      {...props}
      className={cn(avatarVariants({ size: props.size }), className)}
    >
      <AvatarFallback asChild>
        <img
          className="w-full h-full rounded-full object-center object-cover"
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${props.name}`}
        />
      </AvatarFallback>
      {src && <AvatarImage src={src} />}
    </Avatar>
  );
};
