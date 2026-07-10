import { cn } from "@/lib/cn";

type DanceLogoProps = {
  className?: string;
  /** When true, hides the logo from assistive tech (use when visible "Dance" label is shown). */
  decorative?: boolean;
};

export function DanceLogo({ className, decorative = false }: DanceLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 24"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Dance"}
      role={decorative ? "presentation" : "img"}
      className={cn("h-4 w-auto shrink-0 text-primary md:h-5", className)}
    >
      <path d="M2.06061 12H11.3939C12.4985 12 13.3939 11.1046 13.3939 10V2C13.3939 0.895431 14.3165 2.57702e-07 15.4545 0H31.9394C33.0774 1.61064e-08 34 0.895431 34 2V10C34 11.1046 33.0774 12 31.9394 12H22.6061C21.5015 12 20.6061 12.8954 20.6061 14V22C20.6061 23.1046 19.6835 24 18.5455 24H2.06061C0.922565 24 1.32756e-07 23.1046 0 22V14C3.31895e-08 12.8954 0.922565 12 2.06061 12Z" />
    </svg>
  );
}
