import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/Button";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

export function Pricing() {
  const { headline, price, period, body, subbody, cta, features } = COPY.pricing;

  return (
    <PageSection id="pricing" variant="contained" background="section">
      <ContentContainer className="flex flex-col items-center gap-stack-lg text-center">
        <div className="flex max-w-[36rem] flex-col items-center gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-secondary">
            {headline}
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[clamp(3rem,8vw,4.5rem)] font-medium leading-none tracking-tight text-primary">
              {price}
            </p>
            <p className="text-body-lg text-secondary">{period}</p>
          </div>
          <p className="text-body-lg leading-normal text-primary">{body}</p>
          <p className="text-body-md leading-normal text-secondary">{subbody}</p>
        </div>

        <ul className="grid w-full max-w-[32rem] gap-3 text-left sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-body-md leading-normal text-secondary"
            >
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        <Button href={SITE.demoHref}>{cta}</Button>
      </ContentContainer>
    </PageSection>
  );
}
