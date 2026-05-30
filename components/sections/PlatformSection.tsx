import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { PlatformTasksMockup } from "@/components/sections/PlatformTasksMockup";
import { SiteIcon, type SiteIconName } from "@/components/ui/SiteIcon";
import { Button } from "@/components/ui/Button";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

const PILLAR_ICONS = {
  stack: "platform-workspace",
  agents: "platform-agent",
  outcomes: "platform-revenue",
} as const satisfies Record<(typeof COPY.platform.pillars)[number]["icon"], SiteIconName>;

export function PlatformSection() {
  const { headline, headlineAccent, cta, pillars } = COPY.platform;

  return (
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col gap-stack-lg">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[47.1875rem] text-h2 leading-[1.3] text-primary">
            {headline}
            <br className="hidden md:block" />
            <span className="text-secondary"> {headlineAccent}</span>
          </h2>
          <Button href={SITE.demoHref}>{cta}</Button>
        </div>

        <div className="relative left-1/2 w-[min(94vw,82rem)] -translate-x-1/2">
          <MockupFrame
            variant="feature"
            interactive={false}
            className="aspect-[343/386] min-h-0 w-full md:aspect-[16/10] lg:aspect-[1295/736] lg:min-h-[38.5rem]"
          >
            <PlatformTasksMockup />
          </MockupFrame>
        </div>

        <div className="grid grid-cols-1 gap-stack-md md:grid-cols-3 md:gap-6">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="flex flex-col gap-3">
              <SiteIcon
                className="size-7 text-primary"
                name={PILLAR_ICONS[pillar.icon]}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-medium leading-normal text-primary">
                  {pillar.title}
                </h3>
                <p className="text-body-md leading-normal text-secondary">
                  {pillar.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ContentContainer>
    </PageSection>
  );
}
