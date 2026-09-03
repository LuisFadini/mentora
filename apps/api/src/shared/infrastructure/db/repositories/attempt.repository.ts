import { eq } from "drizzle-orm";

import type { Attempt } from "../../../../modules/attempts/attempt.types.ts";
import type {
  IAttemptRepository,
  PersistedAttempt,
} from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { questionAttemptTable } from "../schema.ts";

export class AttemptRepository implements IAttemptRepository {
  constructor(private db: DB) {}

  async findAll(): Promise<PersistedAttempt[]> {
    return await this.db.select().from(questionAttemptTable);
  }

  async findById(id: string): Promise<PersistedAttempt | null> {
    const [row] = await this.db
      .select()
      .from(questionAttemptTable)
      .where(eq(questionAttemptTable.id, id))
      .limit(1);

    return row ?? null;
  }

  async findByUserId(userId: string): Promise<PersistedAttempt[]> {
    return await this.db
      .select()
      .from(questionAttemptTable)
      .where(eq(questionAttemptTable.userId, userId));
  }

  async create(entity: Attempt): Promise<PersistedAttempt> {
    const [row] = await this.db
      .insert(questionAttemptTable)
      .values(entity)
      .returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return row;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(questionAttemptTable)
      .where(eq(questionAttemptTable.id, id))
      .returning({ id: questionAttemptTable.id });

    return rows.length > 0;
  }
}
