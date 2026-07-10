import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variantClasses = {
  primary: "bg-primary text-inverse",
  secondary: "border border-[#eee] bg-white text-primary",
  inverse: "bg-white text-black",
  forest: "bg-[#142121] text-white",
} as const;

const sizeClasses = {
  default: "text-base px-5 py-3",
  sm: "text-sm px-4 py-2",
  section: "text-md px-4 py-2",
} as const;

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
} & Omit<ComponentProps<"button">, "children"> &
  Omit<ComponentProps<"a">, "children" | "href">;

export function Button({
  className,
  children,
  href,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md font-medium leading-normal transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ComponentProps<"button">)}
    >
      {children}
    </button>
  );
}
