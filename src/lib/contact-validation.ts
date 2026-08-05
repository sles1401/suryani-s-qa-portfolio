import { z } from "zod";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
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
  | { status: "ok" }
  | { status: "invalid"; fieldErrors: FieldErrors; formError: string };

/**
 * Submission layer. Re-validates the payload independently of the form state
 * before performing the send, and returns structured errors the UI renders.
 */
export const submitContactMessage = async (
  values: ContactFormValues,
  t: Translate
): Promise<SubmitResult> => {
  const verdict = validateContact(values, t);
  if (!verdict.ok) {
    return {
      status: "invalid",
      fieldErrors: verdict.fieldErrors,
      formError: t(
        "Pesan tidak dapat dikirim. Periksa kembali kolom yang ditandai.",
        "We couldn't send your message. Please review the highlighted fields."
      ),
    };
  }

  // Simulated network round-trip for the send.
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { status: "ok" };
};
