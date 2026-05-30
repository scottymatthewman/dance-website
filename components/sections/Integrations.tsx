import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { IntegrationTilesGrid } from "@/components/sections/IntegrationTilesGrid";
import { Button } from "@/components/ui/Button";
import { LuminaGradientBackground } from "@/components/ui/LuminaGradientBackground";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

export function Integrations() {
  return (
    <PageSection
      variant="contained"
      background="transparent"
      className="relative flex min-h-[90vh] flex-col overflow-hidden md:min-h-0 !pb-[calc(var(--section-y)/2)] md:!pb-[calc(var(--section-y-md)/2)] lg:!pb-[calc(var(--section-y-lg)/2)] xl:!pb-[calc(var(--section-y-xl)/2)]"
    >
      <LuminaGradientBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_0%,transparent_75%,#000_100%)]"
      />
      <ContentContainer className="relative z-10 flex flex-1 flex-col items-center justify-center gap-stack-lg md:flex-none md:justify-start">
        <IntegrationTilesGrid />
        <div className="flex w-full max-w-[62.5rem] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <h2 className="text-h2 leading-[1.3] text-primary">
              {COPY.integrations.headlineLines[0]}
              <br />
              {COPY.integrations.headlineLines[1]}
            </h2>
            <p className="text-body-lg max-w-[35rem] leading-normal text-secondary">
              {COPY.integrations.taglineLines[0]}
              <br />
              {COPY.integrations.taglineLines[1]}
            </p>
          </div>
          <Button href={SITE.demoHref}>{COPY.integrations.cta}</Button>
        </div>
      </ContentContainer>
    </PageSection>
  );
}
