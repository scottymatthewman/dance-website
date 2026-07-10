import Image from "next/image";
import { ScaledBentoFrame } from "@/components/home/bento/ScaledBentoFrame";

/** Figma export `Templates-Graphic.png` */
const DESIGN_WIDTH = 1118;
const DESIGN_HEIGHT = 604;

const TEMPLATE_ITEMS = [
  { label: "Networking Event", icon: "/bento-mockup/templates/networking.svg" },
  { label: "Demo Night", icon: "/bento-mockup/templates/demo-night.svg" },
  { label: "Happy Hour", icon: "/bento-mockup/templates/happy-hour.svg" },
  { label: "Tradeshow Booth", icon: "/bento-mockup/templates/tradeshow.svg" },
  {
    label: "Executive Dinner",
    icon: "/bento-mockup/templates/executive-dinner.svg",
  },
  { label: "Conference", icon: "/bento-mockup/templates/conference.svg" },
  { label: "Community Event", icon: "/bento-mockup/templates/community.svg" },
  { label: "Webinar", icon: "/bento-mockup/templates/webinar.svg" },
  { label: "Offsite", icon: "/bento-mockup/templates/offsite.svg" },
] as const;

const GRID = {
  left: 199,
  top: 72,
  cols: 3,
  cellWidth: 240,
  cellHeight: 160,
  gap: 8,
} as const;

export function TemplatesBentoMockup() {
  return (
    <ScaledBentoFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      referenceSrc="/bento-mockup/Templates-Graphic.png"
    >
      {TEMPLATE_ITEMS.map((item, index) => {
        const col = index % GRID.cols;
        const row = Math.floor(index / GRID.cols);
        const left = GRID.left + col * (GRID.cellWidth + GRID.gap);
        const top = GRID.top + row * (GRID.cellHeight + GRID.gap);

        return (
          <div
            key={item.label}
            className="absolute flex flex-col items-center justify-center rounded-[12px] border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            style={{
              left,
              top,
              width: GRID.cellWidth,
              height: GRID.cellHeight,
              padding: "16px 12px",
              gap: 12,
            }}
          >
            <div className="relative shrink-0" style={{ width: 48, height: 48 }}>
              <Image
                src={item.icon}
                alt=""
                aria-hidden
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span
              className="text-center font-medium text-black"
              style={{ fontSize: 14, lineHeight: 1.2 }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </ScaledBentoFrame>
  );
}
