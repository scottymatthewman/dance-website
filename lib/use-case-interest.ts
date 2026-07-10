const DEVICE_ID_KEY = "dance:device-id:v1";
const SUBMISSION_COUNT_KEY = "dance:use-case-submissions:v1";

export const MAX_USE_CASE_SUBMISSIONS = 3;

export function getDeviceId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function getUseCaseSubmissionCount(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const raw = localStorage.getItem(SUBMISSION_COUNT_KEY);
    const count = raw ? Number.parseInt(raw, 10) : 0;
    return Number.isFinite(count) ? count : 0;
  } catch {
    return 0;
  }
}

export function canSubmitUseCaseInterest(): boolean {
  return getUseCaseSubmissionCount() < MAX_USE_CASE_SUBMISSIONS;
}

export function recordUseCaseSubmission(): number {
  const nextCount = getUseCaseSubmissionCount() + 1;

  try {
    localStorage.setItem(SUBMISSION_COUNT_KEY, String(nextCount));
  } catch {
    // Ignore storage failures; server-side limits still apply.
  }

  return nextCount;
}
