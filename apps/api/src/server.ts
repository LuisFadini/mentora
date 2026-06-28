import type { Server } from "node:http";

import type { Express } from "express";
import type { Logger } from "pino";

import type { DB } from "./shared/infrastructure/db/index.ts";

export function startServer(
  app: Express,
  db: DB,
  port: number,
  logger: Logger,
): Server {
  const server = app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`${signal} received`);

    server.close(() => {
      logger.info("Server closed");

      db.$client.close();
      logger.info("Database connection closed");
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  return server;
}
