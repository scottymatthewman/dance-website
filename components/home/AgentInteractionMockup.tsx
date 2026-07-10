import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { PROFILES } from "@/lib/profiles";

const ASSETS = {
  send: "/icons/Send.svg",
} as const;

/** Dark mockup tokens — see docs/mockup-color-system.md */
const mockup = {
  surface: "#1C1C1C",
  border: "#2E2E2E",
  divider: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#F4F4F4",
  textSecondary: "#D4D4D4",
  textMuted: "#949494",
  textPlaceholder: "#6B6B6B",
  link: "#02ABFF",
  interactive: "#2A2A2A",
  interactiveBorder: "#333333",
  mentionBg: "rgba(222, 168, 255, 0.12)",
  mentionBorder: "rgba(222, 168, 255, 0.35)",
  insetRing: "rgba(255, 255, 255, 0.06)",
} as const;

function MessageDivider() {
  return (
    <div
      className="h-px w-full shrink-0"
      style={{ backgroundColor: mockup.divider }}
      aria-hidden
    />
  );
}

function UserHeader({
  name,
  time,
  avatarSrc = PROFILES.Mira.avatar,
}: {
  name: string;
  time: string;
  avatarSrc?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={avatarSrc}
        alt=""
        className="size-6 shrink-0 rounded-full object-cover"
        draggable={false}
      />
      <span
        className="text-[16px] font-medium leading-[1.4] tracking-[-0.32px]"
        style={{ color: mockup.textPrimary }}
      >
        {name}
      </span>
      <span
        className="text-[15px] leading-[1.4] tracking-[-0.3px]"
        style={{ color: mockup.textMuted }}
      >
        ·
      </span>
      <span
        className="text-[15px] leading-[1.4] tracking-[-0.3px]"
        style={{ color: mockup.textMuted }}
      >
        {time}
      </span>
    </div>
  );
}

function AgentHeader({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-2xl leading-[30px]" aria-hidden>
        👾
      </span>
      <span
        className="text-[16px] font-medium leading-[1.4] tracking-[-0.32px]"
        style={{ color: mockup.textPrimary }}
      >
        Agent
      </span>
      <span
        className="text-[15px] leading-[1.4] tracking-[-0.3px]"
        style={{ color: mockup.textMuted }}
      >
        ·
      </span>
      <span
        className="text-[15px] leading-[1.4] tracking-[-0.3px]"
        style={{ color: mockup.textMuted }}
      >
        {time}
      </span>
    </div>
  );
}

function MentionPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-[5px] px-1 py-0.5 text-[16px] leading-[1.4] tracking-[-0.32px]"
      style={{
        color: mockup.textPrimary,
        backgroundColor: mockup.mentionBg,
        border: `1px solid ${mockup.mentionBorder}`,
      }}
    >
      {children}
    </span>
  );
}

function OptionRow({
  letter,
  label,
  muted = false,
}: {
  letter: string;
  label: string;
  muted?: boolean;
}) {
  return (
    <div className="flex w-full items-center gap-2">
      <span
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-[5px] text-[16px] leading-[1.4] tracking-[-0.32px]"
        style={{
          color: mockup.textSecondary,
          backgroundColor: mockup.interactive,
          border: `1px solid ${mockup.interactiveBorder}`,
        }}
      >
        {letter}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 text-[16px] leading-[1.4] tracking-[-0.32px]",
          muted ? "opacity-40" : "opacity-90",
        )}
        style={{ color: mockup.textPrimary }}
      >
        {label}
      </span>
    </div>
  );
}

type AgentInteractionMockupProps = {
  className?: string;
};

export function AgentInteractionMockup({ className }: AgentInteractionMockupProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-[37.5rem] flex-col gap-4 overflow-hidden rounded-xl border p-4 shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={{
        backgroundColor: mockup.surface,
        borderColor: mockup.border,
      }}
      aria-hidden
    >
      <section className="flex flex-col gap-3">
        <UserHeader name={PROFILES.Mira.name} time="9m ago" />
        <ul
          className="list-disc space-y-0 pl-5 text-[16px] leading-[1.4] tracking-[-0.32px]"
          style={{ color: mockup.textPrimary }}
        >
          <li>Hotel Casa Sagnier</li>
          <li>Catalonia Portal de l&apos;Angel</li>
          <li>W Barcelona</li>
        </ul>
        <p
          className="flex flex-wrap items-center gap-1 text-[16px] leading-[1.4] tracking-[-0.32px]"
          style={{ color: mockup.textPrimary }}
        >
          <MentionPill>@Agent</MentionPill>
          <span>can you get more info on them?</span>
        </p>
      </section>

      <MessageDivider />

      <section className="flex flex-col gap-3">
        <AgentHeader time="7m ago" />
        <div
          className="space-y-3 text-[16px] leading-[1.4] tracking-[-0.32px]"
          style={{ color: mockup.textPrimary }}
        >
          <p>Here are the addresses and phone numbers for each option:</p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              Hotel Casa Sagnier
              <ul className="mt-1 list-disc space-y-0 pl-5">
                <li>Rambla de Catalunya 104</li>
                <li className="underline" style={{ color: mockup.link }}>
                  +34 935 959 545
                </li>
              </ul>
            </li>
            <li>
              Catalonia Portal de l&apos;Angel
              <ul className="mt-1 list-disc space-y-0 pl-5">
                <li>Portal de l&apos;Àngel, 17</li>
                <li className="underline" style={{ color: mockup.link }}>
                  +34 93 318 41 41
                </li>
              </ul>
            </li>
            <li>
              W Barcelona
              <ul className="mt-1 list-disc space-y-0 pl-5">
                <li>Plaça Rosa dels Vents, Ciutat Vellat</li>
                <li className="underline" style={{ color: mockup.link }}>
                  +34 932 95 28 00
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <AgentHeader time="7m ago" />
        <p
          className="text-[16px] leading-[1.4] tracking-[-0.32px]"
          style={{ color: mockup.textPrimary }}
        >
          How would you like me to follow up?
        </p>
        <div className="flex flex-col gap-2">
          <OptionRow letter="A" label="Go get a price list" />
          <OptionRow letter="B" label="Remind me to call" />
          <OptionRow letter="C" label="Other..." muted />
        </div>
      </section>

      <MessageDivider />

      <div className="flex items-center justify-between gap-4">
        <p
          className="text-[18px] leading-[1.4] tracking-[-0.36px] opacity-40"
          style={{ color: mockup.textPlaceholder }}
        >
          Leave a reply...
        </p>
        <img
          src={ASSETS.send}
          alt=""
          className="size-6 shrink-0 opacity-30 invert"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: `inset 0 0 0 2px ${mockup.insetRing}` }}
        aria-hidden
      />
    </div>
  );
}
