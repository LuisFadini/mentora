import { v7 as uuidv7 } from "uuid";

import type { IRepository } from "../interfaces/repository.interface.ts";

export class InMemoryRepository<
  T extends { id?: string },
> implements IRepository<T> {
  private items: T[] = [];

  async findAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }

  async findById(id: string): Promise<T | null> {
    return Promise.resolve(this.items.find((item) => item.id === id) || null);
  }

  async create(entity: T): Promise<T> {
    const newEntity = { ...entity, id: uuidv7() };
    this.items.push(newEntity);
    return Promise.resolve(newEntity);
  }

  async update(entity: T): Promise<T> {
    const index = this.items.findIndex((item) => item.id === entity.id);

    this.items[index] = entity;

    return Promise.resolve(entity);
  }

  async delete(entity: T): Promise<Boolean> {
    const index = this.items.findIndex((item) => item.id === entity.id);
    this.items.splice(index, 1);
    return Promise.resolve(true);
  }
}
