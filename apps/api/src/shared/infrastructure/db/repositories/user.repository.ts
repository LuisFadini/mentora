import { eq } from "drizzle-orm";

import type { User } from "../../../../modules/users/user.types.ts";
import type { IUserRepository } from "../../../interfaces/repository.interface.ts";
import type { DB } from "../index.ts";
import { usersTable } from "../schema.ts";

type DbUser = typeof usersTable.$inferSelect;

export class UserRepository implements IUserRepository {
  constructor(private db: DB) {}

  private toDomainUser(dbUser: DbUser): User {
    return {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      password: dbUser.password,
      avatarUrl: dbUser.avatarUrl ?? undefined,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
      permissions: dbUser.permissions ?? [],
    };
  }

  async findAll(): Promise<User[]> {
    const rows = await this.db.select().from(usersTable);
    return rows.map((r) => this.toDomainUser(r));
  }

  async findById(id: string): Promise<User | null> {
    const rows = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return rows[0] ? this.toDomainUser(rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const rows = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return rows[0] ? this.toDomainUser(rows[0]) : null;
  }

  async create(entity: User): Promise<User> {
    const [row] = await this.db.insert(usersTable).values(entity).returning();

    if (!row) {
      throw new Error("Insert failed: no row returned");
    }

    return this.toDomainUser(row);
  }

  async update(entity: User): Promise<User> {
    if (!entity.id) {
      throw new Error("User id is required for update");
    }

    const rows = await this.db
      .update(usersTable)
      .set({
        name: entity.name,
        email: entity.email,
        password: entity.password,
        avatarUrl: entity.avatarUrl,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, entity.id))
      .returning();

    if (!rows[0]) {
      throw new Error("User not found");
    }

    return this.toDomainUser(rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const rows = await this.db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    return rows.length > 0;
  }
}
