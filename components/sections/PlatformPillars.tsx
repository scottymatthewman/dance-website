import { SiteFrameCell, SiteFrameSection } from "@/components/layout/SiteFrame";
import { SiteIcon, type SiteIconName } from "@/components/ui/SiteIcon";
import { COPY } from "@/lib/copy";

const PILLAR_ICONS = {
  stack: "platform-workspace",
  agents: "platform-agent",
  outcomes: "platform-revenue",
} as const satisfies Record<(typeof COPY.platform.pillars)[number]["icon"], SiteIconName>;

export function PlatformPillars() {
  const { pillars } = COPY.platform;

  return (
    <SiteFrameSection>
      <div className="mt-16 grid grid-cols-1 divide-y divide-border-subtle border-y border-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
        {pillars.map((pillar) => (
          <SiteFrameCell key={pillar.title} className="!py-8 md:!py-10 lg:!py-12">
            <article className="flex flex-col gap-3">
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
          </SiteFrameCell>
        ))}
      </div>
    </SiteFrameSection>
  );
}
