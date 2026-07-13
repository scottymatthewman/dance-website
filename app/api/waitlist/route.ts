import { sendFormNotification } from "@/lib/form-notifications";
import { getPostHogClient } from "@/lib/posthog-server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof body.email === "string"
      ? body.email.trim()
      : "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const delivered = await sendFormNotification("waitlist", { email });

  if (!delivered) {
    return Response.json(
      { error: "Unable to process signup right now" },
      { status: 503 },
    );
  }

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? email;
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "waitlist_signup_completed",
    properties: { source: "api" },
  });
  await posthog.flush();

  return Response.json({ ok: true });
}
