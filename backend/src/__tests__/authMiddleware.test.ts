import { strict as assert } from "node:assert";
import { describe, it, mock } from "node:test";
import request from "supertest";
import { createApp } from "../app.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { supabase } from "../config/supabase.js";

function createMockResponse() {
  return {
    statusCode: 200,
    jsonPayload: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.jsonPayload = payload;
      return this;
    },
  };
}

describe("Aurametric API authentication", () => {
  it("returns 401 when the Authorization header is missing", async () => {
    const app = createApp();
    const response = await request(app).get("/api/profile");

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  it("accepts a valid bearer token and attaches the authenticated user", async () => {
    const originalGetUser = supabase.auth.getUser;
    const getUserMock = mock.method(supabase.auth, "getUser", async () => ({
      data: {
        user: {
          id: "user-123",
          email: "student@example.com",
        },
      },
      error: null,
    }));

    const req = {
      headers: {
        authorization: "Bearer valid-token",
      },
    } as never;

    const res = createMockResponse();
    let nextCalled = false;

    await authMiddleware(req, res as never, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal((req as { userId?: string }).userId, "user-123");

    getUserMock.mock.restore();
    mock.method(supabase.auth, "getUser", originalGetUser);
  });

  it("exposes a healthy backend endpoint", async () => {
    const app = createApp();
    const response = await request(app).get("/api/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.status, "ok");
  });
});
