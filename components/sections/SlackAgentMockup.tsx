import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SlackAgentMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-2 overflow-hidden rounded-lg border border-white/10",
        "bg-[#1b1d21] p-4 shadow-[0_8px_8px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <MessageRow
        author="John Allen"
        avatar={
          <Image
            alt=""
            aria-hidden
            className="size-[1.421875rem] rounded-[0.315625rem] border border-white/10 object-cover"
            height={23}
            src="/hero-mockup/avatar.png"
            width={23}
          />
        }
        time="10:45 AM"
      >
        What&apos;s going on with Terrace? I haven&apos;t touched base with them in a
        few weeks and I&apos;m nervous we&apos;re about to get surprised.
      </MessageRow>

      <MessageRow
        author="Dance"
        avatar={<DanceAppAvatar />}
        badge="APP"
        time="10:46 AM"
      >
        <span className="block space-y-2">
          <span className="block">
            Terrace is worth a look this week. Usage dropped 18% over the last 14
            days, their last two support tickets were about API rate limits, and
            their renewal is in 47 days. I&apos;d prioritize a check-in on the
            integration rollout — that&apos;s where usage fell off.
          </span>
          <span className="block">
            I&apos;ve drafted a note to their champion in this thread. Do you want me
            to open a follow-up task for you?
          </span>
        </span>
        <span className="mt-2 flex items-center gap-1">
          <DanceAppAvatar size="sm" />
          <span className="text-[0.605rem] font-bold leading-normal text-[#00a8d2]">
            1 reply
          </span>
        </span>
      </MessageRow>
    </div>
  );
}

function DanceAppAvatar({ size = "md" }: { size?: "md" | "sm" }) {
  const dimension = size === "sm" ? "size-[0.973125rem]" : "size-[1.421875rem]";

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[0.315625rem] border border-white/10 bg-[#e8592d]",
        dimension,
      )}
    >
      <Image
        alt=""
        aria-hidden
        className={cn("relative z-[1]", size === "sm" ? "size-2" : "size-3")}
        height={12}
        src="/product-surfaces/dance-sparkle.svg"
        width={12}
      />
    </span>
  );
}

function MessageRow({
  author,
  avatar,
  badge,
  children,
  time,
}: {
  author: string;
  avatar: ReactNode;
  badge?: string;
  children: ReactNode;
  time: string;
}) {
  return (
    <article className="flex gap-1.5">
      {avatar}
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-end gap-x-1 gap-y-0.5">
          <span className="text-[0.605rem] font-black leading-[0.908125rem] text-[#f8f8f8]">
            {author}
          </span>
          {badge ? (
            <span className="rounded-[0.0525rem] bg-[#282a2e] px-[0.118125rem] py-[0.079rem] text-[0.368125rem] font-medium uppercase leading-[1.2] text-[#b9babd]">
              {badge}
            </span>
          ) : null}
          <span className="text-[0.420625rem] leading-[0.908125rem] text-[#a9a9ab]">
            {time}
          </span>
        </div>
        <div className="text-[0.605rem] leading-[1.5] text-[#d1d2d3]">{children}</div>
      </div>
    </article>
  );
}
