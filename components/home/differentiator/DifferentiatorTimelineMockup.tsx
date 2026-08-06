"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  AGENT_CURSOR,
  BAR_HEIGHT,
  COLUMN_WIDTH,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  GANTT_PHASES,
  HEADER_HEIGHT,
  STATUS_ICON_COLORS,
  TIMELINE_WEEKS,
  type GanttBarIcon,
} from "@/lib/home/differentiator-timeline-mockup/constants";
import {
  getDifferentiatorTimelineLoopDurationMs,
  getDifferentiatorTimelineState,
  type DifferentiatorTimelineViewState,
} from "@/lib/home/differentiator-timeline-mockup/timeline";
import { useEffect, useRef, useState } from "react";

function InProgressIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden fill="none" height={size} viewBox="0 0 18 18" width={size}>
      <path
        d="M15.75 9C15.75 12.728 12.728 15.75 9 15.75C5.27208 15.75 2.25 12.728 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.728 2.25 15.75 5.27208 15.75 9Z"
        stroke={color}
        strokeDasharray="2.25 3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function NotStartedIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg aria-hidden fill="none" height={size} viewBox="0 0 18 18" width={size}>
      <path
        d="M9.00007 2.2575V2.25M9.00007 15.75V15.7575M11.5818 2.77103L11.5846 2.7641M6.41841 15.2365L6.41554 15.2434M13.7704 4.23349M13.7757 4.22819M4.22975 13.7741L4.22445 13.7795M15.2327 6.42221M15.2397 6.41935M2.76732 11.5856L2.76039 11.5885M2.25384 9.00375H2.24634M15.7463 9.00375H15.7538M4.22993 4.23339L4.22463 4.22808M13.7706 13.7741L13.7758 13.7793M2.7676 6.42185L2.76067 6.41898M15.233 11.5852L15.24 11.5881M6.41839 2.771L6.41552 2.76407M11.5817 15.2365L11.5846 15.2434"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GanttBarStatusIcon({ icon }: { icon: GanttBarIcon }) {
  const color = STATUS_ICON_COLORS[icon];
  return icon === "inProgress" ? (
    <InProgressIcon color={color} />
  ) : (
    <NotStartedIcon color={color} />
  );
}

function AgentCursor({
  x,
  y,
  opacity,
  clicking,
}: {
  x: number;
  y: number;
  opacity: number;
  clicking: boolean;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-20 flex flex-col items-start gap-1 will-change-transform"
      style={{
        left: x,
        top: y,
        opacity,
      }}
    >
      <img
        alt=""
        className="block size-9 shrink-0"
        draggable={false}
        src={AGENT_CURSOR.src}
        style={{
          transform: clicking ? "scale(1.05)" : "scale(1)",
          transition: "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <span
        className="ml-2.5 whitespace-nowrap rounded px-2 py-0.5 text-xs font-semibold leading-[1.3] text-white shadow-[0_1px_2px_rgb(0_0_0/12%)]"
        style={{ background: AGENT_CURSOR.color }}
      >
        {AGENT_CURSOR.label}
      </span>
    </div>
  );
}

function GanttBar({
  label,
  left,
  top,
  width,
  icon,
  revealProgress,
}: (typeof GANTT_PHASES)[number] & { revealProgress: number }) {
  return (
    <div
      className="absolute flex items-center overflow-hidden rounded-[10px] border border-[#eee] bg-white"
      style={{
        left,
        top,
        width: width * revealProgress,
        height: BAR_HEIGHT,
        opacity: revealProgress,
        transform: `translateX(${(1 - revealProgress) * -10}px)`,
      }}
    >
      <div className="flex h-full w-9 shrink-0 items-center justify-center">
        <GanttBarStatusIcon icon={icon} />
      </div>
      <span className="truncate whitespace-nowrap pr-2 text-[11px] leading-[1.4] tracking-[-0.22px] text-black">
        {label}
      </span>
    </div>
  );
}

function TimelineScene({
  fullBleed,
  sceneHeight,
  state,
}: {
  fullBleed: boolean;
  sceneHeight: number;
  state: DifferentiatorTimelineViewState;
}) {
  const columnOffsets = TIMELINE_WEEKS.map(
    (_, index) => (index + 1) * COLUMN_WIDTH,
  );

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-white",
        !fullBleed && "rounded-[4px]",
      )}
      style={{
        width: DESIGN_WIDTH,
        height: sceneHeight,
        opacity: state.gridOpacity,
      }}
    >
      <div
        className="flex w-full border-b border-[#eee]"
        style={{ height: HEADER_HEIGHT }}
      >
        {TIMELINE_WEEKS.map((week) => (
          <div
            key={week}
            className="flex shrink-0 items-center justify-center"
            style={{ width: COLUMN_WIDTH }}
          >
            <span className="whitespace-nowrap text-[10px] leading-[1.4] tracking-[-0.2px] text-[#666]">
              {week}
            </span>
          </div>
        ))}
      </div>

      {columnOffsets.slice(0, -1).map((offset) => (
        <div
          key={offset}
          className="absolute bottom-0 top-0 border-r border-dashed border-[#eee]"
          style={{ left: offset, top: HEADER_HEIGHT }}
        />
      ))}

      {GANTT_PHASES.map((phase, index) => (
        <GanttBar
          key={phase.label}
          {...phase}
          revealProgress={state.barRevealProgress[index] ?? 0}
        />
      ))}

      <AgentCursor
        clicking={state.cursorClicking}
        opacity={state.cursorOpacity}
        x={state.cursorX}
        y={state.cursorY}
      />
    </div>
  );
}

type DifferentiatorTimelineMockupProps = {
  isPlaying?: boolean;
  fullBleed?: boolean;
  className?: string;
};

export function DifferentiatorTimelineMockup({
  isPlaying = true,
  fullBleed = false,
  className,
}: DifferentiatorTimelineMockupProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateSize = () => {
      const { width, height } = container.getBoundingClientRect();
      setContainerSize({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isPlaying) {
      return;
    }

    startRef.current = performance.now();

    let frame = 0;
    const tick = (now: number) => {
      if (startRef.current === null) {
        return;
      }

      setElapsedMs(now - startRef.current);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPlaying, reducedMotion]);

  const state = getDifferentiatorTimelineState(
    reducedMotion ? getDifferentiatorTimelineLoopDurationMs() - 1 : elapsedMs,
    !reducedMotion,
  );

  const widthScale =
    containerSize.width > 0 ? containerSize.width / DESIGN_WIDTH : 1;
  const heightScale =
    containerSize.height > 0 ? containerSize.height / DESIGN_HEIGHT : 1;

  const fitScale = fullBleed ? widthScale : Math.min(widthScale, heightScale);
  const sceneHeight =
    fullBleed && containerSize.height > 0
      ? containerSize.height / fitScale
      : DESIGN_HEIGHT;

  const offsetX = fullBleed ? 0 : (containerSize.width - DESIGN_WIDTH * fitScale) / 2;
  const offsetY = 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        fullBleed ? "h-full" : "h-[16.5rem] md:h-[18.5rem]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          width: DESIGN_WIDTH,
          height: sceneHeight,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${fitScale})`,
          transformOrigin: "0 0",
        }}
      >
        <TimelineScene
          fullBleed={fullBleed}
          sceneHeight={sceneHeight}
          state={state}
        />
      </div>
    </div>
  );
}
