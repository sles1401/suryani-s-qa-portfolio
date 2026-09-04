// Simulated API layer used by the /api-console page. No network calls are made;
// responses are deterministic so the console can be asserted in tests.

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type SimEndpoint = {
  path: string;
  methods: HttpMethod[];
  label: string;
  sampleBody?: unknown;
};

export const ENDPOINTS: SimEndpoint[] = [
  { path: "/api/v1/users", methods: ["GET", "POST"], label: "Users collection", sampleBody: { name: "Jane QA", email: "jane.qa@example.com" } },
  { path: "/api/v1/users/42", methods: ["GET", "PUT", "DELETE"], label: "Single user", sampleBody: { name: "Jane QA Updated" } },
  { path: "/api/v1/orders", methods: ["GET", "POST"], label: "Orders collection", sampleBody: { productId: "SKU-100", qty: 2 } },
  { path: "/api/v1/auth/login", methods: ["POST"], label: "Login", sampleBody: { email: "jane.qa@example.com", password: "••••••••" } },
];

export type SimResponse = {
  status: number;
  statusText: string;
  durationMs: number;
  headers: Record<string, string>;
  body: unknown;
};

const now = () => new Date().toISOString();

export const runSimulatedRequest = (
  method: HttpMethod,
  path: string,
  headersRaw: string,
  bodyRaw: string
): SimResponse => {
  const headers: Record<string, string> = {
    "content-type": "application/json; charset=utf-8",
    "x-request-id": Math.random().toString(16).slice(2, 10),
    "x-simulated": "true",
  };
  const durationMs = 40 + Math.floor(Math.random() * 120);

  const parse = (raw: string, label: string) => {
    if (!raw.trim()) return { ok: true as const, value: undefined };
    try {
      return { ok: true as const, value: JSON.parse(raw) };
    } catch (e) {
      return { ok: false as const, label, message: (e as Error).message };
    }
  };

  const parsedHeaders = parse(headersRaw, "headers");
  const parsedBody = parse(bodyRaw, "body");

  if (!parsedHeaders.ok || !parsedBody.ok) {
    const bad = !parsedHeaders.ok ? parsedHeaders : parsedBody;
    return {
      status: 400,
      statusText: "Bad Request",
      durationMs,
      headers,
      body: {
        error: "invalid_json",
        field: bad.label,
        message: bad.message,
        hint: "Payload must be valid JSON.",
        timestamp: now(),
      },
    };
  }

  const custom = (parsedHeaders.value ?? {}) as Record<string, unknown>;
  const authorized =
    typeof custom["Authorization"] === "string" || typeof custom["authorization"] === "string";

  const needsAuth = method !== "GET" && path !== "/api/v1/auth/login";
  if (needsAuth && !authorized) {
    return {
      status: 401,
      statusText: "Unauthorized",
      durationMs,
      headers,
      body: {
        error: "missing_token",
        message: "Authorization header is required for write operations.",
        timestamp: now(),
      },
    };
  }

  if ((method === "POST" || method === "PUT") && parsedBody.value === undefined) {
    return {
      status: 422,
      statusText: "Unprocessable Entity",
      durationMs,
      headers,
      body: {
        error: "empty_body",
        message: `${method} ${path} requires a JSON body.`,
        timestamp: now(),
      },
    };
  }

  if (method === "DELETE") {
    return { status: 204, statusText: "No Content", durationMs, headers, body: null };
  }

  if (path === "/api/v1/auth/login") {
    const body = (parsedBody.value ?? {}) as Record<string, unknown>;
    if (!body.email || !body.password) {
      return {
        status: 401,
        statusText: "Unauthorized",
        durationMs,
        headers,
        body: { error: "invalid_credentials", message: "Email and password are required.", timestamp: now() },
      };
    }
    return {
      status: 200,
      statusText: "OK",
      durationMs,
      headers,
      body: {
        token: "sim.eyJhbGciOiJIUzI1NiJ9.simulated-token",
        expiresIn: 3600,
        user: { id: 42, email: body.email },
      },
    };
  }

  if (method === "GET" && path.endsWith("s")) {
    return {
      status: 200,
      statusText: "OK",
      durationMs,
      headers,
      body: {
        data: [
          { id: 1, name: "Alya Putri", status: "active" },
          { id: 2, name: "Budi Santoso", status: "pending" },
        ],
        meta: { page: 1, perPage: 20, total: 2 },
      },
    };
  }

  if (method === "GET") {
    return {
      status: 200,
      statusText: "OK",
      durationMs,
      headers,
      body: { id: 42, name: "Jane QA", email: "jane.qa@example.com", status: "active" },
    };
  }

  if (method === "POST") {
    return {
      status: 201,
      statusText: "Created",
      durationMs,
      headers,
      body: { id: 101, ...(parsedBody.value as object), createdAt: now() },
    };
  }

  return {
    status: 200,
    statusText: "OK",
    durationMs,
    headers,
    body: { id: 42, ...(parsedBody.value as object), updatedAt: now() },
  };
};

type Token = { text: string; kind: "key" | "string" | "number" | "bool" | "null" | "punct" };

/** Minimal JSON tokenizer for syntax highlighting (no external dependency). */
export const tokenizeJson = (json: string): Token[] => {
  const tokens: Token[] = [];
  const re = /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|(\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(\btrue\b|\bfalse\b)|(\bnull\b)|([\s\S])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(json))) {
    if (m[1]) tokens.push({ text: m[1], kind: "key" });
    else if (m[2]) tokens.push({ text: m[2], kind: "string" });
    else if (m[3]) tokens.push({ text: m[3], kind: "number" });
    else if (m[4]) tokens.push({ text: m[4], kind: "bool" });
    else if (m[5]) tokens.push({ text: m[5], kind: "null" });
    else tokens.push({ text: m[6], kind: "punct" });
  }
  return tokens;
};
