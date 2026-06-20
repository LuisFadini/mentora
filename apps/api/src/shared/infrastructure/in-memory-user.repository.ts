import { type User } from "../../modules/users/user.types.ts";
import { type IUserRepository } from "../interfaces/repository.interface.ts";
import { InMemoryRepository } from "./in-memory.repository.ts";

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements IUserRepository
{
  async findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(
      this.items.find((item) => item.email === email) || null,
    );
  }
}
