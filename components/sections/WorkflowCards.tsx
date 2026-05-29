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
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col gap-stack-header">
        <div className="flex justify-between items-center">
          <SectionHeader title={COPY.workflowCards.headline} />
          <Button href={SITE.demoHref}>{COPY.workflowCards.cta}</Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
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
                  <div
                    className={cn(
                      "max-w-[18.125rem] rounded-lg border border-border-subtle bg-section/80 p-5 text-lg leading-normal text-secondary",
                      index === 0 && "w-full max-w-none border-0 bg-transparent p-0",
                    )}
                  >
                    {index === 0 ? (
                      <span className="text-sm text-muted">{card.preview}</span>
                    ) : (
                      `"${card.preview}"`
                    )}
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
