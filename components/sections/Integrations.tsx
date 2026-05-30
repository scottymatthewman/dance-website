import { SiteFrameInset, SiteFrameSection } from "@/components/layout/SiteFrame";
import { IntegrationTilesGrid } from "@/components/sections/IntegrationTilesGrid";
import { Button } from "@/components/ui/Button";
import { LuminaGradientBackground } from "@/components/ui/LuminaGradientBackground";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

export function Integrations() {
  return (
    <section className="relative flex min-h-[90vh] flex-col overflow-hidden rounded-b-lg md:min-h-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      >
        <LuminaGradientBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-section)] to-transparent" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_bottom,transparent_0%,transparent_75%,#030807_100%)]" />
      </div>
      <SiteFrameSection
        ruled
        ruledBottom
        className="relative z-10 flex min-h-[90vh] flex-1 flex-col md:min-h-0"
      >
        <SiteFrameInset className="flex flex-1 flex-col items-center justify-center gap-stack-lg py-section pb-[calc(var(--section-y)/2)] md:flex-none md:justify-start md:py-section-md md:pb-[calc(var(--section-y-md)/2)] lg:py-section-lg lg:pb-[calc(var(--section-y-lg)/2)] xl:py-section-xl xl:pb-[calc(var(--section-y-xl)/2)]">
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
        </SiteFrameInset>
      </SiteFrameSection>
    </section>
  );
}
