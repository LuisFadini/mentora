import "dotenv/config";
import "reflect-metadata";

import { createApp } from "./app.ts";
import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import { startServer } from "./server.ts";
import { initDatabase } from "./shared/infrastructure/db/index.ts";

const db = initDatabase(config.DATABASE_URL, logger);
const app = createApp(db);
startServer(app, db, config.PORT, logger);
