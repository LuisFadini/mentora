import { desc, eq } from "drizzle-orm";

import type { CreateAttempt } from "../../../../modules/attempts/attempt.types.ts";
import type { Question } from "../../../../modules/questions/question.types.ts";
import type {
  IAttemptRepository,
  IRepository,
  PersistedAttempt,
} from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { questionAttemptTable } from "../schema.ts";
import type { PersistedQuestion } from "./question.repository.ts";

export class AttemptRepository implements IAttemptRepository {
  constructor(
    private db: DB,
    private questionRepository: IRepository<Question, PersistedQuestion>,
  ) {}

  async findAll(): Promise<PersistedAttempt[]> {
    const rows = await this.db
      .select()
      .from(questionAttemptTable)
      .orderBy(desc(questionAttemptTable.createdAt));

    return Promise.all(rows.map((row) => this.hydrate(row)));
  }

  async findById(id: string): Promise<PersistedAttempt | null> {
    const [row] = await this.db
      .select()
      .from(questionAttemptTable)
      .where(eq(questionAttemptTable.id, id));

    if (!row) {
      return null;
    }

    return this.hydrate(row);
  }

  async findByUserId(userId: string): Promise<PersistedAttempt[]> {
    const rows = await this.db
      .select()
      .from(questionAttemptTable)
      .where(eq(questionAttemptTable.userId, userId))
      .orderBy(desc(questionAttemptTable.createdAt));

    return Promise.all(rows.map((row) => this.hydrate(row)));
  }

  async create(entity: CreateAttempt): Promise<PersistedAttempt> {
    const [row] = await this.db
      .insert(questionAttemptTable)
      .values(entity)
      .returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return (await this.findById(row.id))!;
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(questionAttemptTable)
      .where(eq(questionAttemptTable.id, id))
      .returning({ id: questionAttemptTable.id });

    return rows.length > 0;
  }

  private async hydrate(
    row: typeof questionAttemptTable.$inferSelect,
  ): Promise<PersistedAttempt> {
    const question = await this.questionRepository.findById(row.questionId);

    if (!question) {
      throw new Error(
        `Question ${row.questionId} not found for attempt ${row.id}`,
      );
    }

    const answer = question.answers.find(
      (answer) => answer.id === row.answerId,
    );

    if (!answer) {
      throw new Error(`Answer ${row.answerId} not found for attempt ${row.id}`);
    }

    return {
      id: row.id,
      userId: row.userId,
      question,
      answer,
      tipsUsed: row.tipsUsed,
      createdAt: row.createdAt,
    };
  }
}
