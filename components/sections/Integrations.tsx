import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { IntegrationBadge } from "@/components/ui/IntegrationBadge";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

const iconRows = [
  [
    { label: "Gmail", opacity: 50 },
    { label: "Attio", opacity: 100 },
    { label: "Clay", opacity: 100 },
    { label: "Slack", opacity: 100 },
    { label: "HubSpot", opacity: 50 },
  ],
  [
    { label: "Microsoft", opacity: 20 },
    { label: "Gmail", opacity: 70 },
    { label: "Attio", opacity: 100 },
    { label: "Slack", opacity: 100 },
    { label: "HubSpot", opacity: 70 },
    { label: "Zendesk", opacity: 20 },
  ],
  [
    { label: "Gmail", opacity: 50 },
    { label: "Attio", opacity: 100 },
    { label: "Clay", opacity: 100 },
    { label: "Slack", opacity: 100 },
    { label: "HubSpot", opacity: 50 },
  ],
] as const;

export function Integrations() {
  return (
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col items-center gap-stack-lg">
        <div className="flex flex-col items-center gap-12">
          {iconRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap items-center justify-center gap-8 sm:gap-14"
            >
              {row.map((icon) => (
                <IntegrationBadge
                  key={`${rowIndex}-${icon.label}`}
                  label={icon.label}
                  opacity={icon.opacity}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-[62.5rem] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <h2 className="text-h2 leading-[1.3] text-primary">
              {COPY.integrations.headlineLines[0]}
              <br />
              {COPY.integrations.headlineLines[1]}
            </h2>
            <p className="text-body-lg max-w-[35rem] leading-normal text-secondary">
              {COPY.integrations.body}
            </p>
          </div>
          <Button href={SITE.demoHref}>{COPY.integrations.cta}</Button>
        </div>
      </ContentContainer>
    </PageSection>
  );
}
