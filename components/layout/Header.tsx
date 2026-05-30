import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SiteIcon } from "@/components/ui/SiteIcon";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-section/80 backdrop-blur-md">
      <ContentContainer className="flex h-16 items-center justify-between lg:h-16">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 text-lg font-medium tracking-tight text-primary transition-opacity hover:opacity-80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
          )}
        >
          <SiteIcon
            className="h-5 aspect-[19/26] shrink-0 text-primary"
            name="dance-logo"
          />
          {SITE.name}
        </Link>
        <Button href={SITE.demoHref} size="sm">
          {COPY.nav.cta}
        </Button>
      </ContentContainer>
    </header>
  );
}
