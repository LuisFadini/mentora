import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import type { EmptyRelations } from "drizzle-orm";
import type { NodeSQLiteDatabase } from "drizzle-orm/node-sqlite";
import { drizzle } from "drizzle-orm/node-sqlite";
import { migrate } from "drizzle-orm/node-sqlite/migrator";
import type { Logger } from "pino";

export type DB = NodeSQLiteDatabase<Record<string, never>, EmptyRelations> & {
  $client: DatabaseSync;
};

export function initDatabase(url: string, logger: Logger): DB {
  const dbPath = url.startsWith("file:")
    ? path.resolve(process.cwd(), url.slice(5))
    : path.resolve(process.cwd(), url);

  const fullPath = path.resolve(process.cwd(), dbPath);

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  const sqlite = new DatabaseSync(fullPath);
  logger.info("SQLite database connected");

  const db = drizzle({ client: sqlite });

  logger.info("Running database migrations");
  migrate(db, { migrationsFolder: "./drizzle" });

  logger.info("Database migrations completed");
  return db;
}
