import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";

vi.mock("uuid", () => ({
  v7: vi.fn(),
}));

import { v7 as uuidv7 } from "uuid";

import { InMemoryRepository } from "../../../shared/infrastructure/in-memory.repository.ts";

type TestEntity = {
  id?: string;
  name: string;
};

describe("InMemoryRepository", () => {
  let repository: InMemoryRepository<TestEntity>;

  beforeEach(() => {
    repository = new InMemoryRepository<TestEntity>();
    vi.clearAllMocks();
  });

  it("should create an entity with a mocked uuid", async () => {
    const mockedUuid = uuidv7 as unknown as Mock;
    mockedUuid.mockReturnValue("fixed-uuid");

    const entity = await repository.create({ name: "Luis" });

    expect(uuidv7).toHaveBeenCalledTimes(1);
    expect(entity).toEqual({
      id: "fixed-uuid",
      name: "Luis",
    });
  });

  it("should store created entities", async () => {
    const mockedUuid = uuidv7 as unknown as Mock;

    mockedUuid.mockReturnValueOnce("id-1").mockReturnValueOnce("id-2");

    await repository.create({ name: "Luis" });
    await repository.create({ name: "Maria" });

    const items = await repository.findAll();

    expect(items).toEqual([
      { id: "id-1", name: "Luis" },
      { id: "id-2", name: "Maria" },
    ]);
  });

  it("should find entity by id", async () => {
    const mockedUuid = uuidv7 as unknown as Mock;
    mockedUuid.mockReturnValue("id-123");

    const created = await repository.create({ name: "Luis" });

    const found = await repository.findById("id-123");

    expect(found).toEqual(created);
  });

  it("should return null if entity does not exist", async () => {
    const result = await repository.findById("non-existent-id");

    expect(result).toBeNull();
  });

  it("should return empty array when no entities exist", async () => {
    const items = await repository.findAll();

    expect(items).toEqual([]);
  });
});
