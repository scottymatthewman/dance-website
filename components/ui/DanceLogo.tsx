import { cn } from "@/lib/cn";

type DanceLogoProps = {
  className?: string;
};

export function DanceLogo({ className }: DanceLogoProps) {
  return (
    <img
      src="/icons/DanceLogo.svg"
      alt="Dance"
      width={321}
      height={90}
      className={cn("h-4 w-auto shrink-0 md:h-5", className)}
    />
  );
}
