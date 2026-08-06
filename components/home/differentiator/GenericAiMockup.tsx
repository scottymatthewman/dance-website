import { cn } from "@/lib/cn";
import { PROFILES } from "@/lib/profiles";

export type GenericAiReply = {
  intro: string;
  phases?: readonly {
    label: string;
    detail: string;
  }[];
  outro: string;
};

type GenericAiMockupProps = {
  prompt: string;
  reply: GenericAiReply;
  className?: string;
};

const MESSAGE_CLASS =
  "text-[14px] leading-[1.4] tracking-[-0.28px] text-black/80";

function MessageDivider() {
  return <div className="h-px w-full shrink-0 bg-[#eee]" aria-hidden />;
}

function UserHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={PROFILES.Scott.avatar}
        alt=""
        className="size-4 shrink-0 rounded-full object-cover opacity-80"
        draggable={false}
      />
      <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.28px] text-black/80">
        You
      </span>
    </div>
  );
}

function AiHeader() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#eee] text-[10px] font-medium leading-none text-[#666]"
      >
        AI
      </span>
      <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.28px] text-black/70">
        Assistant
      </span>
    </div>
  );
}

function UserMessage({ prompt }: { prompt: string }) {
  return (
    <div className="flex flex-col gap-2">
      <UserHeader />
      <p className={MESSAGE_CLASS}>{prompt}</p>
    </div>
  );
}

function AiMessage({ reply }: { reply: GenericAiReply }) {
  return (
    <div className="flex flex-col gap-2">
      <AiHeader />
      <div className={cn("flex flex-col gap-2", MESSAGE_CLASS)}>
        <p>{reply.intro}</p>
        {reply.phases ? (
          <ul className="flex flex-col gap-1.5 pl-0">
            {reply.phases.map((phase) => (
              <li key={phase.label} className="flex flex-col gap-0.5">
                <span className="font-medium text-black/70">{phase.label}</span>
                <span className="text-[13px] text-black/50">{phase.detail}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-black">{reply.outro}</p>
      </div>
    </div>
  );
}

export function GenericAiMockup({
  prompt,
  reply,
  className,
}: GenericAiMockupProps) {
  return (
    <div
      className={cn("flex min-h-[16.5rem] flex-col gap-4 md:min-h-[18.5rem]", className)}
      aria-hidden
    >
      <UserMessage prompt={prompt} />
      <MessageDivider />
      <AiMessage reply={reply} />
    </div>
  );
}
