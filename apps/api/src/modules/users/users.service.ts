import { omit, removeUndefined } from "@mentora/utils";

import { ConflictError } from "../../shared/errors/conflict.error.ts";
import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import { type IUserRepository } from "../../shared/interfaces/repository.interface.ts";
import { type User } from "./user.types.ts";

export class UsersService {
  constructor(
    private readonly userRepository: IUserRepository,
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
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already in use");
    }

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

    if (cleanData.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        cleanData.email,
      );

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictError("Email already in use");
      }
    }

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
