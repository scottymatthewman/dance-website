import Link from "next/link";
import { ProductSurfaceVisual } from "@/components/sections/ProductSurfaceVisual";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SiteFrameCell, SiteFrameInset, SiteFrameSection } from "@/components/layout/SiteFrame";
import { SiteIcon, type SiteIconName } from "@/components/ui/SiteIcon";
import { COPY } from "@/lib/copy";
import { SITE } from "@/lib/constants";

const SURFACE_ICONS = {
  context: "bullet-context",
  slack: "bullet-chat",
  crm: "bullet-superpower",
} as const satisfies Record<
  (typeof COPY.productSurfaces.cards)[number]["icon"],
  SiteIconName
>;

const SURFACE_VISUALS = {
  briefing: "/product-surfaces/context-card.png",
  slack: "/product-surfaces/slack-card.png",
  crm: "/product-surfaces/crm-card.png",
} as const;

export function ProductSurfaces() {
  return (
    <SiteFrameSection ruled>
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border-subtle">
          <SiteFrameInset className="col-span-1 flex flex-col justify-end border-b border-border-subtle pt-section md:pt-section-md lg:col-span-3 lg:pt-section-lg xl:pt-section-xl">
            <SectionHeader
              className="items-center text-center md:items-start md:text-left"
              title={COPY.productSurfaces.headline}
            />
          </SiteFrameInset>

          {COPY.productSurfaces.cards.map((card) => (
            <article key={card.title} className="flex min-h-0 flex-col">
              <SiteFrameCell className="flex flex-col !py-8 md:!py-10 lg:!py-12">
                <SiteIcon
                  className="size-7 shrink-0 text-primary"
                  name={SURFACE_ICONS[card.icon]}
                />
                <div className="mt-3 flex flex-col gap-4">
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
              </SiteFrameCell>

              <ProductSurfaceVisual
                backgroundSrc={SURFACE_VISUALS[card.visual]}
              />
            </article>
          ))}
        </div>
    </SiteFrameSection>
  );
}
