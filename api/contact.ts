export const config = { runtime: "edge" };

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_ORIGINS = new Set([
  "https://suryani-lestari.my.id",
  "https://www.suryani-lestari.my.id",
  "https://suryani-s-qa-portfolio.vercel.app",
]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "method_not_allowed" }, 405);
  }

  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, error: "forbidden_origin" }, 403);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: accept silently so bots cannot tell they were filtered.
  if (payload.company?.trim()) {
    return json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = (payload.subject?.trim() ?? "").replace(/[\r\n]+/g, " ");
  const message = payload.message?.trim() ?? "";

  if (
    name.length < 2 ||
    name.length > 100 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 255 ||
    subject.length > 200 ||
    message.length < 10 ||
    message.length > 2000
  ) {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return json({ ok: false, error: "email_not_configured" }, 503);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: subject ? `[Portfolio] ${subject}` : "[Portfolio] New message from your website",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: true });
}
