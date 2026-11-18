import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "./contact";

const VALID_ORIGIN = "https://suryani-lestari.my.id";

const validBody = {
  name: "Suryani QA",
  email: "suryani@example.com",
  subject: "QA Collaboration",
  message: "Hello, I would like to discuss a QA Engineer opportunity.",
};

const makeRequest = (
  body: unknown,
  options: { method?: string; origin?: string | null; rawBody?: string } = {}
) => {
  const method = options.method ?? "POST";
  const headers = new Headers({ "content-type": "application/json" });
  if (options.origin !== null) {
    headers.set("origin", options.origin ?? VALID_ORIGIN);
  }
  return new Request("https://suryani-lestari.my.id/api/contact", {
    method,
    headers,
    body: method === "GET" ? undefined : options.rawBody ?? JSON.stringify(body),
  });
};

describe("api/contact handler", () => {
  const originalEnv = { ...process.env };
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns 405 for non-POST methods", async () => {
    const res = await handler(makeRequest(null, { method: "GET" }));
    expect(res.status).toBe(405);
    expect(await res.json()).toEqual({ ok: false, error: "method_not_allowed" });
  });

  it("returns 403 for disallowed origins", async () => {
    const res = await handler(makeRequest(validBody, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ ok: false, error: "forbidden_origin" });
  });

  it("returns 400 when request body is invalid JSON", async () => {
    const res = await handler(makeRequest(null, { rawBody: "{invalid-json" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_json" });
  });

  it("accepts honeypot submissions silently with 200 without calling fetch", async () => {
    const res = await handler(makeRequest({ ...validBody, company: "Spam Corp" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("returns 400 invalid_payload for boundary violations", async () => {
    const invalidCases = [
      { ...validBody, name: "A" },
      { ...validBody, name: "A".repeat(101) },
      { ...validBody, email: "not-an-email" },
      { ...validBody, subject: "S".repeat(201) },
      { ...validBody, message: "Too short" },
      { ...validBody, message: "M".repeat(2001) },
    ];

    for (const payload of invalidCases) {
      const res = await handler(makeRequest(payload));
      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({ ok: false, error: "invalid_payload" });
    }
  });

  it("returns 503 when Resend environment variables are missing", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await handler(makeRequest(validBody));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "email_not_configured" });
  });

  it("returns 502 when Resend API responds with non-OK status", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "rate_limited" }), { status: 429 })
    );

    const res = await handler(makeRequest(validBody));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "delivery_failed" });
  });

  it("returns 200 and sanitizes subject newlines when Resend succeeds", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "email_123" }), { status: 200 })
    );

    const res = await handler(
      makeRequest({ ...validBody, subject: "Hello\r\nInjected" }, { origin: null })
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    const sentBody = JSON.parse((init as RequestInit).body as string);
    expect(sentBody.subject).toBe("[Portfolio] Hello Injected");
    expect(sentBody.reply_to).toBe(validBody.email);
  });
});
