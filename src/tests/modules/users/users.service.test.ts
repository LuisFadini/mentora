/* eslint-disable @typescript-eslint/unbound-method */
import { beforeEach, describe, expect, it, type Mocked, vi } from "vitest";

import { type User } from "../../../modules/users/user.types.ts";
import { UsersService } from "../../../modules/users/users.service.ts";
import { type IRepository } from "../../../shared/interfaces/repository.interface.ts";

describe("UsersService", () => {
  let usersService: UsersService;
  let mockUserRepository: Mocked<IRepository<User>>;

  const mockUsers: User[] = [
    { id: "1", name: "John Doe", password: "john1234" } as User,
    { id: "2", name: "Jane Doe", password: "jane1234" } as User,
  ];

  beforeEach(() => {
    mockUserRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
    } as unknown as Mocked<IRepository<User>>;

    usersService = new UsersService(mockUserRepository);
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      mockUserRepository.findAll.mockResolvedValue(mockUsers);

      const result = await usersService.getUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const user = mockUsers[0];
      mockUserRepository.findById.mockResolvedValue(user!);

      const result = await usersService.getUserById("1");

      expect(result).toEqual(user);
      expect(mockUserRepository.findById).toHaveBeenCalledWith("1");
      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: User = {
        id: "3",
        name: "Alice",
        password: "alice1234",
      } as User;

      mockUserRepository.create.mockResolvedValue(newUser);

      const result = await usersService.createUser(newUser);

      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
    });
  });
});
