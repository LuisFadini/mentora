import { DatabaseSync } from "node:sqlite";

import { drizzle } from "drizzle-orm/node-sqlite";
import type { Logger } from "pino";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApp } from "../app.ts";
import { startServer } from "../server.ts";
import type { DB } from "../shared/infrastructure/db/index.ts";

function createMockLogger(): Logger {
  return {
    info: vi.fn(),
    error: vi.fn(),
  } as unknown as Logger;
}

function createMockDB(): DB {
  const sqlite = new DatabaseSync(":memory:");

  return drizzle({
    client: sqlite,
  }) as DB;
}

describe("startServer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("logs when server starts", async () => {
    const db = createMockDB();
    const app = createApp(db);
    const logger = createMockLogger();

    const server = startServer(app, db, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Server listening"),
    );

    server.close();
  });

  it("handles SIGTERM signal", async () => {
    const db = createMockDB();
    const app = createApp(db);
    const logger = createMockLogger();

    const server = startServer(app, db, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    process.emit("SIGTERM");

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("SIGTERM"),
    );

    server.close();
  });

  it("handles SIGINT signal", async () => {
    const db = createMockDB();
    const app = createApp(db);
    const logger = createMockLogger();

    const server = startServer(app, db, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    process.emit("SIGINT");

    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("SIGINT"));

    server.close();
  });
});
