import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import { omit } from "../../shared/utils/omit.ts";
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

  async createUser(data: User) {
    const hashedPassword = await this.passwordHasher.hash(data.password);

    const createdUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return omit(createdUser, ["password"]);
  }

  async updateUser(id: string, user: Partial<User>) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) return null;
    const updatedUser = await this.userRepository.update({
      ...existingUser,
      ...user,
      id: existingUser.id!,
    });

    return omit(updatedUser, ["password"]);
  }
}
