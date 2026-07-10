import { ScaledBentoFrame } from "@/components/home/bento/ScaledBentoFrame";

/** Figma export `Budget-Graphic.png` */
const DESIGN_WIDTH = 1118;
const DESIGN_HEIGHT = 604;

const SPEND = 32_560;
const BUDGET = 40_000;
const FILL_PERCENT = (SPEND / BUDGET) * 100;

export function BudgetBentoMockup() {
  return (
    <ScaledBentoFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      referenceSrc="/bento-mockup/Budget-Graphic.png"
    >
      <div
        className="absolute rounded-[16px] border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        style={{
          left: 259,
          top: 202,
          width: 600,
          height: 200,
          padding: "32px 36px",
        }}
      >
        <div className="flex items-baseline justify-between">
          <span
            className="font-medium text-black"
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            Total Spend
          </span>
          <p className="whitespace-nowrap" style={{ fontSize: 20, lineHeight: 1 }}>
            <span className="font-semibold text-black">
              ${SPEND.toLocaleString()}
            </span>
            <span className="font-medium text-[#9ca3af]">
              {" "}
              / ${BUDGET.toLocaleString()}
            </span>
          </p>
        </div>
        <div
          className="overflow-hidden rounded-full bg-[#f3f4f6]"
          style={{ marginTop: 24, height: 8 }}
        >
          <div
            className="bevel h-full rounded-full bg-[#d8b4fe]"
            style={{ width: `${FILL_PERCENT}%` }}
          />
        </div>
      </div>
    </ScaledBentoFrame>
  );
}
