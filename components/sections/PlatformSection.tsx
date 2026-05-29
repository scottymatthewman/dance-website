import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { PlatformTasksMockup } from "@/components/sections/PlatformTasksMockup";
import { MockupFrame } from "@/components/ui/MockupFrame";
import { COPY } from "@/lib/copy";

const PILLAR_ICONS = {
  stack: StackIcon,
  agents: AgentsIcon,
  outcomes: OutcomesIcon,
} as const;

export function PlatformSection() {
  const { headline, headlineAccent, pillars } = COPY.platform;

  return (
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col gap-stack-lg">
        <h2 className="max-w-[47.1875rem] text-h2 leading-[1.3] text-primary">
          {headline}
          <br className="hidden md:block" />
          <span className="text-secondary"> {headlineAccent}</span>
        </h2>

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
          {pillars.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.icon];

            return (
              <article key={pillar.title} className="flex flex-col gap-3">
                <Icon className="size-7 text-primary" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg font-medium leading-normal text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-body-md leading-normal text-secondary">
                    {pillar.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </ContentContainer>
    </PageSection>
  );
}

function StackIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="14"
        cy="8"
        rx="8"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 8v6c0 1.66 3.58 3 8 3s8-1.34 8-3V8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 14v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AgentsIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 22c0-3.31 2.69-6 6-6s6 2.69 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M19 8v6M22 11h-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function OutcomesIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 20l6-6 4 4 8-10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M19 8h4v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
