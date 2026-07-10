"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { COPY } from "@/lib/copy";

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("size-6 shrink-0", className)}
    >
      <path
        d="M9.45409 11.8687L21.0017 5.44532M8.97221 11.8627L3.84543 6.43678C3.24292 5.79911 3.69499 4.75 4.5723 4.75H20.5065C21.2792 4.75 21.76 5.58899 21.3693 6.25564L13.1868 20.2171C12.7405 20.9785 11.5985 20.8306 11.3609 19.9806L9.20843 12.2803C9.16474 12.124 9.08367 11.9807 8.97221 11.8627Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type EmailCaptureFormVariant = "default" | "overlay";

type EmailCaptureFormProps = {
  className?: string;
  inputId?: string;
  buttonLabel?: string;
  variant?: EmailCaptureFormVariant;
};

export function EmailCaptureForm({
  className,
  inputId = "waitlist-email",
  buttonLabel = COPY.emailCapture.button,
  variant = "default",
}: EmailCaptureFormProps) {
  const isOverlay = variant === "overlay";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className={cn(
          "text-body-lg",
          isOverlay ? "text-white" : "text-primary",
          className,
        )}
      >
        {COPY.emailCapture.success}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-1.5", className)}
      noValidate
    >
      <div
        className={cn(
          "flex items-center rounded-xl border border-[#eee]",
          isOverlay
            ? "gap-3 py-0.5 pl-3 pr-0.5"
            : "gap-4 py-1 pl-4 pr-1",
          "transition-[border-color,box-shadow] focus-within:ring-2",
          isOverlay
            ? "bg-white/10 focus-within:border-white/60 focus-within:ring-white/20"
            : "bg-card focus-within:border-border-strong focus-within:ring-accent/20",
          status === "error" && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
        )}
      >
        <PaperPlaneIcon
          className={cn(isOverlay ? "size-5 text-white" : "text-primary")}
        />
        <label htmlFor={inputId} className="sr-only">
          {COPY.emailCapture.placeholder}
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={COPY.emailCapture.placeholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className={cn(
            "min-w-0 flex-1 bg-transparent leading-normal focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
            isOverlay ? "text-sm" : "text-base",
            isOverlay
              ? "text-white placeholder:text-white/50"
              : "text-primary placeholder:text-primary/50",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-lg font-medium leading-normal transition-opacity",
            isOverlay ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base",
            isOverlay
              ? "bg-[#eee] text-black hover:opacity-90 focus-visible:ring-white focus-visible:ring-offset-transparent"
              : "bg-primary text-inverse hover:opacity-90 focus-visible:ring-accent focus-visible:ring-offset-card",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {status === "loading" ? COPY.emailCapture.loading : buttonLabel}
        </button>
      </div>
      {status === "error" ? (
        <p
          className={cn(
            "text-sm leading-normal",
            isOverlay ? "text-red-300" : "text-red-600",
          )}
        >
          {COPY.emailCapture.error}
        </p>
      ) : null}
    </form>
  );
}
