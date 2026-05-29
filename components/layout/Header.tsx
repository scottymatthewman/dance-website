import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-section/80 backdrop-blur-md">
      <ContentContainer className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className={cn(
            "text-lg font-medium tracking-tight text-primary transition-opacity hover:opacity-80",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-section",
          )}
        >
          {SITE.name}
        </Link>
        <Button href={SITE.demoHref}>{COPY.nav.cta}</Button>
      </ContentContainer>
    </header>
  );
}
