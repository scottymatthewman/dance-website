import { cn } from "@/lib/cn";
import {
  AGENT_SIMILAR_OPTIONS_MESSAGE,
  AGENT_VENUES,
  ASSETS,
  BOTTOM_ANCHOR_FROM_STEP,
  USER_MESSAGE,
  USER_NAME,
  CONTENT_COLLAPSE_MS,
  CONTENT_EASE,
  CONTENT_EXPAND_MS,
  DESIGN_WIDTH,
  FOLLOW_UP_OPTIONS,
  FOUND_HOTEL,
  FULL_DRAFT,
  LAYOUT_TRANSITION_MS,
  MENTION,
  REPLY_SUFFIX,
  type AnimationStep,
} from "@/lib/home/collaborate-mockup/constants";
import type { CollaborateMockupViewState } from "@/lib/home/collaborate-mockup/timeline";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * "fill" — the whole panel is painted #fafaf9 for the entire loop (no
 * background image ever shows through).
 * "image" — no fill at all; every element renders directly on the panel's
 * background image.
 */
export type CollaborateMockupBackground = "fill" | "image";

const FRAME_EDGE_PADDING = 32;

function CollapsibleSection({
  open,
  children,
  animate = true,
  spacing = true,
}: {
  open: boolean;
  children: ReactNode;
  animate?: boolean;
  spacing?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid",
        animate && "transition-[grid-template-rows] ease-[var(--collaborate-content-ease)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
      style={{
        transitionDuration: animate
          ? `${open ? CONTENT_EXPAND_MS : CONTENT_COLLAPSE_MS}ms`
          : undefined,
        ["--collaborate-content-ease" as string]: CONTENT_EASE,
      }}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            spacing && "pt-4",
            animate &&
              "transition-[opacity,filter,transform] ease-[var(--collaborate-content-ease)]",
            open
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-1 opacity-0 blur-[2px]",
          )}
          style={{
            transitionDuration: animate
              ? `${open ? CONTENT_EXPAND_MS : CONTENT_COLLAPSE_MS}ms`
              : undefined,
            ["--collaborate-content-ease" as string]: CONTENT_EASE,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function MessageDivider() {
  return <div className="h-px w-full shrink-0 bg-[#eee]" aria-hidden />;
}

function UserHeader({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={ASSETS.avatar}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0 rounded-full object-cover"
        draggable={false}
      />
      <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.28px] text-black">
        {USER_NAME}
      </span>
      <span className="text-[13px] leading-[1.4] tracking-[-0.26px] text-[#777]">
        ·
      </span>
      <span className="text-[13px] leading-[1.4] tracking-[-0.26px] text-[#777]">
        {time}
      </span>
    </div>
  );
}

function InitialUserMessage() {
  return (
    <div className="flex flex-col gap-2">
      <UserHeader time="2m ago" />
      <div className="text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
        <p>{USER_MESSAGE}</p>
        <ul className="mt-2 list-disc pl-5">
          <li>{FOUND_HOTEL}</li>
        </ul>
      </div>
    </div>
  );
}

function MentionPill() {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-[#dea8ff] bg-[#f7e6ff] px-1 py-0.5 text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
      {MENTION}
    </span>
  );
}

function SubmittedReply() {
  return (
    <div className="flex flex-wrap items-center gap-1 text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
      <MentionPill />
      <span>{REPLY_SUFFIX.trimStart()}</span>
    </div>
  );
}

function AgentHeader({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-base leading-5" aria-hidden>
        👾
      </span>
      <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.28px] text-black">
        Agent
      </span>
      <span className="text-[13px] leading-[1.4] tracking-[-0.26px] text-[#777]">
        ·
      </span>
      <span className="text-[13px] leading-[1.4] tracking-[-0.26px] text-[#777]">
        {time}
      </span>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={ASSETS.loader}
        alt=""
        width={20}
        height={20}
        className="collaborate-mockup-loader size-5 shrink-0"
        draggable={false}
      />
      <span className="collaborate-mockup-shimmer text-[11px] leading-[1.4] tracking-[-0.22px]">
        Agent is typing...
      </span>
    </div>
  );
}

function BookItButton() {
  return (
    <div className="pl-6">
      <span className="inline-flex items-center rounded-[5px] border border-[#bbb] bg-[#fafafa] px-2 py-1 text-[14px] leading-[1.4] tracking-[-0.28px] text-black opacity-70">
        Book it
      </span>
    </div>
  );
}

function AgentVenueBlock({ venue }: { venue: (typeof AGENT_VENUES)[number] }) {
  return (
    <div className="flex flex-col gap-2">
      <ul className="list-disc pl-5 text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
        <li>{venue.name}</li>
        <ul className="list-disc pl-5">
          <li>{venue.address}</li>
          <li>
            <span className="text-[#008ee7] underline">{venue.phone}</span>
          </li>
        </ul>
      </ul>
      <BookItButton />
    </div>
  );
}

function AgentResponse() {
  return (
    <div className="flex flex-col gap-4">
      <AgentHeader time="Seconds ago" />
      <div className="flex flex-col gap-2 text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
        <p>{AGENT_SIMILAR_OPTIONS_MESSAGE}</p>
        <div className="flex flex-col gap-2">
          {AGENT_VENUES.map((venue) => (
            <AgentVenueBlock key={venue.name} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FollowUpPrompt() {
  return (
    <div className="flex flex-col gap-4">
      <AgentHeader time="Seconds ago" />
      <div className="flex flex-col gap-2">
        <p className="text-[14px] leading-[1.4] tracking-[-0.28px] text-black">
          How would you like me to follow up?
        </p>
        <div className="flex flex-col gap-2">
          {FOLLOW_UP_OPTIONS.map((option) => (
            <div key={option.letter} className="flex items-center gap-2">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-[5px] border border-[#bbb] bg-[#fafafa] text-[14px] leading-[1.4] tracking-[-0.28px] text-black opacity-70">
                {option.letter}
              </span>
              <span
                className={cn(
                  "text-[14px] leading-[1.4] tracking-[-0.28px] text-black",
                  option.muted ? "opacity-40" : "opacity-90",
                )}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReplyComposer({
  step,
  draftLength,
  animate,
}: {
  step: AnimationStep;
  draftLength: number;
  animate: boolean;
}) {
  const isDrafting = step === 0;
  const draft = FULL_DRAFT.slice(0, draftLength);

  return (
    <div className="relative flex items-center justify-between gap-4">
      <div className="relative min-h-[1.4em] min-w-0 flex-1">
        <p
          className={cn(
            "text-[14px] leading-[1.4] tracking-[-0.28px] text-black transition-[opacity,transform] ease-[var(--collaborate-content-ease)]",
            isDrafting
              ? "translate-y-0 opacity-100"
              : "pointer-events-none absolute inset-0 translate-y-1 opacity-0",
          )}
          style={{
            transitionDuration: animate ? `${CONTENT_EXPAND_MS}ms` : undefined,
            ["--collaborate-content-ease" as string]: CONTENT_EASE,
          }}
        >
          {draft.startsWith(MENTION) ? (
            <>
              <span className="font-medium text-[#710ec7]">{MENTION}</span>
              <span>{draft.slice(MENTION.length)}</span>
            </>
          ) : (
            draft
          )}
        </p>
        <p
          className={cn(
            "text-[14px] leading-[1.4] tracking-[-0.28px] text-[#999] transition-[opacity,transform] ease-[var(--collaborate-content-ease)]",
            isDrafting
              ? "pointer-events-none absolute inset-0 translate-y-1 opacity-0"
              : "translate-y-0 opacity-100",
          )}
          style={{
            transitionDuration: animate ? `${CONTENT_EXPAND_MS}ms` : undefined,
            ["--collaborate-content-ease" as string]: CONTENT_EASE,
          }}
        >
          Leave a reply...
        </p>
      </div>
      <img
        src={ASSETS.send}
        alt=""
        width={18}
        height={18}
        className={cn(
          "size-[18px] shrink-0 transition-opacity ease-[var(--collaborate-content-ease)]",
          isDrafting ? "opacity-100" : "opacity-30",
        )}
        style={{
          transitionDuration: animate ? `${CONTENT_EXPAND_MS}ms` : undefined,
          ["--collaborate-content-ease" as string]: CONTENT_EASE,
        }}
        draggable={false}
      />
    </div>
  );
}

function getSectionVisibility(step: AnimationStep) {
  return {
    showSubmittedReply: step >= 1,
    showEarlyTyping: step === 2,
    showAgentResponse: step >= 3,
    showLateTyping: step === 4,
    showFollowUp: step >= 5,
    showComposerDivider: step === 0 || step >= 3,
  };
}

type CollaborateMockupCardProps = {
  state: CollaborateMockupViewState;
  className?: string;
  animate?: boolean;
  cardRef?: RefObject<HTMLDivElement | null>;
};

function CollaborateMockupCard({
  state,
  className,
  animate = true,
  cardRef,
}: CollaborateMockupCardProps) {
  const { step, draftLength } = state;
  const {
    showSubmittedReply,
    showEarlyTyping,
    showAgentResponse,
    showLateTyping,
    showFollowUp,
    showComposerDivider,
  } = getSectionVisibility(step);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex w-full flex-col overflow-visible rounded-[12px] border border-[#eee] bg-[#fafafa] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <InitialUserMessage />

      <CollapsibleSection open={showSubmittedReply} animate={animate}>
        <>
          <SubmittedReply />
          <div className="pt-4">
            <MessageDivider />
          </div>
        </>
      </CollapsibleSection>

      <CollapsibleSection open={showEarlyTyping} animate={animate}>
        <>
          <TypingIndicator />
          <div className="pt-4">
            <MessageDivider />
          </div>
        </>
      </CollapsibleSection>

      <CollapsibleSection open={showAgentResponse} animate={animate}>
        <AgentResponse />
      </CollapsibleSection>

      <CollapsibleSection open={showLateTyping} animate={animate}>
        <>
          <MessageDivider />
          <div className="pt-4">
            <TypingIndicator />
          </div>
        </>
      </CollapsibleSection>

      <CollapsibleSection open={showFollowUp} animate={animate}>
        <FollowUpPrompt />
      </CollapsibleSection>

      <CollapsibleSection open={showComposerDivider} animate={animate}>
        <MessageDivider />
      </CollapsibleSection>

      <div className="pt-4">
        <ReplyComposer
          step={step}
          draftLength={draftLength}
          animate={animate}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_2px_white]"
        aria-hidden
      />
    </div>
  );
}

function getCenterOffsetY(cardHeight: number, containerHeight: number) {
  return FRAME_EDGE_PADDING + (cardHeight - containerHeight) / 2;
}

type CollaborateMockupScaledFrameProps = {
  containerRef?: RefObject<HTMLDivElement | null>;
  scale?: number;
  state: CollaborateMockupViewState;
  background?: CollaborateMockupBackground;
  className?: string;
  animateLayout?: boolean;
};

export function CollaborateMockupScaledFrame({
  containerRef,
  scale = 1,
  state,
  background = "fill",
  className,
  animateLayout = true,
}: CollaborateMockupScaledFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ cardHeight: 0, containerHeight: 0 });
  const isBottomAnchored = state.step >= BOTTOM_ANCHOR_FROM_STEP;
  const translateY = isBottomAnchored
    ? 0
    : getCenterOffsetY(layout.cardHeight, layout.containerHeight);

  useEffect(() => {
    const container = containerRef?.current;
    const card = cardRef.current;
    if (!container || !card) {
      return;
    }

    const updateLayout = () => {
      setLayout({
        cardHeight: card.getBoundingClientRect().height,
        containerHeight: container.getBoundingClientRect().height,
      });
    };

    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);
    observer.observe(card);
    return () => observer.disconnect();
  }, [containerRef, state.step, state.stepProgress, scale]);

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
        className={cn(
          "absolute bottom-8 left-1/2 will-change-transform",
          animateLayout &&
            "transition-transform ease-[var(--collaborate-layout-ease)]",
        )}
        style={{
          width: DESIGN_WIDTH,
          transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
          transformOrigin: "bottom center",
          transitionDuration: animateLayout ? `${LAYOUT_TRANSITION_MS}ms` : undefined,
          ["--collaborate-layout-ease" as string]: CONTENT_EASE,
        }}
      >
        <CollaborateMockupCard
          cardRef={cardRef}
          state={state}
          animate={animateLayout}
        />
      </div>
    </div>
  );
}
