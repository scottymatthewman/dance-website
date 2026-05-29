import Image from "next/image";
import Link from "next/link";
import { ProductSurfaceVisual } from "@/components/sections/ProductSurfaceVisual";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { PageSection } from "@/components/layout/PageSection";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

const SURFACE_ICONS = {
  context: "/product-surfaces/icon-context.svg",
  slack: "/product-surfaces/icon-slack.svg",
  crm: "/product-surfaces/icon-crm.svg",
} as const;

const SURFACE_VISUALS = {
  briefing: "/product-surfaces/context-card.png",
  slack: "/product-surfaces/slack-card.png",
  crm: "/product-surfaces/crm-card.png",
} as const;

export function ProductSurfaces() {
  return (
    <PageSection variant="contained" background="section">
      <ContentContainer className="flex flex-col gap-stack-header">
        <SectionHeader title={COPY.productSurfaces.headline} />

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {COPY.productSurfaces.cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10"
            >
              <div className="flex flex-1 flex-col gap-3 p-4">
                <Image
                  alt=""
                  aria-hidden
                  className="size-7 shrink-0"
                  height={28}
                  src={SURFACE_ICONS[card.icon]}
                  width={28}
                />
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-medium leading-normal text-primary">
                      {card.title}
                    </h3>
                    <p className="line-clamp-3 min-h-[5.0625rem] text-lg leading-normal text-secondary">
                      {card.body}
                    </p>
                  </div>
                  <Link
                    className="inline-flex w-fit items-center justify-center rounded-full bg-[#1c1c1c] px-5 py-3 text-[0.9375rem] leading-[1.3] text-primary transition-opacity hover:opacity-90"
                    href={SITE.demoHref}
                  >
                    {COPY.productSurfaces.cta}
                  </Link>
                </div>
              </div>

              <ProductSurfaceVisual
                backgroundSrc={SURFACE_VISUALS[card.visual]}
              />
            </article>
          ))}
        </div>
      </ContentContainer>
    </PageSection>
  );
}
