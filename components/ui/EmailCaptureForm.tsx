"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { COPY } from "@/lib/copy";

const PAPER_PLANE_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="size-6 shrink-0 text-primary"
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

type EmailCaptureFormProps = {
  className?: string;
  inputId?: string;
  buttonLabel?: string;
};

export function EmailCaptureForm({
  className,
  inputId = "waitlist-email",
  buttonLabel = COPY.emailCapture.button,
}: EmailCaptureFormProps) {
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
      <p className={cn("text-body-lg text-primary", className)}>
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
          "flex items-center gap-4 rounded-xl border border-[#eee] bg-card py-1 pl-4 pr-1",
          "transition-[border-color,box-shadow] focus-within:border-border-strong focus-within:ring-2 focus-within:ring-accent/20",
          status === "error" && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
        )}
      >
        {PAPER_PLANE_ICON}
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
          className="min-w-0 flex-1 bg-transparent text-base leading-normal text-primary placeholder:text-primary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2 text-base font-medium leading-normal text-inverse transition-opacity",
            "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {status === "loading" ? COPY.emailCapture.loading : buttonLabel}
        </button>
      </div>
      {status === "error" ? (
        <p className="text-sm leading-normal text-red-600">
          {COPY.emailCapture.error}
        </p>
      ) : null}
    </form>
  );
}
