import { and, asc, eq, gt, sql } from "drizzle-orm";

import type { QuestionTip } from "../../../../modules/questions/question.types.ts";
import type {
  IQuestionTipsRepository,
  PersistedQuestionTip,
} from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { questionTipsTable } from "../schema.ts";

type DbQuestionTip = typeof questionTipsTable.$inferSelect;

export class QuestionTipRepository implements IQuestionTipsRepository {
  constructor(private db: DB) {}

  private toDomainQuestionTip(
    dbQuestionTip: DbQuestionTip,
  ): PersistedQuestionTip {
    return {
      id: dbQuestionTip.id,
      questionId: dbQuestionTip.questionId,
      order: dbQuestionTip.order,
      content: dbQuestionTip.content,
      createdAt: dbQuestionTip.createdAt,
      updatedAt: dbQuestionTip.updatedAt,
    };
  }

  async findAll(): Promise<PersistedQuestionTip[]> {
    const rows = await this.db
      .select()
      .from(questionTipsTable)
      .orderBy(asc(questionTipsTable.questionId), asc(questionTipsTable.order));
    return rows.map((row) => this.toDomainQuestionTip(row));
  }

  async findById(id: string): Promise<PersistedQuestionTip | null> {
    const [row] = await this.db
      .select()
      .from(questionTipsTable)
      .where(eq(questionTipsTable.id, id))
      .limit(1);

    return row ? this.toDomainQuestionTip(row) : null;
  }

  async findByQuestionId(questionId: string): Promise<PersistedQuestionTip[]> {
    const rows = await this.db
      .select()
      .from(questionTipsTable)
      .where(eq(questionTipsTable.questionId, questionId))
      .orderBy(asc(questionTipsTable.order));

    return rows.map((row) => this.toDomainQuestionTip(row));
  }

  async findByOrder(
    questionId: string,
    order: number,
  ): Promise<PersistedQuestionTip | null> {
    const [row] = await this.db
      .select()
      .from(questionTipsTable)
      .where(
        and(
          eq(questionTipsTable.questionId, questionId),
          eq(questionTipsTable.order, order),
        ),
      )
      .limit(1);

    return row ? this.toDomainQuestionTip(row) : null;
  }

  async create(entity: QuestionTip): Promise<PersistedQuestionTip> {
    if (!entity.questionId) {
      throw new Error("Insert failed: questionId should be specified");
    }

    const [row] = await this.db
      .insert(questionTipsTable)
      .values({
        questionId: entity.questionId,
        order: entity.order,
        content: entity.content,
      })
      .returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return this.toDomainQuestionTip(row);
  }

  async createMany(
    questionId: string,
    questionTips: Omit<
      QuestionTip,
      "id" | "questionId" | "createdAt" | "updatedAt"
    >[],
  ): Promise<PersistedQuestionTip[]> {
    if (questionTips.length === 0) {
      return [];
    }

    const rows = await this.db
      .insert(questionTipsTable)
      .values(
        questionTips.map((entity) => ({
          questionId,
          order: entity.order,
          content: entity.content,
        })),
      )
      .returning();

    return rows.map((row) => this.toDomainQuestionTip(row));
  }

  async update(entity: PersistedQuestionTip): Promise<PersistedQuestionTip> {
    const [row] = await this.db
      .update(questionTipsTable)
      .set({
        questionId: entity.questionId,
        order: entity.order,
        content: entity.content,
        updatedAt: new Date(),
      })
      .where(eq(questionTipsTable.id, entity.id))
      .returning();

    if (!row) {
      throw new Error(`Question tip not found: ${entity.id}`);
    }

    return this.toDomainQuestionTip(row);
  }

  async delete(id: string): Promise<boolean> {
    const [tip] = await this.db
      .select()
      .from(questionTipsTable)
      .where(eq(questionTipsTable.id, id))
      .limit(1);

    if (!tip) {
      return false;
    }

    const deleted = await this.db
      .delete(questionTipsTable)
      .where(eq(questionTipsTable.id, id))
      .returning({ id: questionTipsTable.id });

    if (deleted.length === 0) {
      return false;
    }

    await this.db
      .update(questionTipsTable)
      .set({
        order: sql`${questionTipsTable.order} - 1`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(questionTipsTable.questionId, tip.questionId),
          gt(questionTipsTable.order, tip.order),
        ),
      );

    return true;
  }
}
