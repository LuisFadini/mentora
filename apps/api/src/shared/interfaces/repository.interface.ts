import type { Attempt } from "../../modules/attempts/attempt.types.ts";
import type { Session } from "../../modules/auth/auth.types.ts";
import type {
  Answer,
  QuestionTip,
} from "../../modules/questions/question.types.ts";
import type { User } from "../../modules/users/user.types.ts";

export interface IRepository<TCreate, TPersisted = TCreate> {
  findAll(): Promise<TPersisted[]>;
  findById(id: string): Promise<TPersisted | null>;
  create(entity: TCreate): Promise<TPersisted>;
  update(entity: TPersisted): Promise<TPersisted>;
  delete(id: string): Promise<boolean>;
}

export type PersistedUser = User & { id: string };
export interface IUserRepository extends IRepository<User, PersistedUser> {
  findByEmail(email: string): Promise<User | null>;
}

export interface ISessionRepository extends Omit<
  IRepository<Session>,
  "update"
> {
  touch(id: string, lastSeenAt: Date): Promise<void>;
  deleteOtherSessions(
    userId: string,
    currentSessionId: string,
  ): Promise<number>;
}

export type PersistedAnswer = Answer & { id: string; questionId: string };
export interface IAnswerRepository extends IRepository<
  Answer,
  PersistedAnswer
> {
  findByQuestionId(questionId: string): Promise<PersistedAnswer[]>;
  createMany(questionId: string, answers: Answer[]): Promise<PersistedAnswer[]>;
}

export type PersistedQuestionTip = QuestionTip & {
  id: string;
  questionId: string;
};

export interface IQuestionTipsRepository extends IRepository<
  QuestionTip,
  PersistedQuestionTip
> {
  findByQuestionId(questionId: string): Promise<PersistedQuestionTip[]>;
  findByOrder(
    questionId: string,
    order: number,
  ): Promise<PersistedQuestionTip | null>;
  createMany(
    questionId: string,
    questionTips: QuestionTip[],
  ): Promise<PersistedQuestionTip[]>;
}

export type PersistedAttempt = Attempt & { id: string };

export type IAttemptRepository = Omit<
  IRepository<Attempt, PersistedAttempt>,
  "update"
>;
