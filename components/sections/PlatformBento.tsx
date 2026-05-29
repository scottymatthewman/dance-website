import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/Button";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

function AccountMonitoringVisual() {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-center px-6 pb-0 lg:px-10">
      <div className="w-full max-w-[22rem] rounded-t-lg border border-b-0 border-border-subtle bg-card p-4 shadow-[0_-1rem_3rem_rgba(0,0,0,0.45)]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-muted">Account health</span>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">
            Live
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { name: "Acme Corp", score: "92", trend: "↑ Expansion" },
            { name: "Northwind", score: "41", trend: "↓ At risk" },
            { name: "Globex", score: "78", trend: "→ Stable" },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-md border border-border-subtle bg-card-inner px-3 py-2"
            >
              <span className="text-sm text-primary">{row.name}</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-secondary">{row.trend}</span>
                <span className="font-medium text-primary">{row.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
      <div className="relative w-[min(100%,22rem)] px-6 pb-0 lg:w-auto lg:px-0">
        <div className="rounded-t-xl border border-b-0 border-border-subtle bg-card px-5 py-4 shadow-[0_-1rem_3rem_rgba(0,0,0,0.45)]">
          <div className="mb-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-accent" />
            <span className="text-sm text-primary">Unified account view</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {["CRM", "Product", "Support", "Billing"].map((source) => (
              <div
                key={source}
                className="rounded-md border border-border-subtle bg-card-inner px-3 py-2 text-secondary"
              >
                {source}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
