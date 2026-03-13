import { v7 as uuidv7 } from "uuid";

import type { IRepository } from "../interfaces/repository.interface.ts";

export class InMemoryRepository<
  T extends { id?: string },
> implements IRepository<T> {
  protected items: T[] = [];

  async findAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }

  async findById(id: string): Promise<T | null> {
    return Promise.resolve(this.items.find((item) => item.id === id) || null);
  }

  async create(entity: T): Promise<T> {
    const id = entity.id ? entity.id : uuidv7();
    const newEntity = { ...entity, id };
    this.items.push(newEntity);
    return Promise.resolve(newEntity);
  }

  async update(entity: T): Promise<T> {
    const index = this.items.findIndex((item) => item.id === entity.id);

    this.items[index] = { ...this.items[index], ...entity };

    return Promise.resolve(this.items[index]);
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) return Promise.resolve(false);

    this.items.splice(index, 1);
    return Promise.resolve(true);
  }
}
