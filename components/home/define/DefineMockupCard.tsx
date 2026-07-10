import Image from "next/image";
import {
  useEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";
import {
  ASSETS,
  CHILD_NODES,
  CHILD_NODE_HEIGHT,
  CORE_NODE,
  DEFINE_DESIGN_HEIGHT,
  DEFINE_DESIGN_WIDTH,
  PRIMARY_NODES,
  PRIMARY_NODE_HEIGHT,
  clamp01,
  type DefineNodeIcon,
} from "@/lib/home/define-mockup/constants";
import type { DefineMockupViewState } from "@/lib/home/define-mockup/timeline";

/**
 * "fill" — the whole panel is painted #fafaf9 for the entire loop (no
 * background image ever shows through).
 * "image" — no fill at all; every element renders directly on the panel's
 * background image.
 */
export type DefineMockupBackground = "fill" | "image";

const CONNECTOR_STROKE = "#CCCCCC";
const CONNECTOR_STROKE_ON_IMAGE = "#FFFFFF";

type Point = { x: number; y: number };

const CONNECTOR_RADIUS = 12;

/**
 * Orthogonal elbow: horizontal run to the midpoint, vertical run to the
 * target row, horizontal run into the node — corners rounded to 12px.
 */
function getConnectorPath(from: Point, to: Point): string {
  const midX = (from.x + to.x) / 2;
  const dy = to.y - from.y;

  if (Math.abs(dy) < 1) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  const sy = Math.sign(dy);
  const radius = Math.min(
    CONNECTOR_RADIUS,
    Math.abs(dy) / 2,
    Math.abs(midX - from.x),
  );

  return [
    `M ${from.x} ${from.y}`,
    `H ${midX - radius}`,
    `Q ${midX} ${from.y} ${midX} ${from.y + radius * sy}`,
    `V ${to.y - radius * sy}`,
    `Q ${midX} ${to.y} ${midX + radius} ${to.y}`,
    `H ${to.x}`,
  ].join(" ");
}

/** Splits one reveal progress into connector draw-in then node pop-in */
function splitProgress(progress: number) {
  return {
    connector: clamp01(progress / 0.55),
    node: clamp01((progress - 0.3) / 0.7),
  };
}

function Connector({
  from,
  to,
  progress,
  stroke,
}: {
  from: Point;
  to: Point;
  progress: number;
  stroke: string;
}) {
  if (progress <= 0) {
    return null;
  }

  return (
    <g>
      <path
        d={getConnectorPath(from, to)}
        fill="none"
        pathLength={1}
        stroke={stroke}
        strokeDasharray="1"
        strokeDashoffset={1 - progress}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <circle
        cx={to.x}
        cy={to.y}
        fill="#fff"
        opacity={clamp01((progress - 0.75) / 0.25)}
        r={3}
        stroke={stroke}
        strokeWidth={1.5}
      />
    </g>
  );
}

function nodeRevealStyle(progress: number): CSSProperties {
  return {
    opacity: progress,
    transform: `translateX(${(1 - progress) * -10}px)`,
  };
}

function NodeIcon({ icon }: { icon: DefineNodeIcon }) {
  return (
    <Image
      alt=""
      aria-hidden
      className="size-[18px] shrink-0 object-contain"
      height={18}
      src={ASSETS[icon]}
      unoptimized
      width={18}
    />
  );
}

function CoreEventCard({ progress }: { progress: number }) {
  return (
    <div
      className="absolute flex items-center gap-3.5 rounded-[14px] border border-[#eee] bg-white px-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      style={{
        left: CORE_NODE.left,
        top: CORE_NODE.top,
        width: CORE_NODE.width,
        height: CORE_NODE.height,
        ...nodeRevealStyle(progress),
      }}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#eee] bg-[#fafafa]">
        <NodeIcon icon="event" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="whitespace-nowrap text-[15px] font-medium leading-[1.4] tracking-[-0.3px] text-black">
          {CORE_NODE.title}
        </span>
        <span className="whitespace-nowrap text-[12px] leading-[1.4] tracking-[-0.24px] text-[#777]">
          {CORE_NODE.subtitle}
        </span>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_2px_white]"
        aria-hidden
      />
    </div>
  );
}

function PrimaryNodeCard({
  node,
  progress,
}: {
  node: (typeof PRIMARY_NODES)[number];
  progress: number;
}) {
  if (progress <= 0) {
    return null;
  }

  return (
    <div
      className="absolute flex items-center gap-2.5 rounded-[12px] border border-[#eee] bg-white px-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
      style={{
        left: node.left,
        top: node.top,
        width: node.width,
        height: PRIMARY_NODE_HEIGHT,
        ...nodeRevealStyle(progress),
      }}
    >
      <NodeIcon icon={node.icon} />
      <span className="whitespace-nowrap text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
        {node.label}
      </span>
    </div>
  );
}

function ChildNodeCard({
  node,
  progress,
}: {
  node: (typeof CHILD_NODES)[number];
  progress: number;
}) {
  if (progress <= 0) {
    return null;
  }

  return (
    <div
      className="absolute flex items-center gap-2 rounded-[10px] border border-[#eee] bg-white px-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
      style={{
        left: node.left,
        top: node.top,
        width: node.width,
        height: CHILD_NODE_HEIGHT,
        ...nodeRevealStyle(progress),
      }}
    >
      <span
        aria-hidden
        className="size-[7px] shrink-0 rounded-full border-[1.5px] border-[#bbb]"
      />
      <span className="whitespace-nowrap text-[13px] leading-[1.4] tracking-[-0.26px] text-[#444]">
        {node.label}
      </span>
    </div>
  );
}

function DefineMockupScene({
  state,
  background,
}: {
  state: DefineMockupViewState;
  background: DefineMockupBackground;
}) {
  const connectorStroke =
    background === "image" ? CONNECTOR_STROKE_ON_IMAGE : CONNECTOR_STROKE;

  return (
    <div
      className="relative"
      style={{ width: DEFINE_DESIGN_WIDTH, height: DEFINE_DESIGN_HEIGHT }}
    >
      <svg
        aria-hidden
        className="absolute inset-0"
        fill="none"
        height={DEFINE_DESIGN_HEIGHT}
        viewBox={`0 0 ${DEFINE_DESIGN_WIDTH} ${DEFINE_DESIGN_HEIGHT}`}
        width={DEFINE_DESIGN_WIDTH}
      >
        {PRIMARY_NODES.map((node, index) => (
          <Connector
            key={node.id}
            from={node.from}
            progress={splitProgress(state.branchProgress[index]).connector}
            stroke={connectorStroke}
            to={node.to}
          />
        ))}
        {CHILD_NODES.map((node, index) => (
          <Connector
            key={node.id}
            from={node.from}
            progress={splitProgress(state.childProgress[index]).connector}
            stroke={connectorStroke}
            to={node.to}
          />
        ))}

      </svg>

      {PRIMARY_NODES.map((node, index) => (
        <PrimaryNodeCard
          key={node.id}
          node={node}
          progress={splitProgress(state.branchProgress[index]).node}
        />
      ))}

      {CHILD_NODES.map((node, index) => (
        <ChildNodeCard
          key={node.id}
          node={node}
          progress={splitProgress(state.childProgress[index]).node}
        />
      ))}

      <CoreEventCard progress={state.coreProgress} />
    </div>
  );
}

type DefineMockupScaledFrameProps = {
  containerRef?: RefObject<HTMLDivElement | null>;
  state: DefineMockupViewState;
  background?: DefineMockupBackground;
  className?: string;
};

export function DefineMockupScaledFrame({
  containerRef,
  state,
  background = "fill",
  className,
}: DefineMockupScaledFrameProps) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef?.current;
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
  }, [containerRef]);

  const fitScale =
    containerSize.width > 0 && containerSize.height > 0
      ? Math.min(
          containerSize.width / state.viewWidth,
          containerSize.height / state.viewHeight,
        )
      : 1;

  const offsetX =
    (containerSize.width - state.viewWidth * fitScale) / 2 -
    state.viewLeft * fitScale;
  const offsetY =
    (containerSize.height - state.viewHeight * fitScale) / 2 -
    state.viewTop * fitScale;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden",
        background === "fill" && "bg-[#fafaf9]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{
          width: DEFINE_DESIGN_WIDTH,
          height: DEFINE_DESIGN_HEIGHT,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${fitScale})`,
          transformOrigin: "0 0",
        }}
      >
        <DefineMockupScene background={background} state={state} />
      </div>
    </div>
  );
}
