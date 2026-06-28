import { sql } from "drizzle-orm";
import { check, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as uuidv7 } from "uuid";

export const users = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),

    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),
  },
  (table) => [
    check("name_min_length", sql`length(${table.name}) >= 4`),
    check("password_min_length", sql`length(${table.password}) >= 8`),
  ],
);
