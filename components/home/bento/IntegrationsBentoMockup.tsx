import Image from "next/image";
import { ScaledBentoFrame } from "@/components/home/bento/ScaledBentoFrame";
import { PROFILES } from "@/lib/profiles";

/** Figma export `Integrations-Graphic.png` */
const DESIGN_WIDTH = 1130;
const DESIGN_HEIGHT = 640;

export function IntegrationsBentoMockup() {
  return (
    <ScaledBentoFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      referenceSrc="/bento-mockup/Integrations-Graphic.png"
    >
      <div
        className="absolute rounded-[24px] border border-black/[0.08] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
        style={{ left: 305, top: 80, width: 520, height: 480, padding: 28 }}
      >
        <button
          className="text-left font-medium text-[#02abff]"
          style={{ fontSize: 14, marginBottom: 20 }}
          type="button"
        >
          Show 23 more replies
        </button>

        <div className="flex" style={{ gap: 12 }}>
          <div
            className="relative shrink-0 overflow-hidden rounded-[6px]"
            style={{ width: 36, height: 36 }}
          >
            <Image
              src={PROFILES.Dani.avatar}
              alt=""
              aria-hidden
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="font-semibold text-black"
              style={{ fontSize: 15, lineHeight: 1.2 }}
            >
              {PROFILES.Dani.name}
            </p>
            <p
              className="text-black"
              style={{ marginTop: 6, fontSize: 14, lineHeight: 1.4 }}
            >
              <span className="rounded bg-[#02abff]/10 px-1.5 py-0.5 font-medium text-[#02abff]">
                @Dance
              </span>{" "}
              Looks like we&apos;re expanding the capacity to 250
            </p>
          </div>
        </div>

        <div className="relative" style={{ margin: "20px 0" }}>
          <div className="h-px bg-[#eee]" />
          <span
            className="absolute bg-white pr-2 text-[#9ca3af]"
            style={{ top: -8, left: 0, fontSize: 12 }}
          >
            Just now
          </span>
        </div>

        <div className="flex" style={{ gap: 12 }}>
          <div
            className="flex shrink-0 items-center justify-center rounded-[6px] bg-[#f4f4f4] text-xl leading-none"
            style={{ width: 36, height: 36 }}
          >
            👾
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="font-semibold text-black"
              style={{ fontSize: 15, lineHeight: 1.2 }}
            >
              Dance Agent
            </p>
            <p
              className="text-black"
              style={{ marginTop: 6, fontSize: 14, lineHeight: 1.4 }}
            >
              Sounds good! Updating the Agentic Development Workshop plan now.
            </p>
            <button
              className="font-medium text-[#02abff] underline"
              style={{ marginTop: 6, fontSize: 14 }}
              type="button"
            >
              Here&apos;s the link
            </button>
          </div>
        </div>
      </div>
    </ScaledBentoFrame>
  );
}
