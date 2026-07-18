import crypto from "node:crypto";

import type { Permission } from "@mentora/permissions";
import { sql } from "drizzle-orm";
import {
  check,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const usersTable = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    permissions: text("permission", { mode: "json" }).$type<Permission[]>(),
  },
  (table) => [
    check("name_min_length", sql`length(${table.name}) >= 4`),
    check("password_min_length", sql`length(${table.password}) >= 8`),
  ],
);

export const sessionsTable = sqliteTable("sessions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomBytes(32).toString("base64url")),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const questionsTable = sqliteTable("questions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  title: text("title").notNull(),
  subjects: text("subjects", { mode: "json" }).$type<string[]>().notNull(),
  source: text("source").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const answersTable = sqliteTable("answers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  questionId: text("question_id")
    .notNull()
    .references(() => questionsTable.id, {
      onDelete: "cascade",
    }),
  correct: integer("correct", { mode: "boolean" }).notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const questionTipsTable = sqliteTable(
  "question_tips",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    questionId: text("question_id")
      .notNull()
      .references(() => questionsTable.id, {
        onDelete: "cascade",
      }),
    order: integer("order").notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("tips_question_order_unique").on(table.questionId, table.order),
  ],
);
