import { sendFormNotification } from "@/lib/form-notifications";
import { getPostHogClient } from "@/lib/posthog-server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SUBMISSIONS_PER_DEVICE = 3;
const MAX_EVENTS_LENGTH = 500;

const deviceSubmissionCounts = new Map<string, number>();

function getSubmissionCount(deviceId: string): number {
  return deviceSubmissionCounts.get(deviceId) ?? 0;
}

function incrementSubmissionCount(deviceId: string): void {
  deviceSubmissionCounts.set(deviceId, getSubmissionCount(deviceId) + 1);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email =
    "email" in body && typeof body.email === "string" ? body.email.trim() : "";
  const events =
    "events" in body && typeof body.events === "string" ? body.events.trim() : "";
  const deviceId =
    "deviceId" in body && typeof body.deviceId === "string"
      ? body.deviceId.trim()
      : "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!events || events.length > MAX_EVENTS_LENGTH) {
    return Response.json({ error: "Invalid events description" }, { status: 400 });
  }

  if (!deviceId) {
    return Response.json({ error: "Missing device identifier" }, { status: 400 });
  }

  if (getSubmissionCount(deviceId) >= MAX_SUBMISSIONS_PER_DEVICE) {
    return Response.json(
      { error: "Maximum submissions reached for this device" },
      { status: 429 },
    );
  }

  incrementSubmissionCount(deviceId);

  const delivered = await sendFormNotification("use-case", {
    email,
    events,
  });

  if (!delivered) {
    return Response.json(
      { error: "Unable to process submission right now" },
      { status: 503 },
    );
  }

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? email;
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "use_case_interest_submitted",
    properties: { source: "api" },
  });
  await posthog.flush();

  return Response.json({ ok: true });
}
