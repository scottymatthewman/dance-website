import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { BoardsMockup } from "@/components/sections/BoardsMockup";
import { IntegrationsMockup } from "@/components/sections/IntegrationsMockup";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

function TopBentoMockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 top-[7.5rem] flex items-start justify-center overflow-hidden lg:top-[8.25rem]">
      {children}
    </div>
  );
}

function AccountMonitoringVisual() {
  return (
    <TopBentoMockupShell>
      <BoardsMockup />
    </TopBentoMockupShell>
  );
}

function ExpansionSignalsVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-end">
      <div className="relative h-[88%] w-[78%] max-w-[24rem]">
        <div className="absolute right-8 top-8 w-[70%] rounded-lg border border-border-subtle bg-card p-4">
          <p className="text-xs text-muted">Expansion signal</p>
          <p className="mt-1 text-sm text-primary">Seat usage up 34%</p>
          <p className="mt-2 text-xs text-secondary">Acme Corp · 2h ago</p>
        </div>
        <div className="absolute bottom-10 left-0 w-[72%] rounded-lg border border-border-subtle bg-card p-4">
          <p className="text-xs text-muted">Renewal risk</p>
          <p className="mt-1 text-sm text-primary">Champion left company</p>
          <p className="mt-2 text-xs text-secondary">Northwind · 5h ago</p>
        </div>
      </div>
    </div>
  );
}

function PlaybookVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-center px-6 pb-8 lg:justify-start lg:pl-10">
      <div className="w-full max-w-[19rem] rounded-lg border border-border-subtle bg-card p-4">
        <p className="text-xs text-muted">Playbook · At-risk renewal</p>
        <div className="mt-4 flex flex-col gap-2">
          {[
            "Draft executive outreach",
            "Schedule QBR prep",
            "Notify account owner",
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-md border border-border-subtle bg-card-inner px-3 py-2"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-accent/15 text-[0.625rem] text-accent">
                {index + 1}
              </span>
              <span className="text-sm text-secondary">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UnifiedIntelligenceVisual() {
  return (
    <TopBentoMockupShell>
      <IntegrationsMockup />
    </TopBentoMockupShell>
  );
}

function IntegrationsVisual() {
  return (
    <div className="absolute inset-0 flex items-end justify-end px-6 pb-8 lg:px-10">
      <div className="grid grid-cols-3 gap-2">
        {["Slack", "HubSpot", "PostHog", "Zendesk", "Gmail", "Attio"].map(
          (tool) => (
            <div
              key={tool}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-border-subtle bg-card text-[0.625rem] text-muted"
            >
              {tool}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const visualMap = {
  monitoring: AccountMonitoringVisual,
  expansion: ExpansionSignalsVisual,
  playbooks: PlaybookVisual,
  intelligence: UnifiedIntelligenceVisual,
  integrations: IntegrationsVisual,
} as const;

export function PlatformBento() {
  const { headline, headlineAccent, cta, topRow, bottomRow } = COPY.platformBento;

  return (
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col">
        <div className=" flex items-start justify-between gap-6 lg:mt-8">
          <div className="flex justify-between items-center">
            <h2 className="max-w-[47.1875rem] text-h2 leading-[1.3] text-primary">
              {headline}
              <br className="hidden md:block" />
              <span className="text-secondary"> {headlineAccent}</span>
            </h2>
          </div>
          <Button href={SITE.demoHref}>{cta}</Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:mt-16">
          {topRow.map((card) => {
            const Visual = visualMap[card.visual];
            return (
              <BentoCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                size="large"
                titleClassName={
                  card.visual === "intelligence" ? "max-w-[24rem]" : undefined
                }
                visual={<Visual />}
              />
            );
          })}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bottomRow.map((card) => {
            const Visual = visualMap[card.visual];
            return (
              <BentoCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                visual={<Visual />}
              />
            );
          })}
        </div>
      </ContentContainer>
    </PageSection>
  );
}
