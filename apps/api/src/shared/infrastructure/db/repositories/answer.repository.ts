import { eq } from "drizzle-orm";

import type { Answer } from "../../../../modules/questions/question.types.ts";
import type {
  IAnswerRepository,
  PersistedAnswer,
} from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { answersTable } from "../schema.ts";

type DbAnswer = typeof answersTable.$inferSelect;

export class AnswerRepository implements IAnswerRepository {
  constructor(private db: DB) {}

  private toDomainAnswer(dbAnswer: DbAnswer): PersistedAnswer {
    return {
      id: dbAnswer.id,
      questionId: dbAnswer.questionId,
      correct: dbAnswer.correct,
      content: dbAnswer.content,
      createdAt: dbAnswer.createdAt,
      updatedAt: dbAnswer.updatedAt,
    };
  }

  async findAll(): Promise<PersistedAnswer[]> {
    const rows = await this.db.select().from(answersTable);
    return rows.map((row) => this.toDomainAnswer(row));
  }

  async findById(id: string): Promise<PersistedAnswer | null> {
    const [row] = await this.db
      .select()
      .from(answersTable)
      .where(eq(answersTable.id, id))
      .limit(1);

    return row ? this.toDomainAnswer(row) : null;
  }

  async findByQuestionId(questionId: string): Promise<PersistedAnswer[]> {
    const rows = await this.db
      .select()
      .from(answersTable)
      .where(eq(answersTable.questionId, questionId));

    return rows.map((row) => this.toDomainAnswer(row));
  }

  async create(entity: Answer): Promise<PersistedAnswer> {
    if (!entity.questionId) {
      throw new Error("Insert failed: questionId should be specified");
    }

    const [row] = await this.db
      .insert(answersTable)
      .values({
        questionId: entity.questionId,
        correct: entity.correct,
        content: entity.content,
      })
      .returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return this.toDomainAnswer(row);
  }

  async createMany(
    questionId: string,
    answers: Omit<Answer, "id" | "questionId" | "createdAt" | "updatedAt">[],
  ): Promise<PersistedAnswer[]> {
    if (answers.length === 0) {
      return [];
    }

    const rows = await this.db
      .insert(answersTable)
      .values(
        answers.map((answer) => ({
          questionId,
          correct: answer.correct,
          content: answer.content,
        })),
      )
      .returning();

    return rows.map((row) => this.toDomainAnswer(row));
  }

  async update(entity: PersistedAnswer): Promise<PersistedAnswer> {
    const [row] = await this.db
      .update(answersTable)
      .set({
        questionId: entity.questionId,
        correct: entity.correct,
        content: entity.content,
        updatedAt: new Date(),
      })
      .where(eq(answersTable.id, entity.id))
      .returning();

    if (!row) {
      throw new Error(`Answer not found: ${entity.id}`);
    }

    return this.toDomainAnswer(row);
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(answersTable)
      .where(eq(answersTable.id, id))
      .returning({ id: answersTable.id });

    return rows.length > 0;
  }
}
