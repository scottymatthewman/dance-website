import { Resend } from "resend";

type FormNotificationKind = "waitlist" | "use-case";

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function getNotificationContent(
  kind: FormNotificationKind,
  fields: { email: string; events?: string },
): { subject: string; text: string } {
  if (kind === "waitlist") {
    return {
      subject: "New waitlist signup",
      text: `New waitlist signup\n\nEmail: ${fields.email}`,
    };
  }

  return {
    subject: "New use case interest",
    text: `New use case interest\n\nEmail: ${fields.email}\n\nEvents:\n${fields.events ?? ""}`,
  };
}

export async function sendFormNotification(
  kind: FormNotificationKind,
  fields: { email: string; events?: string },
): Promise<boolean> {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL ?? "hello@usedance.com";

  if (!resend || !from) {
    console.error("[resend] Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
    return false;
  }

  const { subject, text } = getNotificationContent(kind, fields);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
    });

    if (error) {
      console.error(`[resend] Failed to send ${kind} notification`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[resend] Error sending ${kind} notification`, error);
    return false;
  }
}
