import { describe, expect, it } from "vitest";
import { runSimulatedRequest, tokenizeJson } from "./api-console";

const AUTH_HEADERS = JSON.stringify({ Authorization: "Bearer sim-token" });

describe("api-console simulator", () => {
  it("returns 400 when headers or body contain invalid JSON", () => {
    const badHeaders = runSimulatedRequest("GET", "/api/v1/users", "{bad", "");
    expect(badHeaders.status).toBe(400);
    expect(badHeaders.body).toMatchObject({ error: "invalid_json", field: "headers" });

    const badBody = runSimulatedRequest("POST", "/api/v1/users", AUTH_HEADERS, "{bad");
    expect(badBody.status).toBe(400);
    expect(badBody.body).toMatchObject({ error: "invalid_json", field: "body" });
  });

  it("returns 401 when write operations omit Authorization header", () => {
    const res = runSimulatedRequest("POST", "/api/v1/users", "{}", '{"name":"QA"}');
    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({ error: "missing_token" });
  });

  it("accepts lowercase authorization header", () => {
    const res = runSimulatedRequest(
      "POST",
      "/api/v1/users",
      JSON.stringify({ authorization: "Bearer lower" }),
      JSON.stringify({ name: "QA" })
    );
    expect(res.status).toBe(201);
  });

  it("returns 422 when POST or PUT is called with an empty body", () => {
    const postRes = runSimulatedRequest("POST", "/api/v1/orders", AUTH_HEADERS, "   ");
    expect(postRes.status).toBe(422);
    expect(postRes.body).toMatchObject({ error: "empty_body" });

    const putRes = runSimulatedRequest("PUT", "/api/v1/users/42", AUTH_HEADERS, "");
    expect(putRes.status).toBe(422);
    expect(putRes.body).toMatchObject({ error: "empty_body" });
  });

  it("returns 204 No Content on authorized DELETE", () => {
    const res = runSimulatedRequest("DELETE", "/api/v1/users/42", AUTH_HEADERS, "");
    expect(res.status).toBe(204);
    expect(res.statusText).toBe("No Content");
    expect(res.body).toBeNull();
  });

  it("handles /api/v1/auth/login invalid credentials and success", () => {
    const fail = runSimulatedRequest("POST", "/api/v1/auth/login", "{}", JSON.stringify({ email: "a@b.com" }));
    expect(fail.status).toBe(401);
    expect(fail.body).toMatchObject({ error: "invalid_credentials" });

    const ok = runSimulatedRequest(
      "POST",
      "/api/v1/auth/login",
      "{}",
      JSON.stringify({ email: "jane@example.com", password: "secret" })
    );
    expect(ok.status).toBe(200);
    expect(ok.body).toMatchObject({
      expiresIn: 3600,
      user: { id: 42, email: "jane@example.com" },
    });
  });

  it("returns 200 for GET collection and single resource", () => {
    const list = runSimulatedRequest("GET", "/api/v1/users", "{}", "");
    expect(list.status).toBe(200);
    expect(list.body).toMatchObject({ meta: { total: 2 } });

    const single = runSimulatedRequest("GET", "/api/v1/users/42", "{}", "");
    expect(single.status).toBe(200);
    expect(single.body).toMatchObject({ id: 42 });
  });

  it("returns 200 on authorized PUT with updatedAt", () => {
    const res = runSimulatedRequest(
      "PUT",
      "/api/v1/users/42",
      AUTH_HEADERS,
      JSON.stringify({ name: "Updated" })
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 42, name: "Updated" });
  });

  it("tokenizes JSON into key, string, number, bool, null, and punct kinds", () => {
    const tokens = tokenizeJson('{"ok": true, "count": 3, "name": "qa", "extra": null}');
    const kinds = new Set(tokens.map((t) => t.kind));
    expect(kinds).toEqual(new Set(["key", "string", "number", "bool", "null", "punct"]));
  });
});
