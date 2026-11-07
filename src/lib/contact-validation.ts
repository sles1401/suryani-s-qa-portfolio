import { z } from "zod";
import { EMAIL } from "@/lib/links";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot field: real visitors never see or fill it. */
  company?: string;
};

export type Translate = (id: string, en: string) => string;

/**
 * Single source of truth for contact-form rules. The same schema is used by the
 * UI layer (field-level errors while typing/submitting) and by the submission
 * layer in `submitContactMessage` so an invalid payload can never be "sent"
 * even if the UI checks are bypassed.
 */
export const buildContactSchema = (t: Translate) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, t("Nama minimal 2 karakter", "Name must be at least 2 characters"))
      .max(100, t("Nama terlalu panjang", "Name is too long")),
    email: z
      .string()
      .trim()
      .email(t("Alamat email tidak valid", "Invalid email address"))
      .max(255, t("Email terlalu panjang", "Email is too long")),
    subject: z
      .string()
      .trim()
      .max(200, t("Subjek terlalu panjang", "Subject is too long"))
      .optional()
      .or(z.literal("")),
    message: z
      .string()
      .trim()
      .min(10, t("Pesan minimal 10 karakter", "Message must be at least 10 characters"))
      .max(2000, t("Pesan terlalu panjang", "Message is too long")),
  });

export type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export const validateContact = (
  values: ContactFormValues,
  t: Translate
): { ok: true } | { ok: false; fieldErrors: FieldErrors } => {
  const result = buildContactSchema(t).safeParse(values);
  if (result.success) return { ok: true };

  const fieldErrors: FieldErrors = {};
  for (const issue of result.error.errors) {
    const key = issue.path[0] as keyof ContactFormValues | undefined;
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors };
};

export type SubmitResult =
  | { status: "ok"; delivery: "email" | "mailto" }
  | { status: "invalid"; fieldErrors: FieldErrors; formError: string };

// Primary delivery: same-origin serverless function (no email address in the
// client bundle). FormSubmit stays as a fallback when the function is not
// configured or unavailable.
const API_ENDPOINT = "/api/contact";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
const REQUEST_TIMEOUT_MS = 8000;

const postJson = async (url: string, body: unknown) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const buildMailto = (values: ContactFormValues) => {
  const subject = values.subject?.trim() || "Portfolio contact";
  const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Submission layer. Re-validates the payload independently of the form state
 * before performing the send, and returns structured errors the UI renders.
 * The message is delivered to the professional inbox; if the delivery service
 * is unreachable the user's mail client is opened as a fallback.
 */
export const submitContactMessage = async (
  values: ContactFormValues,
  t: Translate
): Promise<SubmitResult> => {
  const verdict = validateContact(values, t);
  if (verdict.ok === false) {
    return {
      status: "invalid",
      fieldErrors: verdict.fieldErrors,
      formError: t(
        "Pesan tidak dapat dikirim. Periksa kembali kolom yang ditandai.",
        "We couldn't send your message. Please review the highlighted fields."
      ),
    };
  }

  // Honeypot hit: report success so automated senders do not retry.
  if (values.company?.trim()) {
    return { status: "ok", delivery: "email" };
  }

  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject?.trim() ?? "",
    message: values.message.trim(),
  };

  try {
    const response = await postJson(API_ENDPOINT, payload);
    if (response.ok) {
      const data = (await response.json()) as { ok?: boolean };
      if (data.ok === true) return { status: "ok", delivery: "email" };
    }
  } catch {
    // Function missing, offline, or timed out: try the fallback below.
  }

  try {
    const response = await postJson(FORM_ENDPOINT, {
      ...payload,
      _subject: payload.subject
        ? `[Portfolio] ${payload.subject}`
        : "[Portfolio] New message from your website",
      _replyto: payload.email,
      _template: "table",
      _honey: "",
    });
    if (!response.ok) throw new Error(`Delivery failed with status ${response.status}`);
    return { status: "ok", delivery: "email" };
  } catch {
    // Everything is unavailable: hand the message to the visitor's mail client.
    if (typeof window !== "undefined") {
      window.location.href = buildMailto(values);
    }
    return { status: "ok", delivery: "mailto" };
  }
};

