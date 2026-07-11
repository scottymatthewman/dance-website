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
      viewBox="0 0 18 32"
      fill="currentColor"
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Dance"}
      role={decorative ? "presentation" : "img"}
      className={cn("h-5 w-auto shrink-0 text-primary md:h-6", className)}
    >
      <path d="M5.16399 30.9208C4.81252 31.2722 4.24201 31.2723 3.89056 30.9208L0.263604 27.2929C-0.0878059 26.9414 -0.0877995 26.3719 0.263604 26.0204L8.65618 17.6269H16.0437C16.9346 17.6269 17.3808 18.704 16.7508 19.334L5.16399 30.9208Z" />
      <path d="M3.89056 0.263597C4.24202 -0.0878694 4.81252 -0.087862 5.16399 0.263597L16.8202 11.9198C17.4501 12.5497 17.004 13.6269 16.1131 13.6269H8.72649L0.263604 5.16399C-0.087868 4.81252 -0.087868 4.24202 0.263604 3.89055L3.89056 0.263597Z" />
    </svg>
  );
}
