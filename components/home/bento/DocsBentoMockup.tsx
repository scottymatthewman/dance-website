import { ScaledBentoFrame } from "@/components/home/bento/ScaledBentoFrame";

/** Figma export `Docs-Graphic.png` */
const DESIGN_WIDTH = 1130;
const DESIGN_HEIGHT = 604;

export function DocsBentoMockup() {
  return (
    <ScaledBentoFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      referenceSrc="/bento-mockup/Docs-Graphic.png"
    >
      <div
        className="absolute overflow-hidden rounded-[24px] border-[3px] border-[#1a1a1a] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        style={{ left: 395, top: 48, width: 340, height: 508 }}
      >
        <div style={{ padding: "28px 28px 20px" }}>
          <div
            className="flex items-start justify-between"
            style={{ fontSize: 13, lineHeight: 1.35 }}
          >
            <span className="text-[#6b7280]">Bill to</span>
            <div className="text-right text-black">
              <p className="font-semibold">Dance</p>
              <p>24 Crosby St.</p>
              <p>New York, NY</p>
              <p>10013</p>
            </div>
          </div>
          <div className="my-4 h-px bg-[#eee]" />
          <div className="space-y-3" style={{ fontSize: 13, lineHeight: 1.35 }}>
            <div className="flex justify-between gap-4">
              <span className="text-[#6b7280]">Subtotal</span>
              <span className="text-black">$1,900</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#6b7280]">Total excluding tax</span>
              <span className="text-black">$1,900</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#6b7280]">Sales Tax - New York (8.875%)</span>
              <span className="text-black">$168.23</span>
            </div>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <span className="text-[13px] text-[#6b7280]">Amount due</span>
            <span
              className="font-semibold text-black"
              style={{ fontSize: 28, lineHeight: 1 }}
            >
              $2,068.23
            </span>
          </div>
        </div>
        <div
          className="bg-[#1a1a1a] text-center text-white"
          style={{ padding: "14px 16px", fontSize: 11, lineHeight: 1.4 }}
        >
          For assistance, please email{" "}
          <span className="text-[#d9f99d]">support@acme.com</span>
        </div>
        <p
          className="text-center text-black"
          style={{ padding: "18px 0", fontSize: 13, lineHeight: 1 }}
        >
          <span className="font-semibold">Acme</span>{" "}
          <span className="text-[#6b7280]">Invoicing</span>
        </p>
      </div>
    </ScaledBentoFrame>
  );
}
