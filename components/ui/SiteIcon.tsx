import { cn } from "@/lib/cn";

/** Icons in `public/icons/` — swap the SVG file; size and color come from `className`. */
export const SITE_ICON_NAMES = [
  "nav-bartoggle",
  "nav-chevronleft",
  "nav-chevronright",
  "nav-newchat",
  "nav-customers",
  "nav-tasks",
  "nav-agents",
  "nav-marketplace",
  "nav-history",
  "chatbox-add",
  "chatbox-model",
  "chatbox-send",
  "tabBar-add",
  "tab-writeIcon",
  "suggestedprompt-send",
  "bullet-context",
  "bullet-chat",
  "bullet-superpower",
  "platform-workspace",
  "platform-agent",
  "platform-revenue",
  "dance-logo",
] as const;

export type SiteIconName = (typeof SITE_ICON_NAMES)[number];

type SiteIconProps = {
  /** Icon filename (without path) from `public/icons/`. */
  name: SiteIconName;
  className?: string;
};

/**
 * Renders a monochrome SVG from `public/icons/` with size and color controlled
 * via Tailwind (`size-*`, `text-*`). SVG source files should use `#000` shapes
 * on a transparent background so they can be swapped without code changes.
 */
export function SiteIcon({ name, className }: SiteIconProps) {
  const src = `/icons/${name}.svg`;

  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
    />
  );
}
