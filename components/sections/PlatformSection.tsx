import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SITE_FRAME_INSET_X } from "@/components/layout/SiteFrame";
import { PlatformTasksMockup } from "@/components/sections/PlatformTasksMockup";
import { Button } from "@/components/ui/Button";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function PlatformSection() {
  const { headline, headlineAccent, cta } = COPY.platform;

  return (
    <PageSection variant="contained" background="section" className="!pb-0">
      <ContentContainer className={cn("flex flex-col gap-stack-lg", SITE_FRAME_INSET_X)}>
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[47.1875rem] text-h2 leading-[1.3] text-primary">
            {headline}
            <br className="hidden md:block" />
            <span className="text-secondary"> {headlineAccent}</span>
          </h2>
          <Button href={SITE.demoHref}>{cta}</Button>
        </div>
      </ContentContainer>
    </PageSection>
  );
}

export function PlatformMockup() {
  return (
    <div className="relative z-10 mt-stack-lg">
      <div className="relative left-1/2 w-[min(94vw,var(--frame-max))] -translate-x-1/2">
        <MockupFrame
          variant="feature"
          interactive={false}
          className="aspect-[343/386] min-h-0 w-full md:aspect-[16/10] lg:aspect-[1295/736] lg:min-h-[38.5rem]"
        >
          <PlatformTasksMockup />
        </MockupFrame>
      </div>
    </div>
  );
}
