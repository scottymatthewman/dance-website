import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { COPY } from "@/lib/copy";

export function Testimonial() {
  return (
    <PageSection variant="contained" background="section">
      <ContentContainer>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">
          <ImagePlaceholder
            label="Testimonial photo"
            className="h-[31.25rem] w-full max-w-[27.5rem] shrink-0 rounded-lg border border-border-subtle"
          />
          <figure className="flex w-full max-w-[31.125rem] flex-col justify-between lg:min-h-[31.25rem]">
            <div className="flex flex-col gap-4">
              <blockquote className="text-quote leading-[1.3] text-primary">
                &ldquo;{COPY.testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-attribution leading-normal text-primary">
                – {COPY.testimonial.name}{" "}
                <span className="text-secondary">{COPY.testimonial.role}</span>
              </p>
            </div>
            <figcaption>
              <div
                className="flex h-10 w-28 items-center justify-center rounded border border-dashed border-border-strong text-sm text-muted"
                aria-label={`${COPY.testimonial.company} logo`}
              >
                {COPY.testimonial.company}
              </div>
            </figcaption>
          </figure>
        </div>
      </ContentContainer>
    </PageSection>
  );
}
