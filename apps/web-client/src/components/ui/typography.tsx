import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const typographyVariants = cva("antialiased", {
  variants: {
    level: {
      h1: `
          text-3xl leading-tight font-semibold tracking-tight
          sm:text-4xl sm:leading-tight
          lg:text-5xl lg:leading-none
        `,
      h2: `
          text-2xl leading-tight font-semibold tracking-tight
          sm:text-3xl sm:leading-tight
          lg:text-4xl lg:leading-snug
        `,
      h3: `
          text-xl leading-snug font-semibold tracking-tight
          sm:text-2xl
          lg:text-3xl
        `,
      h4: `
          text-lg leading-snug font-semibold
          sm:text-xl
          lg:text-2xl
        `,
      h5: `
          text-base leading-snug font-semibold
          sm:text-lg
          lg:text-xl
        `,
      p: `
          text-base
        `,
      text: ``,
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

const H1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(typographyVariants({ level: "h1" }), className)}
    {...props}
  />
);

const H2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(typographyVariants({ level: "h2" }), className)}
    {...props}
  />
);

const H3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(typographyVariants({ level: "h3" }), className)}
    {...props}
  />
);

const H4 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4
    className={cn(typographyVariants({ level: "h4" }), className)}
    {...props}
  />
);

const H5 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={cn(typographyVariants({ level: "h5" }), className)}
    {...props}
  />
);

const P = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn(typographyVariants({ level: "p", tone: "muted" }), className)}
    {...props}
  />
);

const Text = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(typographyVariants({ level: "text" }), className)}
    {...props}
  />
);

export { H1, H2, H3, H4, H5, P, Text, typographyVariants };
