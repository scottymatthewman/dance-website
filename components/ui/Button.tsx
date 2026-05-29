import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const sizeClasses = {
  default: "text-base px-5 py-3",
  sm: "text-sm px-4 py-2",
} as const;

type ButtonProps = ComponentProps<"a"> & {
  children: ReactNode;
  href: string;
  size?: keyof typeof sizeClasses;
};

export function Button({
  className,
  children,
  href,
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white text-inverse font-medium leading-normal transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
