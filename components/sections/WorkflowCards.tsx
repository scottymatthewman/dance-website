import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function WorkflowCards() {
  return (
    <PageSection
      variant="contained"
      background="section"
      className="pt-[calc(var(--section-y)+4.5rem)] md:pt-[calc(var(--section-y-md)+4.5rem)] lg:pt-[calc(var(--section-y-lg)+4.5rem)] xl:pt-[calc(var(--section-y-xl)+4.5rem)]"
    >
      <ContentContainer className="flex flex-col gap-stack-header">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left lg:flex-row lg:items-start lg:justify-between">
          <SectionHeader
            title={COPY.workflowCards.headline}
            className="items-center text-center md:items-start md:text-left"
          />
          <Button href={SITE.demoHref}>{COPY.workflowCards.cta}</Button>
        </div>
        <div className="grid gap-8 max-lg:gap-[calc(2rem+2.25rem)] md:grid-cols-2 lg:grid-cols-3">
          {COPY.workflowCards.cards.map((card, index) => (
            <article key={card.title} className="flex flex-col gap-6">
              <ImagePlaceholder className="h-[26.25rem]">
                <div
                  className={cn(
                    "flex h-full items-center bg-card-inner p-6",
                    index === 1 && "justify-center",
                    index === 2 && "justify-end",
                  )}
                >
                  <div className="w-full max-w-none border-0 bg-transparent p-0">
                    <span className="text-sm text-muted">{card.preview}</span>
                  </div>
                </div>
              </ImagePlaceholder>
              <div className="flex flex-col gap-2">
                <h3 className="text-body-lg font-medium leading-normal text-primary">
                  {card.title}
                </h3>
                <p className="text-body-md leading-normal text-secondary">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ContentContainer>
    </PageSection>
  );
}
