import Image from "next/image";
import { type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/cn";
import {
  ASSETS,
  BAR_HEIGHT,
  CURRENT_DATE_LINE_X,
  DRAG_CHROME,
  FULL_TIMELINE_WIDTH,
  STATUS_ICON_COLORS,
  TASK_LIST_WIDTH,
  TASK_ROWS,
  TASK_ROW_HEIGHT,
  TIMELINE_COLUMNS,
  TIMELINE_HEADER_HEIGHT,
  TIMELINE_PHASES,
  TIMELINE_WEEKS,
  lerp,
  type GanttBarIcon,
  type TaskStatusIcon,
  type TaskUrgency,
} from "@/lib/home/plan-mockup/constants";
import type { PlanMockupViewState } from "@/lib/home/plan-mockup/timeline";

/**
 * "fill" — the whole panel is painted #fafaf9 for the entire loop (no
 * background image ever shows through).
 * "image" — no fill at all; every element renders directly on the panel's
 * background image.
 */
export type PlanMockupBackground = "fill" | "image";

function InReviewIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      aria-hidden
      fill="none"
      height={size}
      viewBox="0 0 18 18"
      width={size}
    >
      <path
        d="M15.75 9C15.75 12.728 12.728 15.75 9 15.75C5.27208 15.75 2.25 12.728 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.728 2.25 15.75 5.27208 15.75 9Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function InProgressIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      aria-hidden
      fill="none"
      height={size}
      viewBox="0 0 18 18"
      width={size}
    >
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

function NotStartedIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg
      aria-hidden
      fill="none"
      height={size}
      viewBox="0 0 18 18"
      width={size}
    >
      <path
        d="M9.00007 2.2575V2.25M9.00007 15.75V15.7575M11.5818 2.77103L11.5846 2.7641M6.41841 15.2365L6.41554 15.2434M13.7704 4.23349L13.7757 4.22819M4.22975 13.7741L4.22445 13.7795M15.2327 6.42221L15.2397 6.41935M2.76732 11.5856L2.76039 11.5885M2.25384 9.00375H2.24634M15.7463 9.00375H15.7538M4.22993 4.23339L4.22463 4.22808M13.7706 13.7741L13.7758 13.7793M2.7676 6.42185L2.76067 6.41898M15.233 11.5852L15.24 11.5881M6.41839 2.771L6.41552 2.76407M11.5817 15.2365L11.5846 15.2434"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function StatusIcon({
  icon,
  size = 18,
}: {
  icon: TaskStatusIcon;
  size?: number;
}) {
  const color = STATUS_ICON_COLORS[icon];

  if (icon === "inReview") {
    return <InReviewIcon color={color} size={size} />;
  }

  if (icon === "inProgress") {
    return <InProgressIcon color={color} size={size} />;
  }

  return <NotStartedIcon color={color} size={size} />;
}

function UrgencyIcon({ level }: { level: TaskUrgency }) {
  const src =
    level === "high"
      ? ASSETS.urgencyHigh
      : level === "med"
        ? ASSETS.urgencyMed
        : ASSETS.urgencyLow;

  return (
    <Image
      alt=""
      aria-hidden
      className="size-[18px] object-contain"
      height={18}
      src={src}
      unoptimized
      width={18}
    />
  );
}

function AssigneePill({ avatar, name }: { avatar: string; name: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#eee] bg-white px-2 py-1">
      <div className="relative size-4 shrink-0 overflow-hidden rounded-full">
        <Image
          alt=""
          aria-hidden
          className="object-cover"
          fill
          sizes="16px"
          src={avatar}
          unoptimized
        />
      </div>
      <span className="whitespace-nowrap text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
        {name}
      </span>
    </div>
  );
}

function TaskRow(props: (typeof TASK_ROWS)[number]) {
  return (
    <div
      className="flex items-center"
      style={{ width: TASK_LIST_WIDTH, height: TASK_ROW_HEIGHT }}
    >
      <div className="flex size-12 shrink-0 items-center justify-center">
        <StatusIcon icon={props.status} />
      </div>
      <div className="flex size-12 shrink-0 items-center justify-center">
        <UrgencyIcon level={props.urgency} />
      </div>
      <div className="flex h-12 min-w-0 flex-1 items-center px-1.5">
        <span className="whitespace-nowrap text-[14px] leading-[1.4] text-[#666]">
          {props.label}
        </span>
      </div>
      <div className="flex h-12 w-[100px] shrink-0 items-center pl-1.5 pr-3.5">
        <AssigneePill avatar={props.avatar} name={props.assignee} />
      </div>
      <div className="flex h-12 w-16 shrink-0 items-center px-1.5">
        <span className="whitespace-nowrap text-[14px] leading-[1.4] text-[#666]">
          {props.date}
        </span>
      </div>
    </div>
  );
}

function TaskRowReveal({
  openAmount,
  children,
}: {
  openAmount: number;
  children: ReactNode;
}) {
  return (
    <div
      className="overflow-hidden"
      style={{
        height: openAmount * TASK_ROW_HEIGHT,
        opacity: openAmount,
        transform: `translateY(${(1 - openAmount) * -8}px)`,
      }}
    >
      {children}
    </div>
  );
}

function GanttBarStatusIcon({ icon }: { icon: GanttBarIcon }) {
  const color = STATUS_ICON_COLORS[icon];

  if (icon === "inProgress") {
    return <InProgressIcon color={color} />;
  }

  return <NotStartedIcon color={color} />;
}

/**
 * Drag handles + date labels, positioned relative to the hero bar.
 * As `hideProgress` goes 0 → 1 they slide underneath the bar (z-index below
 * the bar's opaque background), which is how the design "hides" them.
 */
function DragChrome({
  barWidth,
  hideProgress,
  leftDate,
  opacity,
  rightDate,
}: {
  barWidth: number;
  hideProgress: number;
  leftDate: string;
  opacity: number;
  rightDate: string;
}) {
  const leftHandleX = lerp(
    -DRAG_CHROME.handleOutsideLeft,
    DRAG_CHROME.hiddenLeftHandleX,
    hideProgress,
  );
  const rightHandleX = lerp(
    barWidth + DRAG_CHROME.handleOutsideRight,
    barWidth - DRAG_CHROME.hiddenRightHandleFromRight,
    hideProgress,
  );
  const leftDateX = lerp(
    -DRAG_CHROME.dateOutsideLeft,
    DRAG_CHROME.hiddenLeftDateX,
    hideProgress,
  );
  const rightDateX = lerp(
    barWidth + DRAG_CHROME.dateOutsideRight,
    barWidth - DRAG_CHROME.hiddenRightDateFromRight,
    hideProgress,
  );

  const handleClass =
    "absolute rounded-[7px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]";
  const dateClass =
    "absolute whitespace-nowrap text-[11px] leading-[1.4] tracking-[-0.22px] text-[#666]";

  return (
    <div aria-hidden className="absolute inset-0 z-[1]" style={{ opacity }}>
      <span
        className={dateClass}
        style={{
          left: leftDateX,
          top: DRAG_CHROME.dateTop,
          transform: `translateX(${-(1 - hideProgress) * 100}%)`,
        }}
      >
        {leftDate}
      </span>
      <div
        className={handleClass}
        style={{
          left: leftHandleX,
          top: DRAG_CHROME.handleTop,
          width: DRAG_CHROME.handleWidth,
          height: DRAG_CHROME.handleHeight,
        }}
      />
      <div
        className={handleClass}
        style={{
          left: rightHandleX,
          top: DRAG_CHROME.handleTop,
          width: DRAG_CHROME.handleWidth,
          height: DRAG_CHROME.handleHeight,
        }}
      />
      <span
        className={dateClass}
        style={{ left: rightDateX, top: DRAG_CHROME.dateTop }}
      >
        {rightDate}
      </span>
    </div>
  );
}

/** Single persistent hero bar — same DOM node for the entire animation */
function HeroGanttBar({ width }: { width: number }) {
  return (
    <div
      className="absolute left-0 top-0 z-[2] flex items-center overflow-hidden rounded-[12px] border border-[#eee] bg-white"
      style={{ width, height: BAR_HEIGHT }}
    >
      <div className="flex h-full w-12 shrink-0 items-center justify-center">
        <div className="size-[18px]">
          <GanttBarStatusIcon icon="inProgress" />
        </div>
      </div>
      <span className="whitespace-nowrap text-[13px] leading-[1.4] tracking-[-0.26px] text-black">
        Logistics Planning
      </span>
    </div>
  );
}

function TimelinePhaseBar({
  icon,
  label,
  left,
  top,
  width,
  animationDelay,
}: {
  icon: GanttBarIcon;
  label: string;
  left: number;
  top: number;
  width: number;
  animationDelay: string;
}) {
  return (
    <div
      className="plan-phase-enter absolute flex items-center overflow-hidden rounded-[12px] border border-[#eee] bg-white"
      style={{ left, top, width, height: BAR_HEIGHT, animationDelay }}
    >
      <div className="flex h-full w-12 shrink-0 items-center justify-center">
        <div className="size-[18px]">
          <GanttBarStatusIcon icon={icon} />
        </div>
      </div>
      <span className="whitespace-nowrap text-[13px] leading-[1.4] tracking-[-0.26px] text-black">
        {label}
      </span>
    </div>
  );
}

function TimelineLayer({
  state,
  background,
}: {
  state: PlanMockupViewState;
  background: PlanMockupBackground;
}) {
  const columnOffsets = TIMELINE_COLUMNS.reduce<number[]>((offsets, width) => {
    offsets.push((offsets.at(-1) ?? 0) + width);
    return offsets;
  }, []);

  // On the image background, light #eee dividers wash out — use translucent
  // black with color-burn so they sink into the photo instead.
  const onImage = background === "image";
  const dividerClass = onImage
    ? "border-black/30 mix-blend-color-burn"
    : "border-[#eee]";

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{ opacity: state.timelineOpacity, pointerEvents: "none" }}
    >
      <div
        className={cn("flex w-full border-b", dividerClass)}
        style={{ height: TIMELINE_HEADER_HEIGHT }}
      >
        {TIMELINE_WEEKS.map((week, index) => (
          <div
            key={week}
            className="flex shrink-0 items-center justify-center p-2"
            style={{ width: TIMELINE_COLUMNS[index] }}
          >
            <span className="whitespace-nowrap text-[11px] leading-[1.4] tracking-[-0.22px] text-[#666]">
              {week}
            </span>
          </div>
        ))}
      </div>

      {columnOffsets.slice(0, -1).map((offset) => (
        <div
          key={offset}
          className={cn(
            "absolute bottom-0 border-r border-dashed",
            dividerClass,
          )}
          style={{ left: offset, top: TIMELINE_HEADER_HEIGHT }}
        />
      ))}

      <div
        className="absolute bottom-0 top-0 w-0 border-l-2 border-[#ff6b2c]"
        style={{ left: CURRENT_DATE_LINE_X }}
      />

      {TIMELINE_PHASES.slice(1, state.visiblePhaseCount + 1).map(
        (phase, index) => (
          <TimelinePhaseBar
            key={phase.label}
            {...phase}
            animationDelay={`${index * 55}ms`}
          />
        ),
      )}
    </div>
  );
}

function PlanMockupScene({
  state,
  background,
}: {
  state: PlanMockupViewState;
  background: PlanMockupBackground;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: FULL_TIMELINE_WIDTH, height: state.sceneHeight }}
    >
      <div
        className="absolute inset-0"
        style={{ opacity: state.contentOpacity }}
      >
        <TimelineLayer background={background} state={state} />

        <div
          className="absolute"
          style={{
            left: state.barLeft,
            top: state.barTop,
            width: state.barWidth,
            transform: `translateY(${-state.introOffsetY}px)`,
          }}
        >
          {state.chromeVisible ? (
            <DragChrome
              barWidth={state.barWidth}
              hideProgress={state.chromeHideProgress}
              leftDate={state.leftDate}
              opacity={state.chromeOpacity}
              rightDate={state.rightDate}
            />
          ) : null}

          <HeroGanttBar width={state.barWidth} />

          {state.tasksVisible ? (
            <div
              className="absolute z-[1]"
              style={{ top: BAR_HEIGHT, left: 0 }}
            >
              {TASK_ROWS.map((task, index) => (
                <TaskRowReveal
                  key={`${task.assignee}-${index}`}
                  openAmount={state.rowOpenAmounts[index]}
                >
                  <TaskRow {...task} />
                </TaskRowReveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type PlanMockupCardProps = {
  state: PlanMockupViewState;
  background?: PlanMockupBackground;
  cardRef?: RefObject<HTMLDivElement | null>;
  className?: string;
};

export function PlanMockupCard({
  state,
  background = "fill",
  cardRef,
  className,
}: PlanMockupCardProps) {
  return (
    <div ref={cardRef} className={cn("h-full w-full", className)}>
      <PlanMockupScene background={background} state={state} />
    </div>
  );
}

type PlanMockupScaledFrameProps = {
  containerRef?: RefObject<HTMLDivElement | null>;
  containerSize: { width: number; height: number };
  state: PlanMockupViewState;
  background?: PlanMockupBackground;
  className?: string;
};

export function PlanMockupScaledFrame({
  containerRef,
  containerSize,
  state,
  background = "fill",
  className,
}: PlanMockupScaledFrameProps) {
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
          width: FULL_TIMELINE_WIDTH,
          height: state.sceneHeight,
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${fitScale})`,
          transformOrigin: "0 0",
        }}
      >
        <PlanMockupCard background={background} state={state} />
      </div>
    </div>
  );
}
