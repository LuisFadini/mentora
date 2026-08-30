import { and, eq, ne } from "drizzle-orm";

import type { Session } from "../../../../modules/auth/auth.types.ts";
import type { ISessionRepository } from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { sessionsTable } from "../schema.ts";

type DbSession = typeof sessionsTable.$inferSelect;

export class SessionRepository implements ISessionRepository {
  constructor(private db: DB) {}

  private toDomainSession(dbSession: DbSession): Session {
    return {
      id: dbSession.id,
      userId: dbSession.userId,
      createdAt: dbSession.createdAt,
      lastSeenAt: dbSession.lastSeenAt,
    };
  }

  async findAll(): Promise<Session[]> {
    const rows = await this.db.select().from(sessionsTable);
    return rows.map((r) => this.toDomainSession(r));
  }

  async findById(id: string): Promise<Session | null> {
    const rows = await this.db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .limit(1);

    return rows[0] ? this.toDomainSession(rows[0]) : null;
  }

  async create(entity: Session): Promise<Session> {
    const [row] = await this.db
      .insert(sessionsTable)
      .values(entity)
      .returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return this.toDomainSession(row);
  }

  async touch(id: string, lastSeenAt: Date): Promise<void> {
    await this.db
      .update(sessionsTable)
      .set({ lastSeenAt })
      .where(eq(sessionsTable.id, id));
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(sessionsTable)
      .where(eq(sessionsTable.id, id))
      .returning({ id: sessionsTable.id });

    return rows.length > 0;
  }

  async deleteOtherSessions(
    userId: string,
    currentSessionId: string,
  ): Promise<number> {
    const rows = await this.db
      .delete(sessionsTable)
      .where(
        and(
          eq(sessionsTable.userId, userId),
          ne(sessionsTable.id, currentSessionId),
        ),
      )
      .returning({ id: sessionsTable.id });

    return rows.length;
  }
}
