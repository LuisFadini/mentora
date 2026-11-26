import { permissions } from "@mentora/permissions";
import { omit, removeUndefined } from "@mentora/utils";
import sharp from "sharp";

import { ConflictError } from "../../shared/errors/conflict.error.ts";
import type { IFileStorage } from "../../shared/interfaces/file-storage.interface.ts";
import type { IPasswordHasher } from "../../shared/interfaces/password-hasher.interface.ts";
import type {
  ISessionRepository,
  IUserRepository,
} from "../../shared/interfaces/repository.interface.ts";
import type { CreateUserDTO } from "./dto/create-user.dto.ts";
import type { UpdateUserDTO } from "./dto/update-user.dto.ts";

export class UsersService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly sessionRepository: ISessionRepository,
    private readonly fileStorage: IFileStorage,
  ) {}

  private fileStorageKey = (id: string) => `users/${id}.jpg`;

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users.map((user) => omit(user, ["password"]));
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return omit(user, ["password"]);
  }

  async getUserAvatar(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user || !user.avatarUrl) return null;
    return await this.fileStorage.get(this.fileStorageKey(id));
  }

  async createUser(data: CreateUserDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email already in use");
    }

    const isFirstUser = (await this.userRepository.findAll()).length === 0;

    const hashedPassword = await this.passwordHasher.hash(data.password);
    const now = new Date();

    const createdUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      permissions: isFirstUser
        ? Object.values(permissions).flatMap((group) => Object.values(group))
        : [],
      createdAt: now,
      updatedAt: now,
    });
    return omit(createdUser, ["password"]);
  }

  async updateUser(id: string, data: UpdateUserDTO, currentSessionId: string) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) return null;

    const cleanData = removeUndefined(data);

    const emailChanged =
      cleanData.email !== undefined && cleanData.email !== existingUser.email;

    const passwordChanged = cleanData.password !== undefined;

    if (cleanData.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        cleanData.email,
      );

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictError("Email already in use");
      }
    }

    if (passwordChanged && cleanData.password) {
      cleanData.password = await this.passwordHasher.hash(cleanData.password);
    }

    let avatarUrl = existingUser.avatarUrl ?? null;

    if (cleanData.avatar === null) {
      await this.fileStorage.delete(this.fileStorageKey(id));
      avatarUrl = null;
      delete cleanData.avatar;
    } else if (cleanData.avatar) {
      const base64 = cleanData.avatar.includes(";base64,")
        ? cleanData.avatar.split(";base64,")[1]!
        : cleanData.avatar;
      const jpegImage = await sharp(Buffer.from(base64, "base64"))
        .rotate()
        .resize(500, 500, {
          fit: "cover",
          position: "centre",
        })
        .jpeg({
          quality: 80,
          mozjpeg: true,
        })
        .toBuffer();

      await this.fileStorage.put(
        this.fileStorageKey(id),
        jpegImage,
        "image/jpeg",
      );

      avatarUrl = `/users/${id}/avatar`;

      delete cleanData.avatar;
    }

    const updatedUser = await this.userRepository.update({
      ...existingUser,
      ...cleanData,
      avatarUrl,
      updatedAt: new Date(),
    });

    if (emailChanged || passwordChanged) {
      await this.sessionRepository.deleteOtherSessions(id, currentSessionId);
    }

    return omit(updatedUser, ["password"]);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete(id);
    if (!user) return null;
    await this.fileStorage.delete(this.fileStorageKey(id));
    return true;
  }
}
