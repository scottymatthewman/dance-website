import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ComponentProps<"a"> & {
  children: ReactNode;
  href: string;
};

export function Button({ className, children, href, ...props }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-button inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-medium leading-normal text-inverse transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
