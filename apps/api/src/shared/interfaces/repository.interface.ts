import type { Answer } from "../../modules/questions/question.types.ts";
import type { User } from "../../modules/users/user.types.ts";

export interface IRepository<TCreate, TPersisted = TCreate> {
  findAll(): Promise<TPersisted[]>;
  findById(id: string): Promise<TPersisted | null>;
  create(entity: TCreate): Promise<TPersisted>;
  update(entity: TPersisted): Promise<TPersisted>;
  delete(id: string): Promise<boolean>;
}

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}

export type PersistedAnswer = Answer & { id: string; questionId: string };
export interface IAnswerRepository extends IRepository<
  Answer,
  PersistedAnswer
> {
  findByQuestionId(questionId: string): Promise<PersistedAnswer[]>;
  createMany(questionId: string, answers: Answer[]): Promise<PersistedAnswer[]>;
}
