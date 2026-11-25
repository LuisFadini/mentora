import "dotenv/config";
import "reflect-metadata";

import { createApp } from "./app.ts";
import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import { startServer } from "./server.ts";
import { initDatabase } from "./shared/infrastructure/db/index.ts";
import { LocalFileStorage } from "./shared/infrastructure/storage/local-file-storage.ts";

const db = initDatabase(config.DATABASE_URL, logger);
const fileStorage = new LocalFileStorage(config.FILE_STORAGE);
const app = createApp(db, fileStorage);

startServer(app, db, config.PORT, logger);
