import { durationToMs } from "@mentora/utils";

export enum NodeEnvironment {
  Development = "development",
  Testing = "testing",
  Staging = "staging",
  Production = "production",
}

export interface Config {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  DATABASE_URL: string;
  SESSION_DURATION: number;
  SESSION_REFRESH_INTERVAL: number;
  isDevelopment: boolean;
  isTest: boolean;
}

function parseNodeEnvironment(value?: string): NodeEnvironment {
  if (!value) return NodeEnvironment.Production;

  const normalized = value.toLowerCase();

  if (Object.values(NodeEnvironment).includes(normalized as NodeEnvironment)) {
    return normalized as NodeEnvironment;
  }
  if (normalized === "test") return NodeEnvironment.Testing;

  throw new Error(
    `Invalid NODE_ENV "${value}". Must be one of: ${Object.values(NodeEnvironment).join(", ")}`,
  );
}

function parsePort(value?: string): number {
  if (!value) return 3000;

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error(
      `Invalid PORT "${value}". Must be an integer between 1 and 65535.`,
    );
  }

  return port;
}

function parseDatabaseURL(value?: string): string {
  const url = value ?? "file:../../data/db.sqlite";

  if (!url.startsWith("file:")) {
    throw new Error(
      "Invalid database connection string. Must start with 'file:'.",
    );
  }

  if (url === "file:") {
    throw new Error(
      "Invalid database connection string. Missing SQLite database path.",
    );
  }

  return url;
}

function parseDuration(value: string = "24h"): number {
  const duration = durationToMs(value);

  if (duration <= 0) {
    throw new Error("Session duration must be greater than 0s");
  }

  return duration;
}

export function loadConfig(): Config {
  const NODE_ENV = parseNodeEnvironment(process.env["NODE_ENV"]);

  return {
    NODE_ENV,
    PORT: parsePort(process.env["PORT"]),
    DATABASE_URL: parseDatabaseURL(process.env["DATABASE_URL"]),
    SESSION_DURATION: parseDuration(process.env["SESSION_DURATION"]),
    SESSION_REFRESH_INTERVAL: parseDuration(
      process.env["SESSION_REFRESH_INTERVAL"],
    ),
    isDevelopment: NODE_ENV === NodeEnvironment.Development,
    isTest: NODE_ENV === NodeEnvironment.Testing,
  };
}

export const config: Config = loadConfig();
