import { DatabaseSync } from "node:sqlite";

import { drizzle } from "drizzle-orm/node-sqlite";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../app.js";
import type { DB } from "../shared/infrastructure/db/index.ts";

function createMockDB(): DB {
  const sqlite = new DatabaseSync(":memory:");

  return drizzle({
    client: sqlite,
  }) as DB;
}

describe("app", () => {
  it("GET / returns Hello world", async () => {
    const db = createMockDB();
    const app = createApp(db);

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world");
  });
});
