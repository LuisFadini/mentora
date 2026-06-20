import { omit, removeUndefined } from "@mentora/utils";

import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import { type User } from "./user.types.ts";

export class UsersService {
  constructor(
    private readonly userRepository: IRepository<User>,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users.map((user) => omit(user, ["password"]));
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return omit(user, ["password"]);
  }

  async createUser(data: Omit<User, "createdAt" | "updatedAt">) {
    const hashedPassword = await this.passwordHasher.hash(data.password);
    const now = new Date();

    const createdUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });
    return omit(createdUser, ["password"]);
  }

  async updateUser(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) return null;

    const cleanData = removeUndefined(data);

    if (cleanData.password) {
      cleanData.password = await this.passwordHasher.hash(cleanData.password);
    }

    const updatedUser = await this.userRepository.update({
      ...existingUser,
      ...cleanData,
      updatedAt: new Date(),
    });

    return omit(updatedUser, ["password"]);
  }
}
