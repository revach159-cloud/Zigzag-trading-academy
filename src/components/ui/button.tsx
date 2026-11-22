import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zz-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zz-void)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--zz-cyan)] text-[var(--zz-void)] hover:bg-[var(--zz-cyan-bright)]",
        secondary:
          "border border-[var(--zz-line)] bg-transparent text-[var(--zz-ink)] hover:border-[var(--zz-cyan)] hover:text-[var(--zz-cyan)]",
        ghost: "text-[var(--zz-muted)] hover:text-[var(--zz-ink)]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ButtonVariants &
  ComponentProps<"button"> & {
    href?: undefined;
    children: ReactNode;
  };

type ButtonAsLink = ButtonVariants &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
    children: ReactNode;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
