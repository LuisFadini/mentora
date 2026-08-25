import { eq } from "drizzle-orm";

import type {
  Answer,
  Question,
} from "../../../../modules/questions/question.types.ts";
import type {
  IAnswerRepository,
  IRepository,
  PersistedAnswer,
} from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { questionsTable } from "../schema.ts";

type DbQuestion = typeof questionsTable.$inferSelect;
export type PersistedQuestion = Question & { id: string };

export class QuestionRepository implements IRepository<
  Question,
  PersistedQuestion
> {
  constructor(
    private db: DB,
    private answersRepository: IAnswerRepository,
  ) {}

  private toDomainQuestion(
    question: DbQuestion,
    answers: Answer[],
  ): PersistedQuestion {
    return {
      id: question.id,
      title: question.title,
      subjects: question.subjects,
      source: question.source,
      content: question.content,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      answers,
    };
  }

  async findAll(): Promise<PersistedQuestion[]> {
    const [questions, answers] = await Promise.all([
      this.db.select().from(questionsTable),
      this.answersRepository.findAll(),
    ]);

    const answersByQuestion = new Map<string, Answer[]>();

    for (const answer of answers) {
      const list = answersByQuestion.get(answer.questionId) ?? [];
      list.push(answer);
      answersByQuestion.set(answer.questionId, list);
    }

    return questions.map((question) =>
      this.toDomainQuestion(question, answersByQuestion.get(question.id) ?? []),
    );
  }

  async findById(id: string): Promise<PersistedQuestion | null> {
    const [question] = await this.db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, id));

    if (!question) {
      return null;
    }

    const answers = await this.answersRepository.findByQuestionId(question.id);

    return this.toDomainQuestion(question, answers);
  }

  async create(
    entity: Question & { updatedAt?: Date; createdAt?: Date },
  ): Promise<PersistedQuestion> {
    const [question] = await this.db
      .insert(questionsTable)
      .values({
        title: entity.title,
        subjects: entity.subjects,
        source: entity.source,
        content: entity.content,
      })
      .returning();

    if (!question) {
      throw new Error("Insert failed.");
    }

    const answers = await this.answersRepository.createMany(
      question.id,
      entity.answers,
    );

    return this.toDomainQuestion(question, answers);
  }

  async update(entity: PersistedQuestion): Promise<PersistedQuestion> {
    const [question] = await this.db
      .update(questionsTable)
      .set({
        title: entity.title,
        subjects: entity.subjects,
        source: entity.source,
        content: entity.content,
        updatedAt: new Date(),
      })
      .where(eq(questionsTable.id, entity.id))
      .returning();

    if (!question) {
      throw new Error(`Question not found: ${entity.id}`);
    }

    const existingAnswers = await this.answersRepository.findByQuestionId(
      entity.id,
    );

    const incomingIds = new Set(
      entity.answers
        .map((answer) => answer.id)
        .filter((id): id is string => id !== undefined),
    );

    await Promise.all(
      existingAnswers
        .filter((answer) => !incomingIds.has(answer.id))
        .map((answer) => this.answersRepository.delete(answer.id)),
    );

    const updatedAnswers = await Promise.all(
      entity.answers.map((answer) =>
        answer.id
          ? this.answersRepository.update(answer as PersistedAnswer)
          : this.answersRepository.create({
              ...answer,
              questionId: entity.id,
            }),
      ),
    );

    return this.toDomainQuestion(question, updatedAnswers);
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(questionsTable)
      .where(eq(questionsTable.id, id))
      .returning({ id: questionsTable.id });

    return rows.length > 0;
  }
}
