import Image from "next/image";
import { ScaledBentoFrame } from "@/components/home/bento/ScaledBentoFrame";
import { cn } from "@/lib/cn";
import { PROFILES } from "@/lib/profiles";

/** Figma export `Agents-Graphic.png` */
const DESIGN_WIDTH = 2010;
const DESIGN_HEIGHT = 1338;

const TASKS = [
  {
    task: "Find the hotel",
    assignee: PROFILES.Dani.name,
    avatar: PROFILES.Dani.avatar,
    due: "Jun 29",
  },
  {
    task: "Reimburse flights",
    assignee: PROFILES.Cooper.name,
    avatar: PROFILES.Cooper.avatar,
    due: "Jul 14",
  },
  {
    task: "Schedule cultural activities",
    assignee: "Agent",
    isAgent: true,
    due: "Jul 16",
    hovered: true,
  },
  {
    task: "Pay activity providers",
    assignee: PROFILES.Tessa.name,
    avatar: PROFILES.Tessa.avatar,
    due: "Jul 19",
  },
  {
    task: "Pay for hotel",
    assignee: "Agent",
    isAgent: true,
    due: "Jul 24",
  },
] as const;

function AssigneePill({
  assignee,
  avatar,
  isAgent,
  hovered,
}: {
  assignee: string;
  avatar?: string;
  isAgent?: boolean;
  hovered?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-white font-medium text-black",
        hovered ? "border-black/30" : "border-black/10",
      )}
      style={{ gap: 6, padding: "2px 10px 2px 2px", fontSize: 13 }}
    >
      {isAgent ? (
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] leading-none"
          style={{ width: 24, height: 24, fontSize: 12 }}
        >
          👾
        </span>
      ) : (
        <span
          className="relative shrink-0 overflow-hidden rounded-full"
          style={{ width: 24, height: 24 }}
        >
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              aria-hidden
              fill
              className="object-cover"
              sizes="24px"
            />
          ) : null}
        </span>
      )}
      {assignee}
    </span>
  );
}

export function AgentsBentoMockup() {
  return (
    <ScaledBentoFrame
      designWidth={DESIGN_WIDTH}
      designHeight={DESIGN_HEIGHT}
      referenceSrc="/bento-mockup/Agents-Graphic.png"
    >
      <div
        className="absolute rounded-[16px] border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        style={{ left: 980, top: 420, width: 880, height: 520, padding: "24px 28px" }}
      >
        <div
          className="grid border-b border-[#eee] font-medium text-[#9ca3af]"
          style={{
            gridTemplateColumns: "1fr auto auto",
            gap: "8px 24px",
            paddingBottom: 12,
            fontSize: 13,
          }}
        >
          <span>Task</span>
          <span>Assignee</span>
          <span className="flex items-center" style={{ gap: 4 }}>
            Due
            <span aria-hidden style={{ fontSize: 10, opacity: 0.4 }}>
              ▲▼
            </span>
          </span>
        </div>
        <div>
          {TASKS.map((row) => (
            <div
              key={row.task}
              className="grid items-center border-b border-[#f5f5f5] last:border-0"
              style={{
                gridTemplateColumns: "1fr auto auto",
                gap: "8px 24px",
                padding: "18px 0",
              }}
            >
              <span className="text-[#6b7280]" style={{ fontSize: 14 }}>
                {row.task}
              </span>
              <AssigneePill
                assignee={row.assignee}
                avatar={"avatar" in row ? row.avatar : undefined}
                isAgent={"isAgent" in row ? row.isAgent : false}
                hovered={"hovered" in row ? row.hovered : false}
              />
              <span className="text-[#6b7280]" style={{ fontSize: 14 }}>
                {row.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScaledBentoFrame>
  );
}
