import { type IRepository } from "../../shared/interfaces/repository.interface.ts";
import { type User } from "./user.types.ts";

export class UsersService {
  constructor(private readonly userRepository: IRepository<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async createUser(user: User) {
    return this.userRepository.create(user);
  }

  async updateUser(id: string, user: Partial<User>) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) return null;

    return this.userRepository.update({
      ...existingUser,
      ...user,
      id: existingUser.id!,
    });
  }
}
