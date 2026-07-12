"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useMobileInputFocusHandler } from "@/hooks/useMobileInputFocusHandler";
import { cn } from "@/lib/cn";
import { COPY } from "@/lib/copy";
import {
  canSubmitUseCaseInterest,
  getDeviceId,
  recordUseCaseSubmission,
} from "@/lib/use-case-interest";

const FORM_COPY = COPY.useCases.ctaCard.form;

type FormStatus = "idle" | "loading" | "success" | "error" | "rateLimited";

type UseCaseInterestFormProps = {
  className?: string;
  title?: string;
  onStatusChange?: (status: FormStatus) => void;
};

export function UseCaseInterestForm({
  className,
  title,
  onStatusChange,
}: UseCaseInterestFormProps) {
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState("");
  const [status, setStatus] = useState<FormStatus>(() =>
    canSubmitUseCaseInterest() ? "idle" : "rateLimited",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { onFocus: handleInputFocus, onTouchStart: handleInputTouchStart } =
    useMobileInputFocusHandler();

  function updateStatus(nextStatus: FormStatus) {
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmitUseCaseInterest()) {
      updateStatus("rateLimited");
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedEvents = events.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage(FORM_COPY.invalidEmail);
      updateStatus("error");
      return;
    }

    if (!trimmedEvents) {
      setErrorMessage(FORM_COPY.invalidEvents);
      updateStatus("error");
      return;
    }

    setErrorMessage(null);
    updateStatus("loading");

    try {
      const response = await fetch("/api/use-case-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          events: trimmedEvents,
          deviceId: getDeviceId(),
        }),
      });

      if (response.status === 429) {
        updateStatus("rateLimited");
        return;
      }

      if (!response.ok) {
        setErrorMessage(FORM_COPY.error);
        updateStatus("error");
        return;
      }

      recordUseCaseSubmission();
      updateStatus("success");
      setEmail("");
      setEvents("");
    } catch {
      setErrorMessage(FORM_COPY.error);
      updateStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("flex flex-col gap-2 text-center", className)}>
        <p className="text-lg font-medium leading-normal text-primary">
          {FORM_COPY.successTitle}
        </p>
        <p className="max-w-[14.75rem] text-[0.9375rem] leading-normal text-[#555555]">
          {FORM_COPY.successBody}
        </p>
      </div>
    );
  }

  if (status === "rateLimited") {
    return (
      <p className={cn("text-[0.9375rem] leading-normal text-[#555555]", className)}>
        {FORM_COPY.rateLimited}
      </p>
    );
  }

  const inputClasses =
    "w-full rounded-[6px] border border-[#ddd] bg-white px-3 py-2 text-sm leading-normal text-primary placeholder:text-primary/50 focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 [@media(max-width:47.9375rem)]:text-base";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col items-center gap-5", className)}
      noValidate
    >
      <div className="flex w-full max-w-[16.5rem] flex-col gap-2 text-center">
        {title ? (
          <p className="text-lg font-medium leading-normal text-primary">{title}</p>
        ) : null}

        <label className="sr-only" htmlFor="use-case-interest-email">
          {FORM_COPY.emailPlaceholder}
        </label>
        <input
          id="use-case-interest-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={FORM_COPY.emailPlaceholder}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              updateStatus("idle");
              setErrorMessage(null);
            }
          }}
          onTouchStart={handleInputTouchStart}
          onFocus={handleInputFocus}
          disabled={status === "loading"}
          className={cn(
            inputClasses,
            status === "error" &&
              errorMessage === FORM_COPY.invalidEmail &&
              "border-red-500",
          )}
        />

        <label className="sr-only" htmlFor="use-case-interest-events">
          {FORM_COPY.eventsPlaceholder}
        </label>
        <textarea
          id="use-case-interest-events"
          name="events"
          rows={3}
          placeholder={FORM_COPY.eventsPlaceholder}
          value={events}
          onChange={(event) => {
            setEvents(event.target.value);
            if (status === "error") {
              updateStatus("idle");
              setErrorMessage(null);
            }
          }}
          onTouchStart={handleInputTouchStart}
          onFocus={handleInputFocus}
          disabled={status === "loading"}
          className={cn(
            inputClasses,
            "resize-none",
            status === "error" &&
              errorMessage === FORM_COPY.invalidEvents &&
              "border-red-500",
          )}
        />

        {status === "error" && errorMessage ? (
          <p className="text-sm leading-normal text-red-600">{errorMessage}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={status === "loading"}
        className="w-full max-w-[16.5rem] rounded-[6px]"
      >
        {status === "loading" ? FORM_COPY.loading : FORM_COPY.submit}
      </Button>
    </form>
  );
}
